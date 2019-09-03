import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LasteventsComponent } from './lastevents.component';

describe('LasteventsComponent', () => {
  let component: LasteventsComponent;
  let fixture: ComponentFixture<LasteventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LasteventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LasteventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
