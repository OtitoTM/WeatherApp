import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'bdbde78124ddbc0fa5602f0d5d93d44f'; 
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall';

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
    const url = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);
  }
}
