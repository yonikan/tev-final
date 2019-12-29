import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionsRowComponent } from './substitutions-row.component';

describe('SubstitutionsRowComponent', () => {
  let component: SubstitutionsRowComponent;
  let fixture: ComponentFixture<SubstitutionsRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionsRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
