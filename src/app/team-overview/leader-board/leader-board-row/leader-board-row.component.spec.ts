import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardRowComponent } from './leader-board-row.component';

describe('LeaderBoardRowComponent', () => {
  let component: LeaderBoardRowComponent;
  let fixture: ComponentFixture<LeaderBoardRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderBoardRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBoardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
