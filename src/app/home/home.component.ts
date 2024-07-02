import { ConversionService } from './../conversion.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherService } from './../services/weather.service';

import { DateTimeComponent } from './../date-time/date-time.component';
import { SpinnerComponent } from './../spinner/spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DateTimeComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'HomePage';
  city!: string;
  weatherData: any = {};
  forecastData: any[] = [];
  isLoading = true;
  isCelsius = true;

  constructor(private weatherService: WeatherService, private ConversionService: ConversionService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.getCurrentLocationWeather();
    }, 2000); // Show spinner for 2 seconds on component initialization
  }

  getWeather(): void {
    if (this.city) {
      this.isLoading = true;
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          this.processWeatherData(data);
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching weather data:', error);
          this.isLoading = false;
        }
      );
    }
  }

  getWeatherByCoordinates(lat: number, lon: number): void {
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.processWeatherData(data);
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false;
      }
    );
  }

  getForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(
      data => {
        console.log('Forecast Data:', data);
        this.forecastData = data;
      },
      error => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }

  processWeatherData(data: any): void {
    this.weatherData = data;
    this.weatherData.temp_cecius = data.main.temp;
    this.weatherData.temp_min = data.main.temp_min;
    this.weatherData.temp_max = data.main.temp_max;
    this.weatherData.temp_feels_like = data.main.feels_like;
    this.weatherData.isDay = data.weather[0].icon.includes('d');
    this.getForecast(data.coord.lat, data.coord.lon);
  }

  getCurrentLocationWeather(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          // Ensure coordinates are limited to two decimal points
          lat = parseFloat(lat.toFixed(2));
          lon = parseFloat(lon.toFixed(2));
          this.getWeatherByCoordinates(lat, lon);
        },
        error => {
          console.error('Error getting location:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.isLoading = false;
    }
  }

  toggleTemperatureUnit(): void {
    this.isCelsius = !this.isCelsius;
  }

  getDisplayedTemperature(temp: number): number {
    return this.isCelsius ? temp : this.ConversionService.celsiusToFahrenheit(temp);
  }
}
