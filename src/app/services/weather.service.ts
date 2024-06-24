import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'bdbde78124ddbc0fa5602f0d5d93d44f';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getForecast(lat: number,lon: number): Observable <any>{
    const url = `${this.apiUrl}/onecall ? lat=$ {lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url);

  }
}