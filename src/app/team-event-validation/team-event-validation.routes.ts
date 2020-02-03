import { Routes } from '@angular/router';
import { TrainingValidationComponent } from './training-validation/training-validation.component';
import { MatchValidationComponent } from './match-validation/match-validation.component';
import { ParticipatingPlayersComponent } from './common/participating-players/participating-players.component';
import { StepMatchFormationsComponent } from './match-validation/step-match-formations/step-match-formations.component';

export const routes: Routes = [
    // { path: '', component: TrainingValidationComponent },
    { path: 'training/:team-event-id', component: TrainingValidationComponent},
    { path: 'match/:team-event-id', component: MatchValidationComponent},
    { path: 'match/:team-event-id/participating-players', component: ParticipatingPlayersComponent},
    { path: 'match/:team-event-id/step3', component: StepMatchFormationsComponent},
];