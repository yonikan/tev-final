import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';
import { UiComponentsService } from '../../core/services/ui-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-match-validation',
  templateUrl: './match-validation.component.html',
  styleUrls: ['./match-validation.component.scss']
})
export class MatchValidationComponent implements OnInit, OnDestroy {
  @Input() matchId: number;
  isLoading = true;
  currentSelectedStep = 0;
  step1Data: any;
  step2Data: any;
  step3Data: any;
  step4Data: any;
  step5Data: any;
  matchValidationData: any;
  private matchValidationDataSub: Subscription;

  constructor(
    private teamEventValidationService: TeamEventValidationService,
    private uiComponentsService: UiComponentsService
  ) { }

  ngOnInit() {
    console.log(this.matchId);
    this.teamEventValidationService.fetchMatch(this.matchId);
    this.matchValidationDataSub = this.teamEventValidationService
      .getMatchValidationDataListener()
      .subscribe((matchValidationData: any) => {
        // console.log('trainingValidationData: ', trainingValidationData);
          this.isLoading = false;
          this.step1Data = matchValidationData.metadata;
          this.step2Data = matchValidationData.participatingPlayers;
          this.step3Data = matchValidationData.formation;
          this.step4Data = matchValidationData.phases;
          this.step5Data = matchValidationData.substitutions;
      });
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

  ngOnDestroy() {
    this.matchValidationDataSub.unsubscribe();
  }
}
