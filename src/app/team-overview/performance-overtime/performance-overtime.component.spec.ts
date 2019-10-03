import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceOvertimeComponent } from './performance-overtime.component';

describe('PerformanceOvertimeComponent', () => {
  let component: PerformanceOvertimeComponent;
  let fixture: ComponentFixture<PerformanceOvertimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceOvertimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
