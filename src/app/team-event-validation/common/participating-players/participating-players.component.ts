import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { UiComponentsService } from 'src/app/core/services/ui-components.service';
import { ContactSupportDialogComponent } from 'src/app/shared/contact-support-dialog/contact-support-dialog.component';

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

	constructor(public dialog: MatDialog, private teamEventValidationService: TeamEventValidationService, private uiComponentService: UiComponentsService) {
	}

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
				this.allPlayers = allPlayers.map(p => ({...p}));
			}

			if (clubPlayers) {
				if (this.clubPlayers.length === 0) {
					this.initialState.clubPlayers = clubPlayers.map(p => ({...p}));
				}
				this.clubPlayers = clubPlayers.map(p => ({...p}));
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

	doSwapPlayer({ player, swappedPlayer }, isIncluded) {

		// TODO: API
		this.teamEventValidationService.swapPlayer(swappedPlayer.id, player.userId, this.teamEventId, () => {
			const newState = {
				excludedPlayers: this.excludedPlayers,
				includedPlayers: this.includedPlayers,
				allPlayers: this.allPlayers.map(p => {
					if (p.id === swappedPlayer.id) {
						p = {
							...swappedPlayer,
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
		const dialogRef = this.dialog.open(ContactSupportDialogComponent, {
			width: '415px',
			data: {subject: '', message: ''}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
	}
}
