import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamPickerService } from '../../core/services/team-picker.service';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit, OnDestroy {
  pageName = 'team overview';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;
  isLoadRiskFeatureEnabled = false;
  isPerformanceOvertimeFeatureEnabled = false;
  isLeaderBoardFeatureEnabled = false;

  constructor(
    public teamPickerService: TeamPickerService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.isLoadRiskFeatureEnabled = this.authorizationService.isFeatureEnabled('loadRisk') ? true : false;
    this.isPerformanceOvertimeFeatureEnabled = this.authorizationService.isFeatureEnabled('performanceOvertime') ? true : false;
    this.isLeaderBoardFeatureEnabled = this.authorizationService.isFeatureEnabled('leaderBoard') ? true : false;
    // this.isLoadRiskFeatureEnabled = false;
    // this.isPerformanceOvertimeFeatureEnabled = false;
    // this.isLeaderBoardFeatureEnabled = false;

    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe((currentTeam: string) => {
        // console.log('TEAM OVERVIEW - currentTeam: ', currentTeam);
        this.isLoading = false;
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
