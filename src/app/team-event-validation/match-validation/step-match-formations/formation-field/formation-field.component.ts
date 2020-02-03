import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, HostListener, Inject } from '@angular/core';
import { Formation } from 'src/app/team-event-validation/team-event-validation.model';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-formation-field',
	templateUrl: './formation-field.component.html',
	styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit, OnChanges {
	@Input() formationTemplate:any = {};
	@Input() formation;
	@Input() playersData;
	@Input() participatingPlayers;
	@Output() changeFormationPlayer = new EventEmitter();
	@ViewChild('swapPlayers', null) _swapPlayers: any;

	players = [];
	isShowSwapPlayers;
	swapPlayersPosition = {x: 0, y: 0};
	positionIdForSwap: any;
	positions;
	document: Document;

	@HostListener('document:click', ['$event'])
	clickOut(e) {
		if (!this._swapPlayers.nativeElement.contains(e.target)) {
			this.isShowSwapPlayers = false;
		}
	}

	constructor(private staticDataService: StaticDataService, @Inject(DOCUMENT) document: any) {
		this.document = document;
	}

	ngOnChanges() {
		if (this.playersData) {
			this.players = Object.values(this.participatingPlayers);
		}
	}

	ngOnInit() {
		this.positions = this.staticDataService.getStaticData().positions;
		const overlayContainer:any = this.document.querySelector('.cdk-overlay-container');
		if (overlayContainer) {
			overlayContainer.hidden = true;
		}
	}

	sameRow = (y1, y2) => y1 === y2;

	getPositionX(formationPosition, i, positionX) {
		if (formationPosition[i + 1] && this.sameRow(formationPosition[i].matrixYPosition, formationPosition[i + 1].matrixYPosition) && (formationPosition[i + 1].matrixXPosition === positionX + 1)) {
			if (formationPosition[i - 1] && formationPosition[i - 1].matrixXPosition !== (positionX + 1)) {
				return positionX;
			}

			return `${positionX - 1}`;
		} else if (formationPosition[i - 1] && this.sameRow(formationPosition[i].matrixYPosition, formationPosition[i - 1].matrixYPosition) && formationPosition[i - 1].matrixXPosition === positionX - 1) {
			return `${positionX + 1}`
		}

		return positionX;
	}

	getPlayerInPosition(player) {
		const p = this.formation.find(p => p.positionId === player.positionId);
		if (p)
			return this.participatingPlayers[p.playerId];
		return null;
	}

	showSwapPlayers(e) {
		if (e.isOpen) {
			this.isShowSwapPlayers = e.isOpen;
			const overlayContainer:any = this.document.querySelector('.cdk-overlay-container');
			overlayContainer.hidden = true;
			this.positionIdForSwap = e.positionId;
			const {height} = e.select._elementRef.nativeElement.getBoundingClientRect();
			const y = e.select._elementRef.nativeElement.offsetTop + height;
			const x = e.select._elementRef.nativeElement.offsetLeft + (e.select._elementRef.nativeElement.offsetWidth / 2);
			this.swapPlayersPosition.y = y;
			this.swapPlayersPosition.x = x;
			setTimeout(() => {
				this._swapPlayers.nativeElement.scrollIntoView({behavior:"smooth", block: "nearest"});
			}, 500);
		} else {
			this.positionIdForSwap = null;
		}

	}

	checkIsPlaced(formation, playerId) {
		if (formation.playerId === playerId) {
			// reset if already placed
			formation.playerId = null;
		}
		return formation
	}

	// TODO: change to -> changePlayerInFormation
	changePlayerInFormation(value) {
		if (!this.formation.find(({positionId}) => positionId === this.positionIdForSwap)) {
			// TODO: new Formation
			this.formation = [...this.formation.map((formation: Formation) => {
				return this.checkIsPlaced(formation, value.id);
			}), {
				playerId: value.id,
				positionId: this.positionIdForSwap,
				matrixXPosition: null,
				matrixYPosition: null,
			}]
		} else {
			this.formation = this.formation.map((formation: Formation) => {
				formation = this.checkIsPlaced(formation, value.id);
				if (formation.positionId === this.positionIdForSwap) {
					formation.playerId = value.id;
				}
				return formation;
			});
		}

		this.isShowSwapPlayers = false;
	}

	trackPlayersDataFn(i, playersData) {
		return playersData.category;
	}

	trackPlayersFn(i, player) {
		return player.id;
	}
}
