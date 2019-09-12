import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TeamOverviewComponent } from './team-overview/team-overview.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-overview', component: TeamOverviewComponent },
  // { path: '', redirectTo: '/overview', pathMatch: 'full' },
  // { path: '**', component: OverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
