import { Component, OnInit } from '@angular/core';
import { TeamPickerService } from '../core/services/team-picker.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.teamPickerService.getCurrentTeamUpdateListener()
      .subscribe( teamEvents => {
        console.log(teamEvents);
      });
  }
}
