import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-training-general',
  templateUrl: './step-training-general.component.html',
  styleUrls: ['./step-training-general.component.scss']
})
export class StepTrainingGeneralComponent implements OnInit {
  @Input() stepTrainingGeneralData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();
  isNextBtnDisabled = false;
  trainingDuration;
  trainingTags;
  verticesData:{vel_interp_ms, time_dt_ms, start_time_interp_ms};
  highlightedRange = {
    startTime: 1550041200000,
    endTime: 1550043000000
  };
  
  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    this.teamEventValidationService.phasesVerticesData
      .subscribe(verticesData => this.verticesData = verticesData);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('changes: ', changes);
  // }

  nextStep() {
    this.teamEventValidationService.trainingDataOutput.step1GeneralData = this.stepTrainingGeneralData;
    this.stepSelectionEmitter.emit(1);
  }

  onTagsEmitter(tags) {
    console.log(tags);
    this.trainingTags = tags;
  }
}
