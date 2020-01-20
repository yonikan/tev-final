import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchSizeOptionComponent } from './pitch-size-option.component';

describe('PitchSizeOptionComponent', () => {
  let component: PitchSizeOptionComponent;
  let fixture: ComponentFixture<PitchSizeOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchSizeOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchSizeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
