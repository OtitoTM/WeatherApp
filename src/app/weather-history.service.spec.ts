import { TestBed } from '@angular/core/testing';

import { WeatherHistoryService } from './weather-history.service';

describe('WeatherHistoryService', () => {
  let service: WeatherHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
