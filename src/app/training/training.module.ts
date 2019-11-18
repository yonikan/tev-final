import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';
import { routes } from './training.routes';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
