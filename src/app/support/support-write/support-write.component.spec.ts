import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportWriteComponent } from './support-write.component';

describe('SupportWriteComponent', () => {
  let component: SupportWriteComponent;
  let fixture: ComponentFixture<SupportWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
