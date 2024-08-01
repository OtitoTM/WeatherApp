package weatherHistory.weatherApp.reposirtory;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import weatherHistory.weatherApp.model.WeatherHistory;

import java.util.List;

@Repository
public interface WeatherHistoryRepository extends JpaRepository<WeatherHistory, Long> {
  List<WeatherHistory> findByCityName(String cityName);
}


