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
  verticesData:{vel_interp_ms, time_dt_ms, start_time_interp_ms};
  highlightedRange = {
	  startTime: 1550041200000,
	  endTime: 1550043000000
  };
  plotBands = [
    {
      from: 1550041200000,
      to: 1550043000000
    },
    {
      from: 1550038800000,
      to: 1550040000000
    },
    {
      from: 1550031000000,
      to: 1550031900000
    }
  ];

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    console.log('stepTrainingPhasesData: ', this.stepTrainingPhasesData);
    this.teamEventValidationService.phasesVerticesData
      .subscribe(verticesData => this.verticesData = verticesData);
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
