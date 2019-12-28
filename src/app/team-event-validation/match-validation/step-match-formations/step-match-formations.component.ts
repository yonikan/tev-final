import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-formations',
  templateUrl: './step-match-formations.component.html',
  styleUrls: ['./step-match-formations.component.scss']
})
export class StepMatchFormationsComponent implements OnInit {
  @Input() stepMatchFormationsData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
    
  }

  nextStep() {
    this.teamEventValidationService.matchDataOutput.step3FormationsData = 'test-output';
    this.stepSelectionEmitter.emit(3);
  }

  backStep() {
    this.stepSelectionEmitter.emit(1);
  }
}
