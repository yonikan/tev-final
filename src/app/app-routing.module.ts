import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { TeamsComponent } from './core/teams/teams.component';
import { LoginComponent } from './core/auth/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'teams', component: TeamsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
