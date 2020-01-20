import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesModalComponent } from './phases-modal.component';

describe('PhasesModalComponent', () => {
  let component: PhasesModalComponent;
  let fixture: ComponentFixture<PhasesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
