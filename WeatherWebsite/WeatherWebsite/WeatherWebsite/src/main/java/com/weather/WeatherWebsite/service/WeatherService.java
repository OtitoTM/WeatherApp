package com.weather.WeatherWebsite.service;

import com.weather.WeatherWebsite.model.WeatherData;
import com.weather.WeatherWebsite.model.City;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WeatherService {

  public WeatherData getCurrentWeather(Long cityId) {
    return new WeatherData(25.0, 60, "Sunny", new Date());
  }

  public List<WeatherData> getWeatherHistory(Long cityId) {
    return List.of(
      new WeatherData(23.0, 55, "Cloudy", new Date(System.currentTimeMillis() - 86400000)),
      new WeatherData(26.0, 65, "Sunny", new Date(System.currentTimeMillis() - 172800000))
    );
  }
}
