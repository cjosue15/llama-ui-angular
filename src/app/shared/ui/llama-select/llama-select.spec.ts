import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaSelect } from './llama-select';

describe('LlamaSelect', () => {
  let component: LlamaSelect;
  let fixture: ComponentFixture<LlamaSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(LlamaSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
