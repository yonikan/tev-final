import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

	constructor() { }

	ngOnInit() {
		console.log('stepTrainingPlayersData: ', this.stepTrainingPlayersData);
	}

	nextStep() {
		this.stepSelectionEmitter.emit(2);
	}

	backStep() {
		this.stepSelectionEmitter.emit(-1);
	}

	onParticipatingPlayersEmitter(data) {
		console.log('data: ', data);
	}
}
