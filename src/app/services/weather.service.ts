import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '1c27a7b13e5a4f069779839f5fc4ceae';
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Current Weather 
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast'; // 5 day / 3 hour forecast

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.weatherApiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map(this.extractData),
      map(this.mapWeatherData),
      catchError(() => of(null)) // Return null if there's an error
    );
  }

  private extractData(res: any): any {
    return res || {};
  }

  private mapWeatherData(data: any): any {
    return {
      temp: data.main?.temp,
      temp_min: data.main?.temp_min,
      temp_max: data.main?.temp_max,
      feels_like: data.main?.feels_like,
      humidity: data.main?.humidity,
      weather: data.weather[0]?.description,
      icon: data.weather[0]?.icon,
      name: data.name,
      coord: data.coord
    };
  }

  cityExists(city: string): Observable<boolean> {
    const url = `${this.weatherApiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map(() => true), // If the request is successful, the city exists
      catchError(() => of(false)) // If there's an error, the city does not exist
    );
  }
}
