import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesCardComponent } from './phases-card.component';

describe('PhasesCardComponent', () => {
  let component: PhasesCardComponent;
  let fixture: ComponentFixture<PhasesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
