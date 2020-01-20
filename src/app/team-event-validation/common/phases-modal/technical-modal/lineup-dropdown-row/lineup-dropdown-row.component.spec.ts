import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupDropdownRowComponent } from './lineup-dropdown-row.component';

describe('LineupDropdownRowComponent', () => {
  let component: LineupDropdownRowComponent;
  let fixture: ComponentFixture<LineupDropdownRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineupDropdownRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupDropdownRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
