import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, HostListener, Inject, SimpleChanges } from '@angular/core';
import { Formation } from 'src/app/team-event-validation/team-event-validation.model';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-formation-field',
	templateUrl: './formation-field.component.html',
	styleUrls: ['./formation-field.component.scss']
})
export class FormationFieldComponent implements OnInit, OnChanges {
	@Input() formationTemplate: any = {};
	@Input() formation;
	@Input() playersData;
	@Input() participatingPlayers;
	@Output() changeFormationPlayer = new EventEmitter();
	@Output() formationFieldEmitter = new EventEmitter<any>();
	@ViewChild('swapPlayers', null) _swapPlayers: any;

	players = [];
	isShowSwapPlayers;
	swapPlayersPosition = { x: 0, y: 0 };
	positionIdForSwap: any;
	positions;
	document: Document;
	closeSelect;
	select;

	@HostListener('document:click', ['$event'])
	clickOut(e) {
		if (this._swapPlayers && !this._swapPlayers.nativeElement.contains(e.target) && !this.select.nativeElement.contains(e.target)) {
			this.isShowSwapPlayers = false;
			this.closeSelect();
		}
	}

	constructor(private staticDataService: StaticDataService, @Inject(DOCUMENT) document: any) {
		this.document = document;
	}

	ngOnChanges() {
		if (this.participatingPlayers && this.formationTemplate.formationPosition) {
			this.players = Object.values(this.participatingPlayers);
			this.setRandomPositions();
		}
	}

	ngOnInit() {
		this.positions = this.staticDataService.getStaticData().positions;

	}

	isExistInFormation(id) {
		return this.formationTemplate.formationPosition.some(({positionId}) => positionId === id);
	}

	mapPositionIds() {
		return this.formation.reduce((acc, val) => {
			if (val.positionId && this.isExistInFormation(val.positionId)) {
				acc[val.positionId] = val;
			} else {
				if (!acc['empty']) {
					acc['empty'] = [];
				}
				acc['empty'] = [...acc['empty'], val];
			}

			return acc;
		}, {});
	}

	setRandomPositions() {
		this.formation = this.formation.reduce((unique, item) => {
			return unique.some(o => o.positionId === item.positionId) ? [...unique, {...item, positionId: null}] : [...unique, item]
		}, []);

		const positionIdMap = this.mapPositionIds();
		if (this.formationTemplate.formationPosition) {
			this.formationTemplate.formationPosition = this.formationTemplate.formationPosition.map(formationPosition => {
				const player = positionIdMap[formationPosition.positionId];
				formationPosition.playerId = player ? player.playerId : null;
				return formationPosition;
			}).map(formationPosition => {
				if (!formationPosition.playerId && positionIdMap.empty) {
					const randPlayer = this.getRandomPlayer(positionIdMap.empty);
					if (randPlayer) {
						positionIdMap.empty = positionIdMap.empty.filter(positionMap => positionMap.playerId !== randPlayer.playerId);
						formationPosition.playerId = randPlayer.playerId;
					}
				}
				return formationPosition;
			});
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
		const p = this.formationTemplate.formationPosition.find(p => p.positionId === player.positionId);

		if (p && p.playerId) {
			return this.participatingPlayers[p.playerId];
		}
		return null;
	}

	getRandomPlayer(players) {
		return players[Math.floor(Math.random() * players.length)];
	}

	showSwapPlayers(e) {
		this.closeSelect = e.close;
		this.isShowSwapPlayers = e.isOpen;
		this.select = e.select;
		if (e.isOpen) {
			this.positionIdForSwap = e.positionId;
			const { height } = e.select.nativeElement.getBoundingClientRect();
			const y = e.select.nativeElement.offsetTop + height;
			const x = e.select.nativeElement.offsetLeft + (e.select.nativeElement.offsetWidth / 2);
			this.swapPlayersPosition = { x, y };
			setTimeout(() => {
				if (this._swapPlayers)
					this._swapPlayers.nativeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

	changePlayerInFormation(value) {
		if (!this.formationTemplate.formationPosition.find(({ positionId }) => positionId === this.positionIdForSwap)) {
			this.formationTemplate.formationPosition = [...this.formationTemplate.formationPosition.map((formation: Formation) => {
				return this.checkIsPlaced(formation, value.id);
			}), {
				playerId: value.id,
				positionId: this.positionIdForSwap,
				matrixXPosition: null,
				matrixYPosition: null,
			}]
		} else {
			this.formationTemplate.formationPosition = this.formationTemplate.formationPosition.map((formation: Formation) => {
				formation = this.checkIsPlaced(formation, value.id);
				if (formation.positionId === this.positionIdForSwap) {
					formation.playerId = value.id;
				}
				return formation;
			});
		}

		this.isShowSwapPlayers = false;
		this.closeSelect();
	}

	trackPlayersDataFn(i, playersData) {
		return playersData.category;
	}

	trackPlayersFn(i, player) {
		return player.id;
	}

	sendToTeamEvent(data) {
		this.formationFieldEmitter.emit(data);
	}
}
