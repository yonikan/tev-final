import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOverviewKpiComponent } from './team-overview-kpi.component';

describe('TeamOverviewKpiComponent', () => {
  let component: TeamOverviewKpiComponent;
  let fixture: ComponentFixture<TeamOverviewKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOverviewKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOverviewKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
