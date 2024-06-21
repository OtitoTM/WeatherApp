import { WeatherService } from './../services/weather.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title='HomePage';
  city!: string;
  weatherData: any;

  constructor(private WeatherService:WeatherService){}

  ngOnInit(){
    this.city = 'Nairobi'
  }

  getWeather(){
    this.WeatherService.getWeather(this.city).subscribe(data => {
      this.weatherData=data;
      console.log(data);
  })
}
}
