import { TestBed } from '@angular/core/testing';

import { EventsDataService } from './events-data.service';

describe('EventsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsDataService = TestBed.get(EventsDataService);
    expect(service).toBeTruthy();
  });
});
