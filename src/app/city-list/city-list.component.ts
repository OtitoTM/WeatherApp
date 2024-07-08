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
        //  show error message
      }
    );
  }

  saveCity(name: string): void {
    const city: City = { name }; 
    this.cityService.saveCity(city).subscribe(
      savedCity => {
        console.log('City saved:', savedCity);
        // update the list of cities after saving
        this.getAllCities();
      },
      error => {
        console.error('Error saving city:', error);
        // show error message
      }
    );
  }

  getCityById(id: number): void {
    this.cityService.getCityById(id).subscribe(
      city => {
        console.log('City by ID:', city);
        // Process the retrieved city as needed
      },
      error => {
        console.error('Error fetching city by ID:', error);
        //  show error message
      }
    );
  }
}
