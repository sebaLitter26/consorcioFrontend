import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountSerialsListComponent } from './count-serial-detail-list.component';

describe('CountEventComponent', () => {
  let component: CountSerialsListComponent;
  let fixture: ComponentFixture<CountSerialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountSerialsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountSerialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
