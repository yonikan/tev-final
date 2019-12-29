import { Routes } from '@angular/router';
import { TrainingValidationComponent } from './training-validation/training-validation.component';
import { MatchValidationComponent } from './match-validation/match-validation.component';

export const routes: Routes = [
    // { path: '', component: TrainingValidationComponent },
    { path: 'training/:team-event-id', component: TrainingValidationComponent},
    { path: 'match/:team-event-id', component: MatchValidationComponent},
];