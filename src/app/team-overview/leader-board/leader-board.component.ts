import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  leaderPlayers = [
    {
      playerName: 'yoni kangun',
      playerScore: 78,
      shirtNumber: 22,
      avatarUrl: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'
    },
    {
      playerName: 'yoni kangun',
      playerScore: 54,
      shirtNumber: 22,
      avatarUrl: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'
    },
    {
      playerName: 'yoni kangun',
      playerScore: 49,
      shirtNumber: 22,
      avatarUrl: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'
    },
    {
      playerName: 'yoni kangun',
      playerScore: 44,
      shirtNumber: 22,
      avatarUrl: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'
    },
    {
      playerName: 'yoni kangun',
      playerScore: 34,
      shirtNumber: 22,
      avatarUrl: 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
