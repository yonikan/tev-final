import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipatingPlayersComponent } from './participating-players.component';
import { ParticipatingColumnComponent } from './participating-column/participating-column.component';
import { SwapPlayersComponent } from './swap-players/swap-players.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
	  ParticipatingPlayersComponent,
	  ParticipatingColumnComponent,
	  SwapPlayersComponent
	],
	exports: [
		ParticipatingPlayersComponent
	]
})
export class ParticipatingPlayersModule { }
