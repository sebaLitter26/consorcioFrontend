import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingActionsComponent } from './building-actions.component';

describe('BuildingActionsComponent', () => {
  let component: BuildingActionsComponent;
  let fixture: ComponentFixture<BuildingActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
