import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamPickerService } from '../core/services/team-picker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit, OnDestroy {
  pageName = 'team overview';
  private currentTeamUpdateSub: Subscription;

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe( selectedTeam => {
        console.log(selectedTeam);
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
