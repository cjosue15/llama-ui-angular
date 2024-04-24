import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaInputComponent } from './llama-input';

describe('LlamaInputComponent', () => {
  let component: LlamaInputComponent;
  let fixture: ComponentFixture<LlamaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LlamaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
