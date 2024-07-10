import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City } from '../models/models';
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
        // Show error message
      }
    );
  }

  saveCity(name: string): void {
    const city: City = {
      name,
      id: 0
    }; 
    this.cityService.saveCity(city).subscribe(
      savedCity => {
        console.log('City saved:', savedCity);
        // Update the list of cities after saving
        this.getAllCities();
      },
      error => {
        console.error('Error saving city:', error);
        // Show error message
      }
    );
  }

  deleteCity(id: number): void {
    this.cityService.deleteCity(id).subscribe(
      () => {
        console.log('City deleted');
        // Update the list of cities after deletion
        this.getAllCities();
      },
      error => {
        console.error('Error deleting city:', error);
        // Show error message
      }
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
