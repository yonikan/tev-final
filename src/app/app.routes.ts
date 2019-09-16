import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { TeamConfigurationComponent } from './team-configuration/team-configuration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-overview', component: TeamOverviewComponent },
  { path: 'team-configuration', component: TeamConfigurationComponent },
  { path: '', redirectTo: '/team-overview', pathMatch: 'full' },
  { path: '**', component: TeamOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
