import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-training-phases',
  templateUrl: './step-training-phases.component.html',
  styleUrls: ['./step-training-phases.component.scss']
})
export class StepTrainingPhasesComponent implements OnInit {
  @Input() stepTrainingPhasesData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();
  isNextBtnDisabled = false;
  trainingPhases;
  
  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    console.log('stepTrainingPhasesData: ', this.stepTrainingPhasesData);
  }

  // validateTraining() {
  //   this.teamEventValidationService.trainingDataOutput.step3PhasesData = this.stepTrainingPhasesData;
  //   this.teamEventValidationService.validateTraining();
  // }

  nextStep() {
    this.teamEventValidationService.trainingDataOutput.step3PhasesData = this.stepTrainingPhasesData;
    this.stepSelectionEmitter.emit(3);
  }

  backStep() {
    this.stepSelectionEmitter.emit(1);
  }
}
