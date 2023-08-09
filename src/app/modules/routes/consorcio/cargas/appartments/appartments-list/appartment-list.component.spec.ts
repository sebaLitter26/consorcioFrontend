import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReservationComponent } from './platform-reservation.component';

describe('PlatformReservationComponent', () => {
  let component: PlatformReservationComponent;
  let fixture: ComponentFixture<PlatformReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
