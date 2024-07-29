import { Component, OnInit, Renderer2 } from '@angular/core';
import { CityService } from '../city.service';
import { WeatherService } from '../services/weather.service';
import { TimezoneService } from '../timezone.service';
import { City, WeatherData } from '../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
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
  favoriteCities: City[] = [];
  weatherData: WeatherData | null = null;
  weatherHistory: any[] = [];
  currentTime: string = '';
  currentDate: string = '';
  errorMessage: string = '';
  showWeatherData: boolean = false;
  clickCount: number = 0;
  clickTimeout: any;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private timezoneService: TimezoneService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) { }

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

  deleteCity(id?: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this city?')) {
        this.cityService.deleteCity(id).subscribe(
          () => {
            console.log('City deleted');
            this.getAllCities();
          },
          error => {
            console.error('Error deleting city:', error);
          }
        );
      }
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
        this.fetchTimeAndDate(city.name);
        this.fetchWeatherHistory(city.name);
        setTimeout(() => this.scrollToWeatherData(), 100);
      }, 300); // Single click threshold
    } else if (this.clickCount === 2) {
      clearTimeout(this.clickTimeout);
      this.clickCount = 0;
      if (this.selectedCity?.name === city.name) {
        this.showWeatherData = !this.showWeatherData;
      } else {
        this.selectedCity = city;
        this.showWeatherData = true;
        this.fetchWeatherData(city.name);
        this.fetchTimeAndDate(city.name);
        this.fetchWeatherHistory(city.name);
        setTimeout(() => this.scrollToWeatherData(), 100);
      }
    }
  }

  fetchWeatherData(cityName: string): void {
    this.weatherService.getWeather(cityName).subscribe(
      data => {
        this.weatherData = data;
        this.saveWeatherHistory(cityName, data);
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  fetchTimeAndDate(cityName: string): void {
    this.timezoneService.getCityTimeAndDate(cityName).subscribe(
      data => {
        this.currentTime = data.time;
        this.currentDate = data.date;
      },
      error => {
        console.error('Error fetching time and date:', error);
      }
    );
  }

  fetchWeatherHistory(cityName: string): void {
    this.weatherService.getWeatherHistory(cityName).subscribe(
      data => {
        this.weatherHistory = data;
      },
      error => {
        console.error('Error fetching weather history:', error);
      }
    );
  }

  saveWeatherHistory(cityName: string, weatherData: WeatherData): void {
    this.timezoneService.getCityTimeAndDate(cityName).subscribe(
      timeData => {
        const historyEntry = {
          date: timeData.date,
          time: timeData.time,
          temp: weatherData.temp,
          weather: weatherData.weather && weatherData.weather.length > 0 ? weatherData.weather[0].description : ''
        };
        this.weatherService.saveWeatherHistory(cityName, historyEntry).subscribe(
          () => {
            console.log('Weather history saved');
            this.fetchWeatherHistory(cityName);
          },
          error => {
            console.error('Error saving weather history:', error);
          }
        );
      },
      error => {
        console.error('Error fetching time and date for weather history:', error);
      }
    );
  }

  scrollToWeatherData(): void {
    const element = document.getElementById('weather-data');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  refreshCities(): void {
    this.getAllCities();
  }
}
