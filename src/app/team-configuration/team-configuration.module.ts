import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamConfigurationComponent } from './team-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TeamConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [TeamConfigurationComponent]
})
export class TeamConfigurationModule { }
