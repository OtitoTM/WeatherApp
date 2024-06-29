import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {
  currentDateTime: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
}
