import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaOptionComponent } from './llama-option.component';

describe('LlamaOptionComponent', () => {
  let component: LlamaOptionComponent;
  let fixture: ComponentFixture<LlamaOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LlamaOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
