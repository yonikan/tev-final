import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalModalComponent } from './technical-modal.component';

describe('TechnicalModalComponent', () => {
  let component: TechnicalModalComponent;
  let fixture: ComponentFixture<TechnicalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
