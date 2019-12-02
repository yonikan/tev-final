import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {
  pageName = 'team overview';
  isLoading = true;
  isLoadRiskFeatureEnabled = false;
  isPerformanceOvertimeFeatureEnabled = false;
  isLeaderBoardFeatureEnabled = false;

  constructor(
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    this.isLoadRiskFeatureEnabled = this.authorizationService.isFeatureEnabled('loadRisk') ? true : false;
    this.isPerformanceOvertimeFeatureEnabled = this.authorizationService.isFeatureEnabled('performanceOvertime') ? true : false;
    this.isLeaderBoardFeatureEnabled = this.authorizationService.isFeatureEnabled('leaderBoard') ? true : false;
    // this.isLoadRiskFeatureEnabled = false;
    // this.isPerformanceOvertimeFeatureEnabled = false;
    // this.isLeaderBoardFeatureEnabled = false;

    this.isLoading = false;
  }
}
