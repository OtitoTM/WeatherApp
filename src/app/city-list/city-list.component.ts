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
  newCityName: string = '';
  favoriteCities: City[] = [];
  weatherData: WeatherData | null = null;

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
      }
    );
  }

  saveCity(): void {
    if (this.cities.some(city => city.name.toLowerCase() === this.newCityName.toLowerCase())) {
      alert('City has already been added.');
      return;
    }

    const city: City = { name: this.newCityName };
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
      if (confirm('Are you sure you want to delete this city?')) {
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
  }

  selectCity(city: City): void {
    this.selectedCity = city;
    this.fetchWeatherData(city.name);
  }

  fetchWeatherData(cityName: string): void {
    this.cityService.getCityWeather(cityName).subscribe(
      data => {
        this.weatherData = data;
      },
      error => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
