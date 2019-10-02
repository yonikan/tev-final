import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { SharedModule } from '../shared/shared.module';
import { routes } from './matches.routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [MatchesComponent]
})
export class MatchesModule { }
