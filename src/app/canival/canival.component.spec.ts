import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanivalComponent } from './canival.component';

describe('CanivalComponent', () => {
  let component: CanivalComponent;
  let fixture: ComponentFixture<CanivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
