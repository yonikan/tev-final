import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { routes } from './team-configuration.routes';
import { RouterModule } from '@angular/router';

import { TeamConfigurationComponent } from './team-configuration.component';

@NgModule({
  declarations: [
    TeamConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [TeamConfigurationComponent]
})
export class TeamConfigurationModule { }
