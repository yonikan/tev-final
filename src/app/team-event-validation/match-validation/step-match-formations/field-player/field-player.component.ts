import { Component, OnInit, Input, OnChanges } from '@angular/core';

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

  selectedPlayer = null;

  constructor() {

  }

  ngOnChanges() {
    if (this.players) {
      this.selectedPlayer = this.players.find(({id}) => +this.playerId === id);
    }
  }

  ngOnInit() {
  }

  onChangePlayer(player) {
    this.positionName = player.positionName;
  }

}
