import { Component, OnInit, ViewChild, Input } from '@angular/core';

const clubPlayers = [
	{
	  "_id": 1,
	  "name": "Flum - U15",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Cervantes",
		  "lastName": "Kelly",
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
		  "positionId": 2,
		  "id": 2,
		  "firstName": "Camille",
		  "lastName": "May",
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
		  "positionId": 3,
		  "id": 3,
		  "firstName": "Christian",
		  "lastName": "Sharp",
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
		  "firstName": "Dyer",
		  "lastName": "Hughes",
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
		  "positionId": 5,
		  "id": 5,
		  "firstName": "Corina",
		  "lastName": "Mooney",
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
		  "firstName": "Mclaughlin",
		  "lastName": "Cook",
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
		  "firstName": "Nellie",
		  "lastName": "Solomon",
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
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Shelby",
		  "lastName": "Higgins",
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
		  "firstName": "Shawna",
		  "lastName": "Taylor",
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
		  "positionId": 10,
		  "id": 10,
		  "firstName": "Hurley",
		  "lastName": "Pittman",
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
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Teri",
		  "lastName": "Charles",
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
	  "_id": 2,
	  "name": "Podunk - U15",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Wise",
		  "lastName": "Sykes",
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
		  "positionId": 2,
		  "id": 2,
		  "firstName": "Trina",
		  "lastName": "Patterson",
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
		  "firstName": "Erma",
		  "lastName": "Vasquez",
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
		  "firstName": "Pearson",
		  "lastName": "Whitney",
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
		  "positionId": 5,
		  "id": 5,
		  "firstName": "Carmela",
		  "lastName": "Mendez",
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
		  "positionId": 6,
		  "id": 6,
		  "firstName": "Iris",
		  "lastName": "Duncan",
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
		  "positionId": 7,
		  "id": 7,
		  "firstName": "Angelica",
		  "lastName": "Montoya",
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
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Chris",
		  "lastName": "Boyle",
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
		  "firstName": "Brown",
		  "lastName": "Blankenship",
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
		  "firstName": "Rice",
		  "lastName": "Bauer",
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
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Gayle",
		  "lastName": "Meadows",
		  "positionName": "QB",
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
	  "_id": 3,
	  "name": "Snacktion - U15",
	  "players": [
		{
		  "positionId": 1,
		  "id": 1,
		  "firstName": "Trevino",
		  "lastName": "Ray",
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
		  "firstName": "Winifred",
		  "lastName": "Guerra",
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
		  "firstName": "Browning",
		  "lastName": "Figueroa",
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
		  "firstName": "Margery",
		  "lastName": "Brewer",
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
		  "firstName": "Kitty",
		  "lastName": "Morse",
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
		  "firstName": "Hess",
		  "lastName": "Reilly",
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
		  "firstName": "Love",
		  "lastName": "Casey",
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
		  "positionId": 8,
		  "id": 8,
		  "firstName": "Diane",
		  "lastName": "Hayes",
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
		  "positionId": 9,
		  "id": 9,
		  "firstName": "Winters",
		  "lastName": "Davidson",
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
		  "firstName": "Kidd",
		  "lastName": "Wynn",
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
		  "positionId": 11,
		  "id": 11,
		  "firstName": "Estelle",
		  "lastName": "Atkins",
		  "positionName": "DF",
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
	}
  ];
@Component({
	selector: 'app-swap-players',
	templateUrl: './swap-players.component.html',
	styleUrls: ['./swap-players.component.scss']
})
export class SwapPlayersComponent implements OnInit {
	@Input() clubPlayers = [];
	@ViewChild('matExpansionPanel', null) _matExpansionPanel: any

	constructor() { }

	ngOnInit() {
		this.clubPlayers = clubPlayers;
	}

}
