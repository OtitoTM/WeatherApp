import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    return dailyForecast.slice(0, 7); // Return only the first 7 days
  }
}
