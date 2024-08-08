package com.weather.WeatherWebsite.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_history")
public class WeatherHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "city_name", nullable = false)
  private String cityName;

  @Column(name = "temperature")
  private double temperature;

  @Column(name = "weather_description")
  private String weatherDescription;

  @Column(name = "weather_icon")
  private String weatherIcon;

  @Column(name = "search_time", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime searchTime;

  @Column(name = "favorite_city_id")
  private Integer favoriteCityId;

  @Column(name = "time", nullable = false)
  private String time = LocalTime.now().toString();

  // Getters and Setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
  }

  public double getTemperature() {
    return temperature;
  }

  public void setTemperature(double temperature) {
    this.temperature = temperature;
  }

  public String getWeatherDescription() {
    return weatherDescription;
  }

  public void setWeatherDescription(String weatherDescription) {
    this.weatherDescription = weatherDescription;
  }

  public String getWeatherIcon() {
    return weatherIcon;
  }

  public void setWeatherIcon(String weatherIcon) {
    this.weatherIcon = weatherIcon;
  }

  public LocalDateTime getSearchTime() {
    return searchTime;
  }

  public void setSearchTime(LocalDateTime searchTime) {
    this.searchTime = searchTime;
  }

  public Integer getFavoriteCityId() {
    return favoriteCityId;
  }

  public void setFavoriteCityId(Integer favoriteCityId) {
    this.favoriteCityId = favoriteCityId;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }
}
