import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-formation-field',
  templateUrl: './formation-field.component.html',
  styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit, OnChanges {
  @Input() formation;
  @Input() playersData;

  players = [];

  constructor() {
  }

  ngOnChanges() {
    if (this.playersData) {
      this.players = this.playersData[0].players.reduce((acc, curr) => {
        const currPlayer = acc.find(({positionName}) => positionName === curr.positionName);
        const newPlayer = {id: curr.id, name: curr.name, positionName: curr.positionName};
        if (!currPlayer) {
          acc = [...acc, {positionName: curr.positionName, players: [newPlayer]}];
        } else {
          currPlayer.players = [...currPlayer.players, newPlayer];
        }
        return acc;
      }, []);
    }
  }

  ngOnInit() {

  }

  getPositionX(formationPosition, i, positionX) {
    if (formationPosition[i+1] && (formationPosition[i+1].positionX === positionX + 1)) {
      if (formationPosition[i-1] && formationPosition[i-1].positionX !== (positionX + 1)) {
        return positionX;
      }

      return `${positionX - 1}`;
    } else if (formationPosition[i-1] && formationPosition[i-1].positionX === positionX - 1) {
      return `${positionX + 1}`
    }

    return positionX;
  }

}
