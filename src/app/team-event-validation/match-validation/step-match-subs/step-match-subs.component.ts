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
		// console.log('stepMatchSubsData: ', this.stepMatchSubsData);
	}

	validateMatch(data) {
		this.teamEventValidationService.matchDataOutput.step5SubsData = this.stepMatchSubsData;
		this.stepSelectionEmitter.emit(5);
	}

	previousStep() {
		this.stepSelectionEmitter.emit(-1);
	}

	onMatchSubsEmitter(matchSubsData) {
		console.log('matchSubsData: ', matchSubsData);
		// const matchData = this.teamEventValidationService.getMatchValidationData();
		// let matchDataCopy = {...matchData};
		// matchDataCopy.substitutions = matchSubsData;
		// this.teamEventValidationService.setMatchValidationData(matchDataCopy);
	}
}
