import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-field-player',
  templateUrl: './field-player.component.html',
  styleUrls: ['./field-player.component.scss']
})
export class FieldPlayerComponent implements OnInit, OnChanges {
  @Input() positionName;
  @Input() playerName;
  @Input() players;
  @Input() playerId;
  @Output() changePlayer = new EventEmitter();

  selectedPlayer = null;

  constructor() {

  }

  ngOnChanges() {
    if (this.players) {
		this.selectedPlayer = this.players.reduce((acc, curr) => {
			acc = [...acc, ...curr.players]
			return acc;
		}, []).find(({id}) => +this.playerId === id);
    }
  }

  ngOnInit() {

  }

  onChangePlayer(player) {
	this.changePlayer.emit(player);
  }

}
