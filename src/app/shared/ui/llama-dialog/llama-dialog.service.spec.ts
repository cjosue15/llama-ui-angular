import { TestBed } from '@angular/core/testing';

import { LlamaDialogService } from './llama-dialog.service';

describe('LlamaDialogService', () => {
  let service: LlamaDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamaDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
