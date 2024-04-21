import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaCard } from './llama-card';

describe('LlamaCard', () => {
  let component: LlamaCard;
  let fixture: ComponentFixture<LlamaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(LlamaCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
