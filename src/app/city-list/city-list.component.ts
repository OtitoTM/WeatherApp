import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City, WeatherData } from '../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  selectedCity: City | null = null;
  showForm: boolean = true;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.isLoading = true;
    this.cityService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching cities:', error);
        this.isLoading = false;
        this.errorMessage = 'Error fetching cities. Please try again later.';
      }
    );
  }

  validateCityName(name: string): boolean {
    if (!name || name.trim() === '') {
      this.errorMessage = 'City name cannot be empty.';
      return false;
    }
    if (this.cities.some(city => city.name.toLowerCase() === name.toLowerCase())) {
      this.errorMessage = 'This city is already in the list.';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  saveCity(name: string): void {
    if (!this.validateCityName(name)) {
      return;
    }
    const city: City = { name };
    this.cityService.saveCity(city).subscribe(
      savedCity => {
        console.log('City saved:', savedCity);
        this.getAllCities();
      },
      error => {
        console.error('Error saving city:', error);
        this.errorMessage = 'Error saving city. Please try again.';
      }
    );
  }

  deleteCity(id?: number): void {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this city?')) {
        this.cityService.deleteCity(id).subscribe(
          () => {
            console.log('City deleted');
            this.getAllCities();
          },
          error => {
            console.error('Error deleting city:', error);
            this.errorMessage = 'Error deleting city. Please try again.';
          }
        );
      }
    }
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    if (city.id !== undefined) {
      this.getWeatherData(city.id);
      this.getWeatherHistory(city.id);
    }
    setTimeout(() => {
      const element = document.querySelector('.weather-data-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
        this.errorMessage = 'Error fetching weather data. Please try again.';
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
        this.errorMessage = 'Error fetching weather history. Please try again.';
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
