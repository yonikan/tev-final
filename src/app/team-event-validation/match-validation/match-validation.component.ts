import { Component, OnInit, Input } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';
import { UiComponentsService } from '../../core/services/ui-components.service';
import { of } from 'rxjs';
import { TEAM_EVENT_VALIDATION_MATCH_DATA } from 'server/data/team-event-validation-match.data';

@Component({
  selector: 'app-match-validation',
  templateUrl: './match-validation.component.html',
  styleUrls: ['./match-validation.component.scss']
})
export class MatchValidationComponent implements OnInit {
  @Input() matchId: number;
  isLoading = true;
  currentSelectedStep = 0;
  step1Data: any;
  step2Data: any;
  step3Data: any;
  step4Data: any;
  step5Data: any;

  constructor(
    private teamEventValidationService: TeamEventValidationService,
    private uiComponentsService: UiComponentsService
  ) { }

  ngOnInit() {
    console.log(this.matchId);
    of(TEAM_EVENT_VALIDATION_MATCH_DATA)
    // this.teamEventValidationService.getMatchData(this.matchId)
      .subscribe(
        (matchResp: any) => {
          this.isLoading = false;
          this.step1Data = matchResp.metadata;
          this.step2Data = matchResp.participatingPlayers;
          this.step3Data = matchResp.formation;
          this.step4Data = matchResp.phases;
          this.step5Data = matchResp.substitutions;
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
  
  onStepSelectionEmitter(stepNumber) {
    // console.log('stepNumber: ', stepNumber);
    this.currentSelectedStep = stepNumber;
    if(stepNumber === 5) {
      this.isLoading = true;
      this.teamEventValidationService.validateMatch(this.matchId)
        .subscribe(
          (matchResp: any) => {
            this.isLoading = false;
            this.uiComponentsService.setIsSidepanelOpen({isOpen: false, teamEventType: null, teamEventId: null});
          },
          (error) => {
            console.log('error: ', error);
            this.isLoading = false;
            this.uiComponentsService.setIsSidepanelOpen({isOpen: false, teamEventType: null, teamEventId: null});
          }
        );
    }
  }
}
