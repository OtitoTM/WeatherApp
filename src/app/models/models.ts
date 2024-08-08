export interface City {
  id?: number;
  name: string;
  weatherData?: WeatherData;
  weatherHistory?: WeatherData[];
}

export interface WeatherData {
  description: any;
  temperature: any;
  icon: any;
  latitude: number; // Add this line
  longitude: number; 
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