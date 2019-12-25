import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { TEAM_EVENTS_DATA } from 'server/data/team-events.data';
import { fadeInOutAnimation } from 'src/app/core/animations/fade-in-out.animation';

@Component({
  selector: 'app-validated-events',
  templateUrl: './validated-events.component.html',
  styleUrls: ['./validated-events.component.scss'],
  animations: [fadeInOutAnimation]
})
export class ValidatedEventsComponent implements OnInit {
  teamEvents;
  isTeamEventsLoading;
  index = 0;
  
  constructor() { }

  ngOnInit() {
    of(TEAM_EVENTS_DATA)
    // .pipe(
    //   map((loginData: any) => loginData.payload),
    // )
    .subscribe((result: any) => {
      this.teamEvents = result.teamEventsValidatedData; // only validated team-events
      this.isTeamEventsLoading = false;
    });
  }

}
