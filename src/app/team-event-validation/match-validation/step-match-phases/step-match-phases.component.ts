import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-phases',
  templateUrl: './step-match-phases.component.html',
  styleUrls: ['./step-match-phases.component.scss']
})
export class StepMatchPhasesComponent implements OnInit {
  @Input() stepMatchPhasesData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();

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
    console.log('stepMatchPhasesData: ', this.stepMatchPhasesData);
    this.teamEventValidationService.phasesVerticesData
      .subscribe(verticesData => this.verticesData = verticesData);
  }

  nextStep() {
    this.teamEventValidationService.matchDataOutput.step4PhasesData = this.stepMatchPhasesData;
    this.stepSelectionEmitter.emit(4);
  }

  backStep() {
    this.stepSelectionEmitter.emit(2);
  }
}
