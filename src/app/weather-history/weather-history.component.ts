import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherHistory } from '../models/weather-history';

@Component({
  selector: 'app-weather-history',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './weather-history.component.html',
  styleUrl: './weather-history.component.css'
})
export class WeatherHistoryComponent {
  @Input() weatherHistory: WeatherHistory[] = [];

}
