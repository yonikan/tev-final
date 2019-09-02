import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [TeamsComponent, LoginComponent],
  imports: [
    CommonModule
  ],
  exports: [TeamsComponent, LoginComponent]
})
export class CoreModule { }
