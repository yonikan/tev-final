import { Component, OnInit } from '@angular/core';

const players = [
	{
	  "id": 1,
	  "name": "Chandra Luna",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 2,
	  "name": "Anastasia Bowen",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 3,
	  "name": "Alissa Mathews",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 4,
	  "name": "Melisa Nash",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 5,
	  "name": "Meagan Wynn",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 6,
	  "name": "Webster Mcfadden",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 7,
	  "name": "Ella Stafford",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 8,
	  "name": "Weaver Weiss",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 9,
	  "name": "Higgins Velez",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 10,
	  "name": "Wilkinson Cohen",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	}
  ];

const includedPlayers = [
	{
	  "id": 1,
	  "name": "Chandra Luna",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 2,
	  "name": "Anastasia Bowen",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 3,
	  "name": "Alissa Mathews",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 4,
	  "name": "Melisa Nash",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 5,
	  "name": "Meagan Wynn",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 6,
	  "name": "Webster Mcfadden",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 7,
	  "name": "Ella Stafford",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 8,
	  "name": "Weaver Weiss",
	  "positionName": "CB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 9,
	  "name": "Higgins Velez",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
	},
	{
	  "id": 10,
	  "name": "Wilkinson Cohen",
	  "positionName": "RB",
	  "avatarUrl": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"
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
	}

}
