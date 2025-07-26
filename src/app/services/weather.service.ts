import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private weatherApiUrl = `${environment.weatherApiUrl}/weather`;
  private forecastApiUrl = `${environment.weatherApiUrl}/forecast`;
  private customApiUrl = `${environment.backendApiUrl}/weatherHistory`;

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.weatherApiUrl}?q=${city}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map(this.extractData),
      map(this.mapWeatherData)
    );
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.weatherApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map(this.extractData),
      map(this.mapWeatherData)
    );
  }

  getForecast(lat: number, lon: number): Observable<any[]> {
    const url = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map(this.extractData),
      map(this.processForecastData)
    );
  }

  getWeatherHistory(city: string): Observable<any[]> {
    const url = `${this.customApiUrl}/${city}`;
    return this.httpClient.get<any[]>(url).pipe(map(this.extractData));
  }

  saveWeatherHistory(
    cityName: string,
    historyEntry: { date: string; time: string; temp: number; weather: string; }
  ): Observable<any> {
    const url = `${this.customApiUrl}/${cityName}`;
    return this.httpClient.post(url, historyEntry);
  }

  cityExists(city: string): Observable<boolean> {
    const url = `${this.weatherApiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.httpClient.get(url).pipe(
      map((res: any) => !!res && res.cod !== '404')
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

  private processForecastData(data: any): any[] {
    const dailyForecastMap: { [key: string]: any[] } = {};

    data.list.forEach((entry: any) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!dailyForecastMap[date]) {
        dailyForecastMap[date] = [];
      }
      dailyForecastMap[date].push(entry);
    });

    const dailyForecast = Object.keys(dailyForecastMap).map(date => {
      const dayData = dailyForecastMap[date];
      const temps = dayData.map((entry: any) => entry.main.temp);
      const avgTemp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;

      return {
        date: new Date(dayData[0].dt * 1000),
        temp: avgTemp,
        weather: dayData[0].weather[0].description,
        icon: dayData[0].weather[0].icon
      };
    });

    return dailyForecast.slice(0, 7);
  }
}