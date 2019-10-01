import { TestBed } from '@angular/core/testing';

import { UshioService } from './ushio.service';

describe('UshioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UshioService = TestBed.get(UshioService);
    expect(service).toBeTruthy();
  });
});
