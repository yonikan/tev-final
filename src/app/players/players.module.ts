import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { routes } from './players.routes';
import { PlayersComponent } from './players.component';



@NgModule({
  declarations: [PlayersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [PlayersComponent]
})
export class PlayersModule { }
