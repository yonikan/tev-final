import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { FeaturesGuard } from './core/guards/features.guard';
import { SettingsComponent } from './core/settings/settings.component';
import { AuthComponent } from './auth/auth/auth.component';
import { MenuComponent } from './core/menu/menu.component';
import { ProfileComponent } from './core/profile/profile.component';

const routes: Routes = [
  { path: 'team-overview', loadChildren: () => import('./team-overview/team-overview.module')
    .then(m => m.TeamOverviewModule), canLoad: [AuthGuard]},
  { path: 'training', loadChildren: () => import('./training/training.module')
    .then(m => m.TrainingModule), canLoad: [AuthGuard]},
  { path: 'matches', loadChildren: () => import('./matches/matches.module')
    .then(m => m.MatchesModule), canLoad: [AuthGuard]},
  { path: 'players', loadChildren: () => import('./players/players.module')
    .then(m => m.PlayersModule), canLoad: [AuthGuard, FeaturesGuard]},
  { path: 'team-configuration', loadChildren: () => import('./team-configuration/team-configuration.module')
    .then(m => m.TeamConfigurationModule), canLoad: [AuthGuard]},
  { path: 'login', component: AuthComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/team-overview', pathMatch: 'full' },
  { path: '**', redirectTo: '/team-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
