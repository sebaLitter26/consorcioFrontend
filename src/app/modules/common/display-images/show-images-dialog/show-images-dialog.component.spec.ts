import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowImagesDialogComponent } from './show-images-dialog.component';

describe('ShowImagesDialogComponent', () => {
  let component: ShowImagesDialogComponent;
  let fixture: ComponentFixture<ShowImagesDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
