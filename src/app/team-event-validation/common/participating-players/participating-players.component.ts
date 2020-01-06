import { Component, OnInit } from '@angular/core';

const players = [
	{
	  "positionId": 1,
	  "clubName": "Impulse - U15",
	  "id": 1,
	  "firstName": "Medina",
	  "lastName": "Rowe",
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
	  "isSwapped": false
	},
	{
	  "positionId": 2,
	  "clubName": "GODSENT - U18",
	  "id": 2,
	  "firstName": "Aida",
	  "lastName": "Richard",
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
	  "isSwapped": false
	},
	{
	  "positionId": 3,
	  "clubName": "Astrails - U15",
	  "id": 3,
	  "firstName": "Roman",
	  "lastName": "Steele",
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
	  "isSwapped": false
	},
	{
	  "positionId": 4,
	  "clubName": "Impulse - U15",
	  "id": 4,
	  "firstName": "Jane",
	  "lastName": "Golden",
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
	  "isSwapped": false
	},
	{
	  "positionId": 5,
	  "clubName": "GODSENT - U18",
	  "id": 5,
	  "firstName": "Ratliff",
	  "lastName": "Mccray",
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
	  "isSwapped": false
	},
	{
	  "positionId": 6,
	  "clubName": "Impulse - U18",
	  "id": 6,
	  "firstName": "Audra",
	  "lastName": "Harris",
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
	  "isSwapped": false
	},
	{
	  "positionId": 7,
	  "clubName": "GODSENT - U15",
	  "id": 7,
	  "firstName": "Mcguire",
	  "lastName": "Maxwell",
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
	  "isSwapped": false
	},
	{
	  "positionId": 8,
	  "clubName": "GODSENT - U18",
	  "id": 8,
	  "firstName": "Sherman",
	  "lastName": "Bean",
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
	  "isSwapped": false
	},
	{
	  "positionId": 9,
	  "clubName": "GODSENT - U15",
	  "id": 9,
	  "firstName": "Ryan",
	  "lastName": "Massey",
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
	  "isSwapped": false
	}
  ];

const includedPlayers = [
	{
	  "positionId": 1,
	  "clubName": "Astrails - U18",
	  "id": 1,
	  "firstName": "Jones",
	  "lastName": "Gardner",
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
	  "isSwapped": false
	},
	{
	  "positionId": 2,
	  "clubName": "Impulse - U18",
	  "id": 2,
	  "firstName": "Charmaine",
	  "lastName": "Hodges",
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
	  "isSwapped": false
	},
	{
	  "positionId": 3,
	  "clubName": "GODSENT - U15",
	  "id": 3,
	  "firstName": "Turner",
	  "lastName": "Ortega",
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
	  "isSwapped": false
	},
	{
	  "positionId": 4,
	  "clubName": "Astrails - U15",
	  "id": 4,
	  "firstName": "Roach",
	  "lastName": "Ramirez",
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
	  "isSwapped": false
	},
	{
	  "positionId": 5,
	  "clubName": "GODSENT - U18",
	  "id": 5,
	  "firstName": "Hunt",
	  "lastName": "Leblanc",
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
	  "isSwapped": false
	},
	{
	  "positionId": 6,
	  "clubName": "Impulse - U18",
	  "id": 6,
	  "firstName": "Swanson",
	  "lastName": "Cooke",
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
	  "isSwapped": false
	},
	{
	  "positionId": 7,
	  "clubName": "GODSENT - U18",
	  "id": 7,
	  "firstName": "Elena",
	  "lastName": "Holman",
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
	  "isSwapped": false
	},
	{
	  "positionId": 8,
	  "clubName": "GODSENT - U15",
	  "id": 8,
	  "firstName": "Gilliam",
	  "lastName": "Gates",
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
	  "isSwapped": false
	},
	{
	  "positionId": 9,
	  "clubName": "GODSENT - U18",
	  "id": 9,
	  "firstName": "Carney",
	  "lastName": "Rosa",
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
	  "isSwapped": false
	}
  ];
@Component({
  selector: 'app-participating-players',
  templateUrl: './participating-players.component.html',
  styleUrls: ['./participating-players.component.scss']
})
export class ParticipatingPlayersComponent implements OnInit {
	private players = [];
	private excludedPlayers = players;
	private includedPlayers = includedPlayers;

	constructor() {
		this.players = players;
	}

	ngOnInit() {
		// this.excludedPlayers = [...this.players];
		// this.includedPlayers = [...this.players];
		console.log('excludedPlayers', this.excludedPlayers);
	}

}
