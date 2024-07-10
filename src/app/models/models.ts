export interface City {
  id?: number;
  name: string;
  weatherData?: WeatherData;
  weatherHistory?: WeatherData[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  date: Date;
}
