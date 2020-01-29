import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-swap-players',
	templateUrl: './swap-players.component.html',
	styleUrls: ['./swap-players.component.scss']
})
export class SwapPlayersComponent implements OnInit {
	@Input() clubPlayers = [];
	@Input() currentPlayer = null;
	@Input() isIncluded = false;
	@Output() swapPlayer = new EventEmitter();
	@ViewChild('matExpansionPanel', null) _matExpansionPanel: any

	constructor() { }

	ngOnInit() {

	}

	onSwapPlayer(value) {
		this.swapPlayer.emit(value);
	}

}
