import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { UiComponentsService } from 'src/app/core/services/ui-components.service';
import { ContactSupportModalComponent } from 'src/app/shared/contact-support-modal/contact-support-modal.component';

interface InitialState {
	excludedPlayers: Array<Object>;
	includedPlayers: Array<Object>;
	allPlayers: Array<Object>;
	clubPlayers: Array<Object>;
}

@Component({
	selector: 'app-participating-players',
	templateUrl: './participating-players.component.html',
	styleUrls: ['./participating-players.component.scss']
})
export class ParticipatingPlayersComponent implements OnInit {
	@Input() teamEventId: any;
	@Input() type = 'training';
	@Output() participatingPlayersEmitter = new EventEmitter<any>();
	@ViewChild('swapPlayersPanel', null) _swapPlayersPanel: ElementRef;

	private state: InitialState = {
		excludedPlayers: [],
		includedPlayers: [],
		allPlayers: [],
		clubPlayers: []
	}
	private store = new Subject<InitialState>();
	allPlayers: any = [];
	clubPlayers: any = [];
	private excludedPlayers = [];
	private includedPlayers = [];
	private initialState: any = {
		includedPlayersInit: [],
		excludedPlayersInit: [],
		allPlayers: [],
		clubPlayers: []
	};
	activePlayers = 0;
	clubPlayersGroup: any[];
	currentPlayer;
	isIncluded;

	constructor(
		public dialog: MatDialog,
		private teamEventValidationService: TeamEventValidationService,
		private uiComponentService: UiComponentsService
	) {}

	ngOnInit() {
		// this.uiComponentService
		// 	.getSidepanelOpenListener()
		// 	.subscribe(data => {
		// 		console.log('data' ,data);

		// 	});
		this.store.subscribe((data: any) => {
			const {allPlayers, clubPlayers} = data;
			if (allPlayers) {
				if (this.allPlayers.length === 0) {
					// save init state
					this.initialState.allPlayers = allPlayers.map(p => ({...p}));
				}
				this.activePlayers = allPlayers.filter(player => player.isParticipated && player.activeTime.length).length;
				this.allPlayers = allPlayers.map(p => ({...p}));
			}

			if (clubPlayers) {
				if (this.clubPlayers.length === 0) {
					this.initialState.clubPlayers = clubPlayers.map(p => ({...p}));
				}
				this.clubPlayers = clubPlayers.map(p => ({...p}));
				this.clubPlayersGroup = this.getClubPlayers();
			}
		});

		this.teamEventValidationService.getParticipatingPlayers(this.store, this.teamEventId, this.type);
		this.teamEventValidationService.getPlayersForSwap(this.store, this.teamEventId);
	}

	doExcludePlayer(player) {
		this.store.next({
			excludedPlayers: [],
			includedPlayers: [],
			clubPlayers: this.clubPlayers,
			allPlayers: this.allPlayers.map(p => {
				if (p.id === player.id) {
					p.isParticipated = false;
				}
				return p;
			})
		});
	}
	doIncludePlayer(player) {
		this.store.next({
			excludedPlayers: [],
			includedPlayers: [],
			clubPlayers: this.clubPlayers,
			allPlayers: this.allPlayers.map(p => {
				if (p.id === player.id) {
					p.isParticipated = true;
				}
				return p;
			})
		});
	}

	doSwapPlayer(player, isIncluded) {
		this.teamEventValidationService.swapPlayer(this.currentPlayer.id, player.userId, this.teamEventId, () => {
			const newState = {
				excludedPlayers: this.excludedPlayers,
				includedPlayers: this.includedPlayers,
				allPlayers: this.allPlayers.map(p => {
					if (p.id === this.currentPlayer.id) {
						p = {
							...this.currentPlayer,
							isOpen: false,
							isSwapped: true,
							id: player.userId,
							firstName: player.firstName,
							lastName: player.lastName,
							profilePic: player.profilePic
						}
					}

					return p;
				}),
				clubPlayers: this.clubPlayers.map(cp => {
					if (cp.userId === player.userId) {
						cp.isParticipated = true;
					}
					return cp;
				})
			};

			this.store.next(newState);
		});
		// TODO: update clubplayers list
	}

	mapSwap(player, swappedPlayer, players) {
		return players.map(p => {
			if (p.id === swappedPlayer.id) {
				p.isParticipated = false;
			}
			if (p.id === player.id) {
				p.isParticipated = p.isSwapped = true;
			}
			return p;
		});
	}

	doResetChanges(e, isIncluded) {
		// TODO: API
		this.teamEventValidationService.revertSwaps(this.teamEventId, () => {
			const newState = {
				excludedPlayers: this.excludedPlayers,
				includedPlayers: this.includedPlayers,
				allPlayers: [...this.initialState.allPlayers],
				clubPlayers: [...this.initialState.clubPlayers]
			};

			this.store.next(newState);
		});

	}

	filterDuplicated(players, playersOrigin) {
		return playersOrigin.filter(p => {
			if (players.includes(includedPlayer => includedPlayer.id === p.id)) {
				return false;
			}
			return true;
		})
	}

	openDialog() {
		const dialogRef = this.dialog.open(ContactSupportModalComponent, {
			width: '415px',
			height: '426px'
		});

		dialogRef.afterClosed()
			.subscribe(result => {
				console.log('The dialog was closed', result);
			});
	}

	openSwapPlayersPanel({el, player, isIncluded}) {
		this.isIncluded = isIncluded;
		this.currentPlayer = player;
		this.scrollTo(el);
	}

	scrollTo(el: HTMLElement) {
		setTimeout(() => {
			el.appendChild(this._swapPlayersPanel.nativeElement)
			el.scrollIntoView({behavior:"smooth", block: "nearest"});
		}, 500);
	}

	getGrouped(arr, groupProp, subGroupName) {
		const group = arr.reduce((acc, curr) => {
			if (!acc[curr[groupProp]]) acc[curr[groupProp]] = [];
			 acc[curr[groupProp]] = [...acc[curr[groupProp]], {...curr}];
			return acc;
		}, {});

		return Object
			.keys(group)
			.map((name, i) => {
				return {name, [subGroupName]: group[name]}
			});
	}

	getClubPlayers() {
		const clubPlayersGroup = this.getGrouped(this.clubPlayers, 'teamName', 'players');
		return clubPlayersGroup.map((cpg: any) => {
			cpg.players = this.getGrouped(cpg.players, 'positionName', 'players');
			return cpg;
		});
	}
}
