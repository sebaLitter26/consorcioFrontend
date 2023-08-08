import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupoHistoricComponent } from './historic.component';

describe('CupoHistoricComponent', () => {
  let component: CupoHistoricComponent;
  let fixture: ComponentFixture<CupoHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupoHistoricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupoHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
