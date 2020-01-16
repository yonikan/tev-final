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
    this.teamEventValidationService.testApi(49609);
    const trainingData = this.teamEventValidationService.getTrainingData();
    this.step1Data = trainingData.step1GeneralData;
    this.step2Data = trainingData.step2PlayersData;
    this.step3Data = trainingData.step3PhasesData;
  }

  onStepSelectionEmitter(stepNumber) {
    this.currentSelectedStep = stepNumber;
  }
  
  onValidateTraining(trainingPayload) {
    console.log('trainingPayload: ', trainingPayload);
    this.teamEventValidationService.validateTraining();
  }
}
