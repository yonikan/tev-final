import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-players',
  templateUrl: './step-match-players.component.html',
  styleUrls: ['./step-match-players.component.scss']
})
export class StepMatchPlayersComponent implements OnInit {
  @Input() stepMatchPlayersData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {

  }

  nextStep() {
    // this.teamEventValidationService.matchDataOutput.step2PlayersData = 'test-output';
    this.stepSelectionEmitter.emit(2);
  }

  backStep() {
    this.stepSelectionEmitter.emit(0);
  }
}
