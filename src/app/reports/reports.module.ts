import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { RouterModule } from '@angular/router';
import { routes } from '../reports/reports.routes';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule  
  ],
  exports: [ReportsComponent]
})
export class ReportsModule { }
