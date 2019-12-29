import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesCardsContainerComponent } from './phases-cards-container.component';

describe('PhasesCardsContainerComponent', () => {
  let component: PhasesCardsContainerComponent;
  let fixture: ComponentFixture<PhasesCardsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesCardsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
