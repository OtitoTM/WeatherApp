import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { 

  }
  get() : Observable<any>{
    return this.httpClient.get<any>("http://api.openweathermap.org/data/2.5/weather");
  }
};
