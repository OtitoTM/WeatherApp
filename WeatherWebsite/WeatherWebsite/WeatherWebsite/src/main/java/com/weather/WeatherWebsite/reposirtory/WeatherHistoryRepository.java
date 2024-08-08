package com.weather.WeatherWebsite.reposirtory;


import com.weather.WeatherWebsite.model.WeatherHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.weather.WeatherWebsite.reposirtory.WeatherHistoryRepository;


import java.util.List;

@Repository
public interface WeatherHistoryRepository extends JpaRepository<WeatherHistory, Long> {
  List<WeatherHistory> findByCityName(String cityName);
}


