package com.weather.WeatherWebsite.controller;

import com.weather.WeatherWebsite.model.City;
import com.weather.WeatherWebsite.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
public class CityController {

  @Autowired
  private CityRepository cityRepository;

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
}
