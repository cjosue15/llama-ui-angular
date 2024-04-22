import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaButton } from './llama-button';

describe('LlamaButton', () => {
  let component: LlamaButton;
  let fixture: ComponentFixture<LlamaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaButton],
    }).compileComponents();

    fixture = TestBed.createComponent(LlamaButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
