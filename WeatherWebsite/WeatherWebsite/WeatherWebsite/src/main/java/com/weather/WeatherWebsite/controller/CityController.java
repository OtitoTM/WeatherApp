package com.weather.WeatherWebsite.controller;

import com.weather.WeatherWebsite.model.City;
import com.weather.WeatherWebsite.model.WeatherData;
import com.weather.WeatherWebsite.repository.CityRepository;
import com.weather.WeatherWebsite.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController {

  @Autowired
  private CityRepository cityRepository;

  @Autowired
  private WeatherService weatherService;

  @PostMapping
  public ResponseEntity<City> saveCity(@RequestBody City city) {
    City savedCity = cityRepository.save(city);
    return ResponseEntity.ok(savedCity);
  }

  @GetMapping
  public ResponseEntity<List<City>> getAllCities() {
    List<City> cities = cityRepository.findAll();
    return ResponseEntity.ok(cities);
  }

  @GetMapping("/{id}")
  public ResponseEntity<City> getCityById(@PathVariable Long id) {
    Optional<City> city = cityRepository.findById(id);
    return city.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
    if (cityRepository.existsById(id)) {
      cityRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/{id}/weather")
  public ResponseEntity<WeatherData> getCityWeather(@PathVariable Long id) {
    WeatherData weatherData = weatherService.getCurrentWeather(id);
    return ResponseEntity.ok(weatherData);
  }

  @GetMapping("/{id}/weatherHistory")
  public ResponseEntity<List<WeatherData>> getCityWeatherHistory(@PathVariable Long id) {
    List<WeatherData> weatherHistory = weatherService.getWeatherHistory(id);
    return ResponseEntity.ok(weatherHistory);
  }
}
