import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOverviewChartComponent } from './team-overview-chart.component';

describe('TeamOverviewChartComponent', () => {
  let component: TeamOverviewChartComponent;
  let fixture: ComponentFixture<TeamOverviewChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOverviewChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOverviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
