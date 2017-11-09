import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportUpdateComponent } from './support-update.component';

describe('SupportUpdateComponent', () => {
  let component: SupportUpdateComponent;
  let fixture: ComponentFixture<SupportUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
