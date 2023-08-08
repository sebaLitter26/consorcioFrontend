import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsListFiltersComponent } from './buildings-list-filters.component';

describe('BuildingsListFiltersComponent', () => {
  let component: BuildingsListFiltersComponent;
  let fixture: ComponentFixture<BuildingsListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingsListFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
