import { TestBed, inject } from '@angular/core/testing';

import { CanivalService } from './canival.service';

describe('CanivalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanivalService]
    });
  });

  it('should be created', inject([CanivalService], (service: CanivalService) => {
    expect(service).toBeTruthy();
  }));
});
