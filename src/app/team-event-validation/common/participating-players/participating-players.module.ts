import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipatingPlayersComponent } from './participating-players.component';
import { ParticipatingColumnComponent } from './participating-column/participating-column.component';
import { SwapPlayersComponent } from './swap-players/swap-players.component';
import { MatExpansionModule, MatListModule, MatDividerModule } from '@angular/material';


@NgModule({
	imports: [
		CommonModule,
		MatExpansionModule,
		MatListModule,
		MatDividerModule
	],
	declarations: [
	  ParticipatingPlayersComponent,
	  ParticipatingColumnComponent,
	  SwapPlayersComponent
	]
})
export class ParticipatingPlayersModule { }
