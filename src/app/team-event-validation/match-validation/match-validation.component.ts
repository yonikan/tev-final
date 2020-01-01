import { Component, OnInit } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';

@Component({
  selector: 'app-match-validation',
  templateUrl: './match-validation.component.html',
  styleUrls: ['./match-validation.component.scss']
})
export class MatchValidationComponent implements OnInit {
  step1Data: any;
  step2Data: any;
  step3Data: any;
  step4Data: any;
  step5Data: any;
  matchValidationPayload: any;
  currentSelectedStep = 0;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.teamEventValidationService.getMatchDataNewModel()
      .subscribe((teamEventValidationData: any) => {
		  console.log('teamEventValidationData', teamEventValidationData);
        // console.log('teamEventValidationData: ', teamEventValidationData);
        this.step1Data = teamEventValidationData.metadata;
        this.step2Data = teamEventValidationData.participatingPlayers;
        this.step3Data = teamEventValidationData.formation;
        this.step4Data = teamEventValidationData.phases;
        this.step5Data = teamEventValidationData.substitutions;
      });
  }

  onStepSelectionEmitter(stepNumber) {
    this.currentSelectedStep = stepNumber;
  }

  onValidateMatch(matchPayload) {
    console.log('matchPayload: ', matchPayload);
    this.teamEventValidationService.validateMatch();
  }
}
