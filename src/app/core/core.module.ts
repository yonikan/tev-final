import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsComponent } from './teams/teams.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [TeamsComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [TeamsComponent, LoginComponent]
})
export class CoreModule { }
