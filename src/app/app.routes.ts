import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamConfigurationComponent } from './team-configuration/team-configuration.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'team-overview', component: TeamOverviewComponent, canActivate: [AuthGuard] },
  { path: 'team-configuration', component: TeamConfigurationComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/team-overview', pathMatch: 'full' },
  { path: '**', component: TeamOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
