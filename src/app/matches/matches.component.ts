import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit, OnDestroy {
  pageName = 'matches';

  constructor() {}

  ngOnInit() {

  }

  ngOnDestroy(){
    
  }
}
