import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
	selector: 'app-field-player',
	templateUrl: './field-player.component.html',
	styleUrls: ['./field-player.component.scss']
})
export class FieldPlayerComponent implements OnInit {
	@Input() positionId;
	@Input() positionName;
	@Input() playerName;
	@Input() players;
	@Input() playerId;
	@Input() player;
	@Output() changePlayer = new EventEmitter();
	@Output() openSelection = new EventEmitter();
	@ViewChild('select', { static: false }) _select: any;

	selectedPlayer = null;
	isOpen = false;

	constructor() {

	}

	ngOnInit() {
		this.selectedPlayer = this.player;
	}

	onChangePlayer(player) {
		this.changePlayer.emit(player);
	}

	onOpen() {
		this.openSelection.emit({
			isOpen: !this.isOpen,
			select: this._select,
			player: this.player,
			positionId: this.positionId,
			close: this.close
		});
	}

	close() {
		this.isOpen = false;
	}
}
