import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamPickerService } from '../core/services/team-picker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team-configuration',
  templateUrl: './team-configuration.component.html',
  styleUrls: ['./team-configuration.component.scss']
})
export class TeamConfigurationComponent implements OnInit, OnDestroy {
  pageName = 'team configuration';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;
  currentTeam;

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe((currentTeam: any) => {
        // console.log('TEAM CONGIGURATION - currentTeam: ', currentTeam);
        this.isLoading = false;
        this.currentTeam = currentTeam.teamName;
      });
  }

  ngOnDestroy() {
    this.currentTeamUpdateSub.unsubscribe();
  }
}
