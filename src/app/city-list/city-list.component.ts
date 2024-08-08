import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { WeatherService } from '../services/weather.service';
import { WeatherHistoryService } from '../weather-history.service';
import { TimezoneService } from '../timezone.service';
import { City, WeatherData } from '../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { WeatherHistoryComponent } from '../weather-history/weather-history.component'; // Import the new component
import { WeatherHistory } from '../models/weather-history';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule, WeatherHistoryComponent // Add the new component here
  ],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  selectedCity: City | null = null;
  showForm: boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isRefreshing: boolean = false;
  newCityName: string = '';
  weatherData: WeatherData | null = null;
  weatherHistory: WeatherHistory[] = [];
  currentTime: string = '';
  currentDate: string = '';
  errorMessage: string = '';
  showWeatherData: boolean = false;
  clickCount: number = 0;
  clickTimeout: any;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private weatherHistoryService: WeatherHistoryService,
    private timezoneService: TimezoneService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.isRefreshing = true;
    this.cityService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
        this.isRefreshing = false;
        if (this.cities.length === 0) {
          console.warn('No cities found');
        }
        this.cities.forEach(city => this.fetchWeatherHistory(city.name));
      },
      error => {
        console.error('Error fetching cities:', error);
        this.isRefreshing = false;
        this.snackBar.open('Error fetching cities. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  saveCity(): void {
    this.errorMessage = '';
    this.isSaving = true;

    if (this.cities.some(city => city.name.toLowerCase() === this.newCityName.toLowerCase())) {
      this.snackBar.open('City has already been added.', 'Close', { duration: 3000 });
      this.isSaving = false;
      return;
    }

    this.weatherService.cityExists(this.newCityName).subscribe(
      exists => {
        if (exists) {
          const city: City = { name: this.newCityName };
          this.cityService.saveCity(city).subscribe(
            savedCity => {
              console.log('City saved:', savedCity);
              this.getAllCities();
              this.fetchWeatherHistory(this.newCityName);
              this.isSaving = false;
            },
            error => {
              console.error('Error saving city:', error);
              this.isSaving = false;
            }
          );
        } else {
          this.snackBar.open('The city does not exist. Please enter a valid city name.', 'Close', { duration: 3000 });
          this.isSaving = false;
        }
      },
      error => {
        console.error('Error validating city name:', error);
        this.snackBar.open('There was an error validating the city name. Please try again.', 'Close', { duration: 3000 });
        this.isSaving = false;
      }
    );
  }

  deleteCity(city: City, event: Event): void {
    event.stopPropagation();
    if (city.id !== undefined) {
      if (confirm(`Are you sure you want to delete ${city.name}?`)) {
        this.cityService.deleteCity(city.id).subscribe(
          () => {
            console.log('City deleted');
            this.getAllCities();
          },
          error => {
            console.error('Error deleting city:', error);
            this.snackBar.open('Error deleting city. Please try again later.', 'Close', { duration: 3000 });
          }
        );
      }
    } else {
      console.error('City ID is undefined');
      this.snackBar.open('City ID is not available. Please try again later.', 'Close', { duration: 3000 });
    }
  }

  selectCity(city: City): void {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.clickTimeout = setTimeout(() => {
        this.clickCount = 0;
        this.selectedCity = city;
        this.showWeatherData = true;
        this.fetchWeatherData(city.name);
        this.fetchWeatherHistory(city.name);
        setTimeout(() => this.scrollToWeatherData(), 100);
      }, 300);
    } else if (this.clickCount === 2) {
      clearTimeout(this.clickTimeout);
      this.clickCount = 0;
      if (this.selectedCity?.name === city.name) {
        this.showWeatherData = !this.showWeatherData;
      } else {
        this.selectedCity = city;
        this.showWeatherData = true;
        this.fetchWeatherData(city.name);
        this.fetchWeatherHistory(city.name);
        setTimeout(() => this.scrollToWeatherData(), 100);
      }
    }
  }

  fetchWeatherData(cityName: string): void {
    this.isLoading = true;
    this.weatherService.getWeather(cityName).subscribe(
      data => {
        this.weatherData = data;
        this.isLoading = false;
        this.fetchCityTimeAndDate(cityName);
        this.saveWeatherHistory(cityName);
      },
      error => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false;
        this.snackBar.open('Error fetching weather data. Please try again later.', 'Close', { duration: 3000 });
      }
    );
  }

  fetchCityTimeAndDate(cityName: string): void {
    if (this.weatherData?.latitude !== undefined && this.weatherData?.longitude !== undefined) {
      this.timezoneService.getCityTimeAndDate(this.weatherData.latitude, this.weatherData.longitude, cityName).subscribe(
        data => {
          this.currentTime = data.time;
          this.currentDate = data.date;
        },
        error => {
          console.error('Error fetching time and date:', error);
        }
      );
    }
  }

  saveWeatherHistory(cityName: string): void {
    if (this.weatherData) {
      const weatherHistory: WeatherHistory = {
        cityName: cityName,
        temperature: this.weatherData.temperature,
        weatherDescription: this.weatherData.description,
        weatherIcon: this.weatherData.icon ?? '',
        searchTime: new Date().toISOString()
      };

      this.weatherHistoryService.saveWeatherHistory(cityName, weatherHistory).subscribe(
        () => {
          console.log('Weather history saved');
          this.fetchWeatherHistory(cityName);
        },
        error => {
          console.error('Error saving weather history:', error);
        }
      );
    }
  }

  fetchWeatherHistory(cityName: string): void {
    this.weatherHistoryService.getWeatherHistory(cityName).subscribe(
      history => {
        this.weatherHistory = history.map((entry: any) => ({
          date: entry.searchTime,
          temperature: entry.temperature,
          weatherDescription: entry.weatherDescription,
          icon: entry.weatherIcon
        }));
      },
      error => {
        console.error('Error fetching weather history:', error);
      }
    );
  }

  scrollToWeatherData(): void {
    const weatherDataElement = document.getElementById('weather-data');
    if (weatherDataElement) {
      weatherDataElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
