// city.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, WeatherData } from './models/models';
import { WeatherService } from './services/weather.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:8080/api/cities';
  private autocompleteUrl = 'http://localhost:8080/api/cities/autocomplete'; // Add this URL

  constructor(private http: HttpClient, private weatherService: WeatherService) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  saveCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCityWeather(cityName: string): Observable<WeatherData> {
    return this.weatherService.getWeather(cityName);
  }

  getCityWeatherHistory(id: number): Observable<WeatherData[]> {
    return this.http.get<WeatherData[]>(`${this.apiUrl}/${id}/weather/history`);
  }

  // Method to fetch city suggestions
  getCitySuggestions(query: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.autocompleteUrl}?query=${query}`);
  }
}
