import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckReviewsComponent } from './truck-reviews.component';

describe('TruckReviewsComponent', () => {
  let component: TruckReviewsComponent;
  let fixture: ComponentFixture<TruckReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
