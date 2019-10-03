import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-board-row',
  templateUrl: './leader-board-row.component.html',
  styleUrls: ['./leader-board-row.component.scss']
})
export class LeaderBoardRowComponent implements OnInit {
  userAvatarUrl = 'https://s3.eu-central-1.amazonaws.com/motionizefootball/dashboard_placeholders/user_img_placeholder.png'

  constructor() { }

  ngOnInit() {
  }

}
