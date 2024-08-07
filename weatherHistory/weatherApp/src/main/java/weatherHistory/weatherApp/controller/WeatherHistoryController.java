package weatherHistory.weatherApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weatherHistory.weatherApp.model.WeatherHistory;
import weatherHistory.weatherApp.service.WeatherHistory.WeatherHistoryService;

import java.util.List;

@RestController
@RequestMapping("/api/weatherHistory")
public class WeatherHistoryController {

  private final WeatherHistoryService weatherHistoryService;

  @Autowired
  public WeatherHistoryController(WeatherHistoryService weatherHistoryService) {
    this.weatherHistoryService = weatherHistoryService;
  }

  @PostMapping("/{cityName}")
  public WeatherHistory saveWeatherHistory(
    @PathVariable String cityName,
    @RequestBody WeatherHistory weatherHistory) {
    // Ensure city name is set correctly in the weather history
    weatherHistory.setCityName(cityName);
    return weatherHistoryService.saveWeatherHistory(weatherHistory);
  }

  @GetMapping("/{cityName}")
  public List<WeatherHistory> getWeatherHistoryByCityName(@PathVariable String cityName) {
    return weatherHistoryService.getWeatherHistoryByCityName(cityName);
  }
}
