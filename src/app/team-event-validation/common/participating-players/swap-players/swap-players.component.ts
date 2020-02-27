import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
	selector: 'app-swap-players',
	templateUrl: './swap-players.component.html',
	styleUrls: ['./swap-players.component.scss']
})
export class SwapPlayersComponent implements OnInit, OnChanges {
	@Input() clubPlayers = [];
	@Input() currentPlayer = null;
	@Input() isIncluded = false;
	@Input() teamId;
	@Output() swapPlayer = new EventEmitter();
	@ViewChild('matExpansionPanel', { static: false }) _matExpansionPanel: any

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges() {
		this.clubPlayers = this.clubPlayers.map(club => ({...club, isOpen: club.teamId === this.teamId}));
	}

	onSwapPlayer(value) {
		this.swapPlayer.emit(value);
	}

	trackClubByFn(i, club) {
		return club.name;
	}

	trackPlayerByFn(i, player) {
		return player.userId;
	}

	trackPlayerGroupByFn(i, playerGroup) {
		return playerGroup.name;
	}

}
