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
        const dailyForecast = this.processForecastData(data);
        this.forecastData = dailyForecast;
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

  processForecastData(data: any): any[] {
    const dailyForecast: any[] = [];
    const forecastMap: any = {};

    data.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!forecastMap[date]) {
        forecastMap[date] = [];
      }
      forecastMap[date].push(entry);
    });

    for (const date in forecastMap) {
      const dayData = forecastMap[date];
      const temps = dayData.map((entry: any) => entry.main.temp);
      const avgTemp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;

      dailyForecast.push({
        date,
        temp: avgTemp,
        weather: dayData[0].weather[0].description,
        icon: dayData[0].weather[0].icon
      });
    }
    
    
    return dailyForecast;
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
