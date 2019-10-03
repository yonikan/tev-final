import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-overview', loadChildren: () => import('./team-overview/team-overview.module')
    .then(m => m.TeamOverviewModule), canLoad: [AuthGuard]},
  { path: 'training', loadChildren: () => import('./training/training.module')
    .then(m => m.TrainingModule), canLoad: [AuthGuard]},
  { path: 'matches', loadChildren: () => import('./matches/matches.module')
    .then(m => m.MatchesModule), canLoad: [AuthGuard]},
  { path: 'players', loadChildren: () => import('./players/players.module')
    .then(m => m.PlayersModule), canLoad: [AuthGuard]},
  { path: 'team-configuration', loadChildren: () => import('./team-configuration/team-configuration.module')
    .then(m => m.TeamConfigurationModule), canLoad: [AuthGuard]},
  { path: '', redirectTo: '/team-overview', pathMatch: 'full' },
  { path: '**', redirectTo: '/team-overview', pathMatch: 'full' }
  // { path: '**', component: TeamOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
