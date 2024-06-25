import { WeatherService } from './../services/weather.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'HomePage';
  city!: string;
  weatherData: any;
  forecastData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getCurrentLocationWeather();
  }

  getWeather(): void {
    if (this.city) {
      this.weatherService.getWeather(this.city).subscribe(
        data => {
          this.processWeatherData(data);
        },
        error => {
          console.error('Error fetching weather data:', error);
        }
      );
    }
  }

  getWeatherByCoordinates(lat: number, lon: number): void {
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
      data => {
        this.processWeatherData(data);
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(
      data => {
        console.log('Forecast Data:', data);
        this.forecastData = data.daily.slice(0, 7);
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
}
