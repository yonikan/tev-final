import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, OnDestroy {
  pageName = 'players';

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
