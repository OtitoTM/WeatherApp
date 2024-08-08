package com.weather.WeatherWebsite.WeatherHistory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.weather.WeatherWebsite.reposirtory.WeatherHistoryRepository;
import com.weather.WeatherWebsite.model.WeatherHistory;

import java.util.List;

@Service
public class WeatherHistoryService {

  private final WeatherHistoryRepository weatherHistoryRepository;

  @Autowired
  public WeatherHistoryService(WeatherHistoryRepository weatherHistoryRepository) {
    this.weatherHistoryRepository = weatherHistoryRepository;
  }

  public WeatherHistory saveWeatherHistory(WeatherHistory weatherHistory) {
    return weatherHistoryRepository.save(weatherHistory);
  }

  public List<WeatherHistory> getWeatherHistoryByCityName(String cityName) {
    return weatherHistoryRepository.findByCityName(cityName);
  }
}
