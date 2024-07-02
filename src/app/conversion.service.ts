import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor() { }

  celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}
