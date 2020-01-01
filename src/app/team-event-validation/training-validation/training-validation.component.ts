import { Component, OnInit } from '@angular/core';
import { TeamEventValidationService } from '../team-event-validation.service';

@Component({
  selector: 'app-training-validation',
  templateUrl: './training-validation.component.html',
  styleUrls: ['./training-validation.component.scss']
})
export class TrainingValidationComponent implements OnInit {
  step1Data: any;
  step2Data: any;
  step3Data: any;
  trainingValidationPayload: any;
  currentSelectedStep = 0;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.teamEventValidationService.getTrainingDataNewModel()
      .subscribe((teamEventValidationData: any) => {
        // console.log('teamEventValidationData: ', teamEventValidationData);
        this.step1Data = teamEventValidationData.metadata;
        this.step2Data = teamEventValidationData.participatingPlayers;
        this.step3Data = teamEventValidationData.phases;
      });
  }

  onStepSelectionEmitter(stepNumber) {
    this.currentSelectedStep = stepNumber;
  }

  onValidateTraining(trainingPayload) {
    console.log('trainingPayload: ', trainingPayload);
    this.teamEventValidationService.validateTraining();
  }
}
