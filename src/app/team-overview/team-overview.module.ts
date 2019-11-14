import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TeamOverviewComponent } from './team-overview.component';
import { LoadRiskComponent } from './load-risk/load-risk.component';
import { EventsComponent } from './events/events.component';
import { PerformanceOvertimeComponent } from './performance-overtime/performance-overtime.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LeaderBoardRowComponent } from './leader-board/leader-board-row/leader-board-row.component';
import { TeamOverviewChartComponent } from './performance-overtime/team-overview-chart/team-overview-chart.component';

import { RouterModule } from '@angular/router';
import { routes } from './team-overview.routes';
import { ChartModule } from 'angular-highcharts';
import { TeamOverviewKpiComponent } from './performance-overtime/team-overview-kpi/team-overview-kpi.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    TeamOverviewComponent,
    LoadRiskComponent,
    EventsComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent,
    LeaderBoardRowComponent,
    TeamOverviewChartComponent,
    TeamOverviewKpiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
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
