import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaFormField } from './llama-form-field';

describe('LlamaFormField', () => {
  let component: LlamaFormField;
  let fixture: ComponentFixture<LlamaFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaFormField],
    }).compileComponents();

    fixture = TestBed.createComponent(LlamaFormField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
