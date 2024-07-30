package weatherHistory.weatherApp.service.WeatherHistory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weatherHistory.weatherApp.model.WeatherHistory;
import weatherHistory.weatherApp.reposirtory.WeatherHistoryRepository;

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
