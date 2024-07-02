import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { SpinnerComponent } from './spinner/spinner.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule, RouterLinkActive, NavbarComponent, DatePipe, DateTimeComponent,SpinnerComponent ], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Weather Website';
  isLoading = true;
  constructor (){
    setTimeout(() => {
      this.isLoading = false;
  },3000);
  }}
