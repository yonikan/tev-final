import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
