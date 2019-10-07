import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../core/animations/fade-in-up.animation';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  animations: [fadeInUpAnimation]
})
export class MatchesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
