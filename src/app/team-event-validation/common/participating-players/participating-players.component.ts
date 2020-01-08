import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContactSupportDialogComponent } from '../../../shared/contact-support-dialog/contact-support-dialog.component';

const excludedPlayersMock = [
	{
		"positionId": 1,
		"clubName": "Astrails - U15",
		"id": 10,
		"firstName": "Sosa",
		"lastName": "Dalton",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4,
		"error": "Player can't be included sensors were strapped incorretly."
	},
	{
		"positionId": 2,
		"clubName": "Astrails - U15",
		"id": 11,
		"firstName": "Kemp",
		"lastName": "Battle",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 3,
		"clubName": "Impulse - U18",
		"id": 12,
		"firstName": "Garrett",
		"lastName": "Quinn",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 4,
		"clubName": "Astrails - U18",
		"id": 13,
		"firstName": "Joyce",
		"lastName": "Campbell",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 5,
		"clubName": "Astrails - U18",
		"id": 14,
		"firstName": "Guthrie",
		"lastName": "Grimes",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 6,
		"clubName": "Astrails - U18",
		"id": 15,
		"firstName": "Gwendolyn",
		"lastName": "Barnett",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 7,
		"clubName": "Impulse - U15",
		"id": 16,
		"firstName": "Clemons",
		"lastName": "Ayala",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 8,
		"clubName": "Astrails - U18",
		"id": 17,
		"firstName": "Cortez",
		"lastName": "Gomez",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4,
		"error": "Player can't be included, sensors were strapped incorretly."
	},
	{
		"positionId": 9,
		"clubName": "Impulse - U15",
		"id": 18,
		"firstName": "Rosella",
		"lastName": "Johnston",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	}
];

const includedPlayersMock = [
	{
		"positionId": 1,
		"clubName": "Astrails - U18",
		"id": 10,
		"firstName": "Ratliff",
		"lastName": "Leonard",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 2,
		"clubName": "GODSENT - U18",
		"id": 11,
		"firstName": "Shirley",
		"lastName": "Donaldson",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 3,
		"clubName": "GODSENT - U18",
		"id": 12,
		"firstName": "Cobb",
		"lastName": "Petersen",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 4,
		"clubName": "Impulse - U15",
		"id": 13,
		"firstName": "Tyler",
		"lastName": "Valencia",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 5,
		"clubName": "GODSENT - U18",
		"id": 14,
		"firstName": "Briana",
		"lastName": "Montoya",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 6,
		"clubName": "Impulse - U18",
		"id": 15,
		"firstName": "Kline",
		"lastName": "Pope",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4,
		"error": null
	},
	{
		"positionId": 7,
		"clubName": "Astrails - U15",
		"id": 16,
		"firstName": "Hewitt",
		"lastName": "Pace",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 8,
		"clubName": "Impulse - U15",
		"id": 17,
		"firstName": "Heath",
		"lastName": "Aguirre",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	},
	{
		"positionId": 9,
		"clubName": "Impulse - U15",
		"id": 18,
		"firstName": "Thomas",
		"lastName": "Goodwin",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": 1578483861613,
				"endTime": 1578487461613,
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3,
		"error": null
	}
];

interface InitialState {
	excludedPlayers: Array<Object>;
	includedPlayers: Array<Object>;
}

@Component({
	selector: 'app-participating-players',
	templateUrl: './participating-players.component.html',
	styleUrls: ['./participating-players.component.scss']
})
export class ParticipatingPlayersComponent implements OnInit {
	private state: InitialState = {
		excludedPlayers: [],
		includedPlayers: []
	}
	private store = new Subject<InitialState>();
	private excludedPlayers = [];
	private includedPlayers = [];

	constructor(public dialog: MatDialog) {
	}

	ngOnInit() {
		this.store.subscribe(({ excludedPlayers, includedPlayers }) => {
			this.excludedPlayers = excludedPlayers;
			this.includedPlayers = includedPlayers;
		});

		this.store.next(this.initData());
	}

	initData(): InitialState {
		return {
			excludedPlayers: excludedPlayersMock.map(o => ({ ...o })),
			includedPlayers: includedPlayersMock.map(o => ({ ...o }))
		};
	}

	doExcludePlayer(player) {
		this.store.next({
			excludedPlayers: [...this.excludedPlayers, player],
			includedPlayers: this.includedPlayers.filter((p: any) => (p.id === player.id) ? false : true)
		});
	}
	doIncludePlayer(player) {
		this.store.next({
			excludedPlayers: this.excludedPlayers.filter((p: any) => (p.id === player.id) ? false : true),
			includedPlayers: [...this.includedPlayers, player]
		});
	}

	doSwapPlayer({ player, swappedPlayer }, isIncluded) {
		const newState = {
			excludedPlayers: this.excludedPlayers,
			includedPlayers: this.includedPlayers
		};

		if (isIncluded) {
			newState.includedPlayers = this.mapSwap(player, swappedPlayer, this.includedPlayers);
		} else {
			newState.excludedPlayers = this.mapSwap(player, swappedPlayer, this.excludedPlayers);
		}


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
			includedPlayers: this.includedPlayers
		};
		if (isIncluded) {
			newState.includedPlayers = includedPlayersMock.map(o => ({ ...o }));
			newState.excludedPlayers = this.filterDuplicated(newState.includedPlayers, excludedPlayersMock);
		} else {
			newState.excludedPlayers = excludedPlayersMock.map(o => ({ ...o }));
			newState.includedPlayers = this.filterDuplicated(newState.excludedPlayers, includedPlayersMock);
		}

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

