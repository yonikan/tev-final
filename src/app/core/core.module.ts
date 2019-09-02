import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams/teams.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TeamsComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TeamsComponent, LoginComponent]
})
export class CoreModule { }
