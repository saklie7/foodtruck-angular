import { TestBed, inject } from '@angular/core/testing';

import { HotlistService } from './hotlist.service';

describe('HotlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotlistService]
    });
  });

  it('should be created', inject([HotlistService], (service: HotlistService) => {
    expect(service).toBeTruthy();
  }));
});
