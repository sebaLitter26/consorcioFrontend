import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountEventsListComponent } from './count-event-detail-list.component';

describe('CountEventComponent', () => {
  let component: CountEventsListComponent;
  let fixture: ComponentFixture<CountEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountEventsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
