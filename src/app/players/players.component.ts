import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fadeInRightAnimation } from '../core/animations/fade-in-right.animation';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  animations: [fadeInRightAnimation]
})
export class PlayersComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}
