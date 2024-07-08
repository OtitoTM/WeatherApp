import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './models/models'; // Ensure correct path

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = `http://127.0.0.1:8080/api/cities`;

  constructor(private http: HttpClient) {}

  saveCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.apiUrl}`, city);
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}`);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }
}
