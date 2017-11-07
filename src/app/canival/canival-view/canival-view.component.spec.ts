import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanivalViewComponent } from './canival-view.component';

describe('CanivalViewComponent', () => {
  let component: CanivalViewComponent;
  let fixture: ComponentFixture<CanivalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanivalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanivalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
