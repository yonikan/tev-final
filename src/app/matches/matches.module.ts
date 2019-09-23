import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesComponent } from './matches.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [MatchesComponent]
})
export class MatchesModule { }
