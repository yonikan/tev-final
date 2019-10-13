import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeamPickerService } from '../core/services/team-picker.service';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../core/services/authorization.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit, OnDestroy {
  pageName = 'team overview';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;

  public isFeatureLoadRiskEnabled = false;


  constructor(public teamPickerService: TeamPickerService, private authorizationService: AuthorizationService) { 
    this.isFeatureLoadRiskEnabled = authorizationService.isFeatureEnabled('featureLoadRisk');
  }

  ngOnInit() {
    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        console.log('TEAM OVERVIEW - currentTeam: ', currentTeam);
        this.isLoading = false;
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
