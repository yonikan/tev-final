import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { TeamOverviewComponent } from './team-overview/team-overview.component';
// import { TeamConfigurationComponent } from './team-configuration/team-configuration.component';
// import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
// import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// import { MatchesComponent } from './matches/matches.component';
// import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-overview', loadChildren: () => import('./team-overview/team-overview.module')
    .then(m => m.TeamOverviewModule), canLoad: [AuthGuard]},
  { path: 'training', loadChildren: () => import('./training/training.module')
    .then(m => m.TrainingModule), canLoad: [AuthGuard]},
  { path: 'matches', loadChildren: () => import('./matches/matches.module')
    .then(m => m.MatchesModule), canLoad: [AuthGuard]},
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
