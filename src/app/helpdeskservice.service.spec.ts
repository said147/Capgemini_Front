import { TestBed } from '@angular/core/testing';

import { HelpdeskserviceService } from './helpdeskservice.service';

describe('HelpdeskserviceService', () => {
  let service: HelpdeskserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpdeskserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
