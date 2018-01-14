import { TestBed, inject } from '@angular/core/testing';

import { LdbService } from './ldb.service';

describe('LdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LdbService]
    });
  });

  it('should be created', inject([LdbService], (service: LdbService) => {
    expect(service).toBeTruthy();
  }));
});
