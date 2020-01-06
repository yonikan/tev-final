import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

const clubPlayers = [
	{
	  "_id": 1,
	  "name": "Genmex - U18",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Maxwell",
		  "lastName": "Crawford",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 2,
		  "id": 2,
		  "firstName": "Tamra",
		  "lastName": "Brewer",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 3,
		  "id": 3,
		  "firstName": "Kirby",
		  "lastName": "Chang",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 4,
		  "id": 4,
		  "firstName": "Reid",
		  "lastName": "Humphrey",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 5,
		  "id": 5,
		  "firstName": "Roy",
		  "lastName": "Riley",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 6,
		  "id": 6,
		  "firstName": "Emma",
		  "lastName": "Carver",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 7,
		  "id": 7,
		  "firstName": "Boyer",
		  "lastName": "Caldwell",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Cook",
		  "lastName": "Ramos",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 9,
		  "id": 9,
		  "firstName": "Shannon",
		  "lastName": "Zimmerman",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 10,
		  "id": 10,
		  "firstName": "Giles",
		  "lastName": "Walls",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Ratliff",
		  "lastName": "Haley",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		}
	  ]
	},
	{
	  "_id": 2,
	  "name": "Phuel - U15",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Dollie",
		  "lastName": "Keller",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 2,
		  "id": 2,
		  "firstName": "Tracey",
		  "lastName": "Middleton",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 3,
		  "id": 3,
		  "firstName": "Beard",
		  "lastName": "Nichols",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 4,
		  "id": 4,
		  "firstName": "Blanca",
		  "lastName": "Lang",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 5,
		  "id": 5,
		  "firstName": "Rhoda",
		  "lastName": "Bryant",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 6,
		  "id": 6,
		  "firstName": "Wyatt",
		  "lastName": "Rodriquez",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 7,
		  "id": 7,
		  "firstName": "Deidre",
		  "lastName": "Dominguez",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Cunningham",
		  "lastName": "Blankenship",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 9,
		  "id": 9,
		  "firstName": "Nell",
		  "lastName": "Ramsey",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 10,
		  "id": 10,
		  "firstName": "Elba",
		  "lastName": "Maxwell",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Corine",
		  "lastName": "Knox",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		}
	  ]
	},
	{
	  "_id": 3,
	  "name": "Teraprene - U18",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Anderson",
		  "lastName": "Guzman",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 2,
		  "id": 2,
		  "firstName": "Duran",
		  "lastName": "Herring",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 3,
		  "id": 3,
		  "firstName": "Wiggins",
		  "lastName": "Dorsey",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "QB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 4,
		  "id": 4,
		  "firstName": "Marta",
		  "lastName": "Yang",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 5,
		  "id": 5,
		  "firstName": "Tabitha",
		  "lastName": "Hahn",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 6,
		  "id": 6,
		  "firstName": "Debra",
		  "lastName": "Goff",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 7,
		  "id": 7,
		  "firstName": "Bowers",
		  "lastName": "Hart",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Myrtle",
		  "lastName": "Harding",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		},
		{
		  "positionId": 9,
		  "id": 9,
		  "firstName": "Josefa",
		  "lastName": "Spencer",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "GK",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 10,
		  "id": 10,
		  "firstName": "Pamela",
		  "lastName": "Byrd",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "DF",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": false
		},
		{
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Paige",
		  "lastName": "Knapp",
		  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg",
		  "positionName": "RB",
		  "activeTime": [
			{
			  "startTime": "13:30",
			  "endTime": "14:30",
			  "timeFrameType": "active"
			}
		  ],
		  "isParticipated": true
		}
	  ]
	}
  ];
@Component({
	selector: 'app-swap-players',
	templateUrl: './swap-players.component.html',
	styleUrls: ['./swap-players.component.scss']
})
export class SwapPlayersComponent implements OnInit {
	@Input() clubPlayers = [];
	@Input() currentPlayer = null;
	@Output() swapPlayer = new EventEmitter();
	@ViewChild('matExpansionPanel', null) _matExpansionPanel: any

	constructor() { }

	ngOnInit() {
		// this.clubPlayers = clubPlayers;
	}

	onSwapPlayer(value) {
		this.swapPlayer.emit(value);
	}

}
