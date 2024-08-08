// src/app/models/weather-history.model.ts
export interface WeatherHistory {
icon: any;
date: string|number|Date;
  id?: number;
  cityName: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  searchTime?: string;
  favoriteCityId?: number;
}
