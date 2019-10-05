import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';
import { FeaturesGuard } from './core/guards/features.guard';
import { TeamsGuard } from './core/guards/teams.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { SettingsComponent } from './core/settings/settings.component';
// import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-overview', loadChildren: () => import('./team-overview/team-overview.module')
    .then(m => m.TeamOverviewModule), canLoad: [AuthGuard]},
  { path: 'training', loadChildren: () => import('./training/training.module')
    .then(m => m.TrainingModule), canLoad: [AuthGuard, FeaturesGuard]},
  { path: 'matches', loadChildren: () => import('./matches/matches.module')
    .then(m => m.MatchesModule), canLoad: [AuthGuard, TeamsGuard]},
  { path: 'players', loadChildren: () => import('./players/players.module')
    .then(m => m.PlayersModule), canLoad: [AuthGuard, RolesGuard]},
  { path: 'team-configuration', loadChildren: () => import('./team-configuration/team-configuration.module')
    .then(m => m.TeamConfigurationModule), canLoad: [AuthGuard, FeaturesGuard, TeamsGuard, RolesGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/team-overview', pathMatch: 'full' },
  { path: '**', redirectTo: '/team-overview', pathMatch: 'full' }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
