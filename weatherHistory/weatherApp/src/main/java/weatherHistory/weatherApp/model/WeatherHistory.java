package weatherHistory.weatherApp.model;


import jakarta.persistence.*;
//import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "weather_history")
public class WeatherHistory {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "city_name", nullable = false)
  private String cityName;

  @Column(name = "date", nullable = false)
  private LocalDate date;

  @Column(name = "time", nullable = false)
  private String time;

  @Column(name = "temperature", nullable = false)
  private double temperature;

  @Column(name = "weather_description", nullable = false)
  private String weatherDescription;

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

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
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
}

