import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContactSupportDialogComponent } from '../../../shared/contact-support-dialog/contact-support-dialog.component';
import { TeamEventValidationService } from '../../team-event-validation.service';

interface InitialState {
	excludedPlayers: Array<Object>;
	includedPlayers: Array<Object>;
	allPlayers: Array<Object>;
}

@Component({
	selector: 'app-participating-players',
	templateUrl: './participating-players.component.html',
	styleUrls: ['./participating-players.component.scss']
})
export class ParticipatingPlayersComponent implements OnInit {
	private state: InitialState = {
		excludedPlayers: [],
		includedPlayers: [],
		allPlayers: []
	}
	private store = new Subject<InitialState>();
	private allPlayers: any = [];
	private excludedPlayers = [];
	private includedPlayers = [];
	private initialState: any = {
		includedPlayersInit: [],
		excludedPlayersInit: [],
		allPlayers: []
	};

	constructor(public dialog: MatDialog, private teamEventValidationService: TeamEventValidationService) {
	}

	ngOnInit() {
		this.store.subscribe(({allPlayers}) => {
			if (this.allPlayers.length === 0) {
				// save init state
				this.initialState.allPlayers = allPlayers.map(p => ({...p}));
			}
			this.allPlayers = allPlayers;
		});

		this.teamEventValidationService.getParticipatingPlayers(this.store);
	}

	doExcludePlayer(player) {
		this.store.next({
			excludedPlayers: [],
			includedPlayers: [],
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
			allPlayers: this.allPlayers.map(p => {
				if (p.id === player.id) {
					p.isParticipated = true;
				}
				return p;
			})
		});
	}

	doSwapPlayer({ player, swappedPlayer }, isIncluded) {
		const newState = {
			excludedPlayers: this.excludedPlayers,
			includedPlayers: this.includedPlayers,
			allPlayers: this.allPlayers.map(p => {
				p.isOpen = false;
				if (p.id === player.id) {
					p.isParticipated = isIncluded;
					p.isSwapped = true;

				}
				if (p.id === swappedPlayer.id) {
					p.isParticipated = !isIncluded;
					p.isSwapped = true;
				}

				return p;
			})
		};

		this.store.next(newState);
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
		const newState = {
			excludedPlayers: this.excludedPlayers,
			includedPlayers: this.includedPlayers,
			allPlayers: [...this.initialState.allPlayers]
		};
		// if (isIncluded) {
		// 	newState.includedPlayers = this.initialState.includedPlayers.map(o => ({ ...o }));
		// 	newState.excludedPlayers = this.filterDuplicated(newState.includedPlayers, this.initialState.excludedPlayers);
		// } else {
		// 	newState.excludedPlayers = this.initialState.excludedPlayers.map(o => ({ ...o }));
		// 	newState.includedPlayers = this.filterDuplicated(newState.excludedPlayers, this.initialState.includedPlayers);
		// }

		this.store.next(newState);
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

