import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckRegistComponent } from './truck-regist.component';

describe('TruckRegistComponent', () => {
  let component: TruckRegistComponent;
  let fixture: ComponentFixture<TruckRegistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckRegistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
