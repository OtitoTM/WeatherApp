import { Component, OnInit } from '@angular/core';
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
    event.stopPropagation(); // Prevent triggering city card click
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
        if (data && data.coord) {
          this.timezoneService.getCityTimeAndDate(data.coord.lat, data.coord.lon, cityName).subscribe(
            timeData => {
              this.currentTime = timeData.time;
              this.currentDate = timeData.date;

              // Save weather history
              const historyEntry = {
                date: this.currentDate,
                time: this.currentTime,
                temp: this.weatherData!.temp,
                weather: Array.isArray(this.weatherData!.weather)
                  ? this.weatherData!.weather.map(w => `${w.description} (${w.icon})`).join(', ')
                  : '',
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
              console.error('Error fetching time and date:', error);
            }
          );
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false;
      }
    );
  }

  fetchWeatherHistory(cityName: string): void {
    this.weatherService.getWeatherHistory(cityName).subscribe(
      history => {
        this.weatherHistory = history;
      },
      error => {
        console.error('Error fetching weather history:', error);
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
