import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionsTableComponent } from './substitutions-table.component';

describe('SubstitutionsTableComponent', () => {
  let component: SubstitutionsTableComponent;
  let fixture: ComponentFixture<SubstitutionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
