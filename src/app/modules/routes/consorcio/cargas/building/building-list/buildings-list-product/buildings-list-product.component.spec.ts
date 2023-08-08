import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsListProductComponent } from './counts-list-product.component';

describe('CountsListProductComponent', () => {
  let component: CountsListProductComponent;
  let fixture: ComponentFixture<CountsListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountsListProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountsListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
