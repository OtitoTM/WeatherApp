import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey='bdbde78124ddbc0fa5602f0d5d93d44f';

  constructor(private httpClient: HttpClient) {}

  getWeather(city: string){
    console.log(city)
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
  }
}
