import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City, WeatherData } from '../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  selectedCity?: City;
  showForm: boolean = true;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.cityService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
      },
      error => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  saveCity(name: string): void {
    const city: City = { name };
    this.cityService.saveCity(city).subscribe(
      savedCity => {
        console.log('City saved:', savedCity);
        this.getAllCities();
      },
      error => {
        console.error('Error saving city:', error);
      }
    );
  }

  deleteCity(id?: number): void {
    if (id !== undefined) {
      this.cityService.deleteCity(id).subscribe(
        () => {
          console.log('City deleted');
          this.getAllCities();
        },
        error => {
          console.error('Error deleting city:', error);
        }
      );
    }
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    if (city.id !== undefined) {
      this.getWeatherData(city.id);
      this.getWeatherHistory(city.id);
    }
  }

  getWeatherData(id: number): void {
    this.cityService.getCityWeather(id).subscribe(
      data => {
        if (this.selectedCity) {
          this.selectedCity.weatherData = data;
        }
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getWeatherHistory(id: number): void {
    this.cityService.getCityWeatherHistory(id).subscribe(
      data => {
        if (this.selectedCity) {
          this.selectedCity.weatherHistory = data;
        }
      },
      error => {
        console.error('Error fetching weather history:', error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
