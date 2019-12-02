import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { LoadRiskComponent } from './load-risk/load-risk.component';

import { PerformanceOvertimeComponent } from './performance-overtime/performance-overtime.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { LeaderBoardRowComponent } from './leader-board/leader-board-row/leader-board-row.component';
import { TeamOverviewChartComponent } from './performance-overtime/team-overview-chart/team-overview-chart.component';

import { RouterModule } from '@angular/router';
import { routes } from './team-overview.routes';
import { ChartModule } from 'angular-highcharts';
import { TeamOverviewKpiComponent } from './performance-overtime/team-overview-kpi/team-overview-kpi.component';
import { EventComponent } from './events-carousel/event/event.component';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { EventsCarouselComponent } from './events-carousel/events-carousel.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EventsCarouselModalComponent } from './events-carousel/events-carousel-modal/events-carousel-modal.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    TeamOverviewComponent,
    LoadRiskComponent,
    EventComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent,
    LeaderBoardRowComponent,
    TeamOverviewChartComponent,
    TeamOverviewKpiComponent,
    EventsCarouselComponent,
    EventsCarouselModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartModule,
    SwiperModule,
    ScrollingModule
  ],
  entryComponents: [
    EventsCarouselModalComponent
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
    EventComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent
  ]
})
export class TeamOverviewModule { }
