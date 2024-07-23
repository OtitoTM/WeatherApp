export interface City {
  id?: number;
  name: string;
  weatherData?: WeatherData;
  weatherHistory?: WeatherData[];
}

export interface WeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  humidity: number;
  weather: string;
  icon: string;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}

