import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalModalComponent } from './physical-modal.component';

describe('PhysicalModalComponent', () => {
  let component: PhysicalModalComponent;
  let fixture: ComponentFixture<PhysicalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
