import { TestBed } from '@angular/core/testing';

import { CleansingService } from './cleansing.service';

describe('CleansingService', () => {
  let service: CleansingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleansingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
