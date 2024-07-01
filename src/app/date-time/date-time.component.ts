import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class DateTimeComponent implements OnInit {
  currentTime: Date = new Date();

  ngOnInit(): void {
    interval(1000).pipe(map(() => new Date())).subscribe(time => this.currentTime = time);
  }
}
