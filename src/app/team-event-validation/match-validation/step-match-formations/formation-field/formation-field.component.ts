import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-formation-field',
	templateUrl: './formation-field.component.html',
	styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit, OnChanges {
	@Input() formation;
	@Input() playersData;
	@Output() changeFormationPlayer = new EventEmitter();

	players = [];

	constructor() {
	}

	ngOnChanges() {
		if (this.playersData) {
			this.players = this.playersData[0].players.reduce((acc, curr) => {
				const currPlayer = acc.find(({ positionName }) => positionName === curr.positionName);
				const newPlayer = { id: curr.id, name: curr.name, positionName: curr.positionName };
				if (!currPlayer) {
					acc = [...acc, { positionName: curr.positionName, players: [newPlayer] }];
				} else {
					currPlayer.players = [...currPlayer.players, newPlayer];
				}
				return acc;
			}, []);
		}
	}

	ngOnInit() {

	}

	sameRow = (y1, y2) => y1 === y2;

	getPositionX(formationPosition, i, positionX) {
		if (formationPosition[i + 1] && this.sameRow(formationPosition[i].positionY, formationPosition[i + 1].positionY) && (formationPosition[i + 1].positionX === positionX + 1)) {
			if (formationPosition[i - 1] && formationPosition[i - 1].positionX !== (positionX + 1)) {
				return positionX;
			}

			return `${positionX - 1}`;
		} else if (formationPosition[i - 1] && this.sameRow(formationPosition[i].positionY, formationPosition[i - 1].positionY) && formationPosition[i - 1].positionX === positionX - 1) {
			return `${positionX + 1}`
		}

		return positionX;
	}

	changePlayerInFormation(formationPosition, player) {
		this.formation.formationPosition = this.formation.formationPosition.map(formationPos => {
			if (formationPos.playerId === player.id) {
				formationPos.playerId = null;
			}
			if (formationPos.positionId === formationPosition.positionId) {
				formationPos.playerId = player.id;
			}
			return formationPos;
		});

		this.changeFormationPlayer.emit(player);
	}

}
