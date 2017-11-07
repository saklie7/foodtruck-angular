import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanivalWriteComponent } from './canival-write.component';

describe('CanivalWriteComponent', () => {
  let component: CanivalWriteComponent;
  let fixture: ComponentFixture<CanivalWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanivalWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanivalWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
