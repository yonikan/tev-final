import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-training-players',
  templateUrl: './step-training-players.component.html',
  styleUrls: ['./step-training-players.component.scss']
})
export class StepTrainingPlayersComponent implements OnInit {
  @Input() stepTrainingPlayersData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();
  trainingPlayers;

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {

  }

  nextStep() {
    this.teamEventValidationService.trainingDataOutput.step2PlayersData = 'test-output';
    this.stepSelectionEmitter.emit(2);
  }

  backStep() {
    this.stepSelectionEmitter.emit(0);
  }
}
