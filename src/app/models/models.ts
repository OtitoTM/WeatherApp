export interface City {
  id?: number;
  name: string;
  weatherData?: WeatherData;
  weatherHistory?: WeatherData[];
}

export interface WeatherData {
humidity: any;
  temp: any;
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}


