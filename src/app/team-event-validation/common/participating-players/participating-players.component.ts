import { Component, OnInit } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';

const excludedPlayersMock = [
	{
		"positionId": 1,
		"clubName": "Astrails - U15",
		"id": 1,
		"firstName": "Rosemary",
		"lastName": "Odonnell",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4,
		"error": "Player can't be included, sensors were strapped incorretly."
	},
	{
		"positionId": 2,
		"clubName": "GODSENT - U15",
		"id": 2,
		"firstName": "Eunice",
		"lastName": "Garza",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 3,
		"clubName": "Impulse - U15",
		"id": 3,
		"firstName": "Noelle",
		"lastName": "Waller",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 4,
		"clubName": "Astrails - U15",
		"id": 4,
		"firstName": "Polly",
		"lastName": "Nash",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 5,
		"clubName": "Astrails - U18",
		"id": 5,
		"firstName": "Nita",
		"lastName": "Molina",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 6,
		"clubName": "GODSENT - U18",
		"id": 6,
		"firstName": "Ray",
		"lastName": "Trujillo",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 7,
		"clubName": "Impulse - U18",
		"id": 7,
		"firstName": "Bishop",
		"lastName": "Nicholson",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 8,
		"clubName": "GODSENT - U15",
		"id": 8,
		"firstName": "Castillo",
		"lastName": "Mcbride",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 9,
		"clubName": "Astrails - U18",
		"id": 9,
		"firstName": "Levy",
		"lastName": "Murphy",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3
	}
];

const includedPlayersMock = [
	{
		"positionId": 1,
		"clubName": "GODSENT - U15",
		"id": 10,
		"firstName": "Patrice",
		"lastName": "Combs",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 2,
		"clubName": "Astrails - U15",
		"id": 11,
		"firstName": "Aileen",
		"lastName": "Dennis",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 3,
		"clubName": "GODSENT - U18",
		"id": 12,
		"firstName": "Osborne",
		"lastName": "Sampson",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "QB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 4,
		"clubName": "GODSENT - U18",
		"id": 13,
		"firstName": "Virginia",
		"lastName": "Lewis",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 3
	},
	{
		"positionId": 5,
		"clubName": "Impulse - U15",
		"id": 14,
		"firstName": "Sharpe",
		"lastName": "Albert",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 6,
		"clubName": "Astrails - U18",
		"id": 15,
		"firstName": "Vilma",
		"lastName": "Torres",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 7,
		"clubName": "Astrails - U15",
		"id": 16,
		"firstName": "Greene",
		"lastName": "Atkinson",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "DF",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 8,
		"clubName": "GODSENT - U18",
		"id": 17,
		"firstName": "Kidd",
		"lastName": "Meadows",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "GK",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": false,
		"isSwapped": false,
		"sensorNum": 4
	},
	{
		"positionId": 9,
		"clubName": "Impulse - U15",
		"id": 18,
		"firstName": "Herman",
		"lastName": "Hooper",
		"avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		"positionName": "RB",
		"activeTime": [
			{
				"startTime": "13:30",
				"endTime": "14:30",
				"timeFrameType": "active"
			}
		],
		"isParticipated": true,
		"isSwapped": false,
		"sensorNum": 4
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
	private players = [];

	private state: InitialState = {
		excludedPlayers: [],
		includedPlayers: []
	}
	private store = new Subject<InitialState>();
	private excludedPlayers = [];
	private includedPlayers = [];

	constructor() {
		this.players = excludedPlayersMock;
	}

	ngOnInit() {
		this.store.subscribe(({ excludedPlayers, includedPlayers }) => {
			this.excludedPlayers = excludedPlayers;
			this.includedPlayers = includedPlayers;
		});
		this.state = this.initData();
		this.store.next(this.state);
	}

	initData(): InitialState {
		return {
			excludedPlayers: excludedPlayersMock,
			includedPlayers: includedPlayersMock
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

	resetChanges(isIncluded) {
		const newState = {
			excludedPlayers: this.excludedPlayers,
			includedPlayers: this.includedPlayers
		};
		if (isIncluded) {
			newState.includedPlayers = includedPlayersMock;
		} else {
			newState.excludedPlayers = excludedPlayersMock;
		}

		this.store.next(newState);
	}
}

