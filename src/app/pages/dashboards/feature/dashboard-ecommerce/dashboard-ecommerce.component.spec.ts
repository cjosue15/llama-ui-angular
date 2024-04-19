import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEcommerceComponent } from './dashboard-ecommerce.component';

describe('DashboardEcommerceComponent', () => {
  let component: DashboardEcommerceComponent;
  let fixture: ComponentFixture<DashboardEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEcommerceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
