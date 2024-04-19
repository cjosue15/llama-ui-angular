import { TestBed } from '@angular/core/testing';

import { SignalStateService } from './signal-store.service';

describe('SignalStateService', () => {
  let service: SignalStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
