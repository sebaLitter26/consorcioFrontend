import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCountFormComponent } from './create-count-form.component';

describe('CreateCountFormComponent', () => {
  let component: CreateCountFormComponent;
  let fixture: ComponentFixture<CreateCountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
