import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { routes } from './team-event-validation.routes';

import { HighchartsChartModule } from 'highcharts-angular';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
import { MatchValidationComponent } from './match-validation/match-validation.component';
import { TrainingValidationComponent } from './training-validation/training-validation.component';

import { StepTrainingGeneralComponent } from './training-validation/step-training-general/step-training-general.component';
import { StepTrainingPlayersComponent } from './training-validation/step-training-players/step-training-players.component';
import { StepTrainingPhasesComponent } from './training-validation/step-training-phases/step-training-phases.component';

import { StepMatchOverviewComponent } from './match-validation/step-match-overview/step-match-overview.component';
import { StepMatchPlayersComponent } from './match-validation/step-match-players/step-match-players.component';
import { StepMatchFormationsComponent } from './match-validation/step-match-formations/step-match-formations.component';
import { StepMatchPhasesComponent } from './match-validation/step-match-phases/step-match-phases.component';
import { StepMatchSubsComponent } from './match-validation/step-match-subs/step-match-subs.component';
import { TagsComponent } from './common/tags/tags.component';
import { SpeedGraphComponent } from './common/speed-graph/speed-graph.component';
import { TrainingDurationComponent } from './training-validation/step-training-general/training-duration/training-duration.component';
import { MatchOverviewComponent } from './match-validation/step-match-overview/match-overview/match-overview.component';
import { PhasesCardsContainerComponent } from './common/phases-cards-container/phases-cards-container.component';
import { PhasesCardComponent } from './common/phases-cards-container/phases-card/phases-card.component';
import { SubstitutionsTableComponent } from './common/substitutions-table/substitutions-table.component';
import { SubstitutionsRowComponent } from './common/substitutions-table/substitutions-row/substitutions-row.component';
import { FormationFieldComponent } from './match-validation/step-match-formations/formation-field/formation-field.component';
import { FormationSelectionComponent } from './match-validation/step-match-formations/formation-selection/formation-selection.component';
import { FieldPlayerComponent } from './match-validation/step-match-formations/field-player/field-player.component';

@NgModule({
  declarations: [
    MatchValidationComponent,
    TrainingValidationComponent,
    StepTrainingGeneralComponent,
    StepTrainingPlayersComponent,
    StepTrainingPhasesComponent,
    StepMatchOverviewComponent,
    StepMatchPlayersComponent,
    StepMatchFormationsComponent,
    StepMatchPhasesComponent,
    StepMatchSubsComponent,
    TagsComponent,
    SpeedGraphComponent,
    TrainingDurationComponent,
    MatchOverviewComponent,
    PhasesCardsContainerComponent,
    PhasesCardComponent,
    SubstitutionsTableComponent,
    SubstitutionsRowComponent,
    FormationFieldComponent,
    FormationSelectionComponent,
    FieldPlayerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HighchartsChartModule,
    SwiperModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class TeamEventValidationModule { }
