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
  // isLoadRiskFeatureEnabled = false;
  // isPerformanceOvertimeFeatureEnabled = false;
  // isLeaderBoardFeatureEnabled = false;

  constructor(
    // private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {
    // this.isLoadRiskFeatureEnabled = this.authorizationService.isFeatureEnabled('teamOverviewLoadRisk') ? true : false;
    // this.isPerformanceOvertimeFeatureEnabled = this.authorizationService.isFeatureEnabled('teamOverviewPerformanceOvertime') ? true : false;
    // this.isLeaderBoardFeatureEnabled = this.authorizationService.isFeatureEnabled('teamOverviewLeaderBoard') ? true : false;
    this.isLoading = false;
  }
}
