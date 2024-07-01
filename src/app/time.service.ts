import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  getCurrentTime(): Observable<Date> {
    return interval(1000).pipe(map(() => new Date()));
  }
}
