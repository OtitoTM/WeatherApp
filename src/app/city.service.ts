import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, WeatherData } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:8080/api/cities';

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  saveCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCityWeather(id: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.apiUrl}/${id}/weather`);
  }

  getCityWeatherHistory(id: number): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.apiUrl}/${id}/weather/history`);
  }
}
