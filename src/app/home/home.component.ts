import { SpinnerComponent } from './../spinner/spinner.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherService } from './../services/weather.service';
import { DateTimeComponent } from './../date-time/date-time.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DateTimeComponent, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()isLoading: boolean = true;
  title = 'HomePage';
  city!: string;
  weatherData: any = {};
  forecastData: any[] = [];

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
