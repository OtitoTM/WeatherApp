import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private apiKey = 'BCU3SZ5244G4';
  private baseUrl = 'http://api.timezonedb.com/v2.1/get-time-zone';

  constructor(private http: HttpClient) {}

  getCityTimeAndDate(city: string): Observable<{ time: string; date: string }> {
    const url = `${this.baseUrl}?key=${this.apiKey}&format=json&by=zone&zone=${city}`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        time: data.formatted.split(' ')[1],
        date: data.formatted.split(' ')[0]
      }))
    );
  }
}
