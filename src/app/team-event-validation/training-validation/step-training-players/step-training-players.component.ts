import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
	selector: 'app-step-training-players',
	templateUrl: './step-training-players.component.html',
	styleUrls: ['./step-training-players.component.scss']
})
export class StepTrainingPlayersComponent implements OnInit {
	@Input() teamEventId: any;
	@Input() stepTrainingPlayersData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();
	isNextBtnDisabled = false;
	trainingPlayers;

	constructor(private teamEventValidationService: TeamEventValidationService) { }

	ngOnInit() {
		console.log('stepTrainingPlayersData: ', this.stepTrainingPlayersData);
	}

	onParticipatingPlayersEmitter(data) {
		console.log('data: ', data);

	}

	nextStep() {
		this.stepSelectionEmitter.emit(2);
	}

	backStep() {
		this.stepSelectionEmitter.emit(0);
	}
}
