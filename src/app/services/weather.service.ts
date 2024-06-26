import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '1c27a7b13e5a4f069779839f5fc4ceae'; // Replace with your actual API key
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // Using 5 day / 3 hour forecast

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.weatherApiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);
  }
}
