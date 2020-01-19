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

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    console.log('stepMatchPhasesData: ', this.stepMatchPhasesData);
  }

  nextStep() {
    this.teamEventValidationService.matchDataOutput.step4PhasesData = this.stepMatchPhasesData;
    this.stepSelectionEmitter.emit(4);
  }

  backStep() {
    this.stepSelectionEmitter.emit(2);
  }
}
