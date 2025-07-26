import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City, WeatherData } from './models/models';
import { WeatherService } from './services/weather.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = `${environment.backendApiUrl}/cities`;
  private autocompleteUrl = `${environment.backendApiUrl}/cities/autocomplete`;

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

  getCityWeatherHistory(cityName: string): Observable<WeatherData[]> {
    return this.weatherService.getWeatherHistory(cityName);
  }

  getCitySuggestions(query: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.autocompleteUrl}?query=${query}`);
  }
}
