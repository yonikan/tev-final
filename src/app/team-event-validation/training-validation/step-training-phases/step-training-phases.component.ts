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
  trainingPhases;
  
  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {

  }

  validateTraining(data) {
    this.teamEventValidationService.trainingDataOutput.step3PhasesData = 'test-output';
    this.teamEventValidationService.validateTraining(data);
  }

  backStep() {
    this.stepSelectionEmitter.emit(1);
  }
}
