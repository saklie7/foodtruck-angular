import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanivalDetailComponent } from './canival-detail.component';

describe('CanivalDetailComponent', () => {
  let component: CanivalDetailComponent;
  let fixture: ComponentFixture<CanivalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanivalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanivalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
