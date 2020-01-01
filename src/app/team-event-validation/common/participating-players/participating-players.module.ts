import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipatingPlayersComponent } from './participating-players.component';
import { ParticipatingColumnComponent } from './participating-column/participating-column.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ParticipatingPlayersComponent, ParticipatingColumnComponent]
})
export class ParticipatingPlayersModule { }
