import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingValidationComponent } from './training-validation.component';

describe('TrainingValidationComponent', () => {
  let component: TrainingValidationComponent;
  let fixture: ComponentFixture<TrainingValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
