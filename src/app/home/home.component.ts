import { WeatherService } from '../services/weather.service';
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
    // Optionally initialize with a default city
    // this.city = 'Nairobi';
    // this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(data => {
      this.weatherData = data;
      this.weatherData.temp_cecius = data.main.temp;
      this.weatherData.temp_min = data.main.temp_min;
      this.weatherData.temp_max = data.main.temp_max;
      this.weatherData.temp_feels_like = data.main.feels_like;
      this.weatherData.isDay = data.weather[0].icon.includes('d');
      this.getForecast(data.coord.lat,data.coord.lon);
      console.log(data);
    });
  }
  getForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(data => {
      this.forecastData = data.daily.slice(0, 7); // Get only the next 7 days
      console.log(data);
    });
  }
}