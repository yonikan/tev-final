import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchValidationComponent } from './match-validation.component';

describe('MatchValidationComponent', () => {
  let component: MatchValidationComponent;
  let fixture: ComponentFixture<MatchValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
