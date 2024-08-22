import { Component, Input, OnInit } from '@angular/core';
import { WeatherHistoryService } from '../weather-history.service';
import { WeatherHistory } from '../models/weather-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-history.component.html',
  styleUrls: ['./weather-history.component.css'],
})
export class WeatherHistoryComponent implements OnInit {
  @Input() cityName: string | undefined;
  @Input() weatherHistory: WeatherHistory[] = [];

  constructor(private weatherHistoryService: WeatherHistoryService) {}

  ngOnInit(): void {
    if (this.cityName) {
      this.fetchWeatherHistory(this.cityName);
    }
  }

  fetchWeatherHistory(cityName: string): void {
    this.weatherHistoryService.getWeatherHistory(cityName).subscribe(
      (history) => {
        this.weatherHistory = history;
      },
      (error) => {
        console.error('Error fetching weather history:', error);
      }
    );
  }
}
export { WeatherHistory };

