import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-subs',
  templateUrl: './step-match-subs.component.html',
  styleUrls: ['./step-match-subs.component.scss']
})
export class StepMatchSubsComponent implements OnInit {
  @Input() stepMatchSubsData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {

  }
  
  validateMatch(data) {
    this.teamEventValidationService.matchDataOutput.step5SubsData = 'test-output';
    this.teamEventValidationService.validateMatch();
  }

  backStep() {
    this.stepSelectionEmitter.emit(3);
  }
}
