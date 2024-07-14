package com.weather.WeatherWebsite.model;

import java.util.Date;

public class WeatherData {
  private double temperature;
  private int humidity;
  private String description;
  private Date date;

  public WeatherData(double temperature, int humidity, String description, Date date) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
    this.date = date;
  }

  // Getters and Setters
  public double getTemperature() {
    return temperature;
  }

  public void setTemperature(double temperature) {
    this.temperature = temperature;
  }

  public int getHumidity() {
    return humidity;
  }

  public void setHumidity(int humidity) {
    this.humidity = humidity;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
