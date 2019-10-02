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

@NgModule({
  declarations: [
    TeamOverviewComponent,
    LoadRiskComponent,
    EventsComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent,
    LeaderBoardRowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
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
