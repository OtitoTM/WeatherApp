import { CityService } from './../city.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { ConversionService } from '../conversion.service';
import { DateTimeComponent } from '../date-time/date-time.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { CityListComponent } from '../city-list/city-list.component'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DateTimeComponent, SpinnerComponent, CityListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'HomePage';
  city: string = '';
  weatherData: any = {};
  forecastData: any[] = [];
  isLoadingCurrentLocation = false;
  isLoadingCity = false;
  isCelsius = true;

  constructor(private weatherService: WeatherService, private conversionService: ConversionService, private CityService: CityService) {}

  ngOnInit(): void {
    this.getCurrentLocationWeather();
  }

  getWeather(): void {
    if (this.city) {
      this.isLoadingCity = true;
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          this.processWeatherData(data);
          this.isLoadingCity = false;
        },
        error => {
          console.error('Error fetching weather data:', error);
          this.isLoadingCity = false;
        }
      );
    }
  }

  getWeatherByCoordinates(lat: number, lon: number): void {
    this.isLoadingCurrentLocation = true;
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.processWeatherData(data);
        this.isLoadingCurrentLocation = false;
      },
      error => {
        console.error('Error fetching weather data:', error);
        this.isLoadingCurrentLocation = false;
      }
    );
  }

  getForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(
      data => {
        this.forecastData = data;
      },
      error => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }

  processWeatherData(data: any): void {
    this.weatherData = data;
    this.weatherData.temp_celsius = data.temp;
    this.weatherData.temp_min = data.temp_min;
    this.weatherData.temp_max = data.temp_max;
    this.weatherData.temp_feels_like = data.feels_like;
    this.weatherData.isDay = data.icon.includes('d');
    this.getForecast(data.coord.lat, data.coord.lon);
  }

  getCurrentLocationWeather(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherByCoordinates(lat, lon);
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  toggleTemperatureUnit(): void {
    this.isCelsius = !this.isCelsius;
  }

  getDisplayedTemperature(temp: number): number {
    return this.isCelsius ? temp : this.conversionService.celsiusToFahrenheit(temp);
  }
}
