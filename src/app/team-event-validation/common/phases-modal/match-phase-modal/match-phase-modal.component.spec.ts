import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPhaseModalComponent } from './match-phase-modal.component';

describe('MatchPhaseModalComponent', () => {
  let component: MatchPhaseModalComponent;
  let fixture: ComponentFixture<MatchPhaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPhaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPhaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
