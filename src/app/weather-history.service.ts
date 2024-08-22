import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherHistory } from './weather-history/weather-history.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherHistoryService {
  private apiUrl = 'http://localhost:8080/api/weatherHistory';

  constructor(private http: HttpClient) {}

  saveWeatherHistory(cityName: string, weatherHistory: WeatherHistory): Observable<WeatherHistory> {
    return this.http.post<WeatherHistory>(`${this.apiUrl}/${cityName}`, weatherHistory);
  }

  getWeatherHistory(cityName: string): Observable<WeatherHistory[]> {
    return this.http.get<WeatherHistory[]>(`${this.apiUrl}/${cityName}`);
  }
}