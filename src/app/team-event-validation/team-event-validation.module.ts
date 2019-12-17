import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValidationComponent } from './match-validation/match-validation.component';
import { TrainingValidationComponent } from './training-validation/training-validation.component';
import { RouterModule } from '@angular/router';
import { routes } from './team-event-validation.routes';

@NgModule({
  declarations: [
    MatchValidationComponent,
    TrainingValidationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TeamEventValidationModule { }
