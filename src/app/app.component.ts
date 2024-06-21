import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule, RouterLinkActive, NavbarComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Weather Website';
  // searchQuery : string = '';
  // weatherDetail: string = '' ;
  
  // constructor(private WeatherService: WeatherService) {}
  // searchWeather = () => {
  //   this.weatherDetail = "Weather details."

  //   // this.WeatherService.get().subscribe((results) =>{
  //   //   console.log(results)

  //   //   this.weatherDetail
  //   // });
  }
