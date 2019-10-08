import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TeamOverviewComponent } from './team-overview.component';
import { LoadRiskComponent } from './load-risk/load-risk.component';
import { EventsComponent } from './events/events.component';
import { PerformanceOvertimeComponent } from './performance-overtime/performance-overtime.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LeaderBoardRowComponent } from './leader-board/leader-board-row/leader-board-row.component';

import { RouterModule } from '@angular/router';
import { routes } from './team-overview.routes';
import { TeamOverviewChartComponent } from './team-overview-chart/team-overview-chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    TeamOverviewComponent,
    LoadRiskComponent,
    EventsComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent,
    LeaderBoardRowComponent,
    TeamOverviewChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartModule
  ],
  exports: [
    TeamOverviewComponent,
    LoadRiskComponent,
    EventsComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent
  ]
})
export class TeamOverviewModule { }
