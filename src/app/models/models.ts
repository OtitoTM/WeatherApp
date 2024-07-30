export interface City {
  id?: number;
  name: string;
  weatherData?: WeatherData;
  weatherHistory?: WeatherData[];
}

export interface WeatherData {
icon: any;
  temp: number;
  temp_min?: number;
  temp_max?: number;
  feels_like?: number;
  humidity?: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
}