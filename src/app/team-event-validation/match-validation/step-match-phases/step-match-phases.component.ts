import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { VerticesData } from '../../team-event-validation.interface';

@Component({
	selector: 'app-step-match-phases',
	templateUrl: './step-match-phases.component.html',
	styleUrls: ['./step-match-phases.component.scss']
})
export class StepMatchPhasesComponent implements OnInit, OnChanges {
	@Input() stepMatchPhasesData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();

	verticesData: VerticesData;
	highlightedRange = {
		startTime: 0,
		endTime: 0
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
		this.plotBands = this.stepMatchPhasesData.phasesList.map(({startTime, endTime}) => ({from: startTime, to: endTime}));
		// this.teamEventValidationService.phasesVerticesData
		//   .subscribe(verticesData => this.verticesData = verticesData);
	}

	ngOnChanges() {
		if (this.stepMatchPhasesData && 'velocityVector' in this.stepMatchPhasesData) {
			this.verticesData = this.stepMatchPhasesData.velocityVector;
			// const d = new Date(this.stepMatchPhasesData.velocityVector.startTimeInterpMs + 30 * 60000);
			// this.highlightedRange = {
			// 	startTime: this.stepMatchPhasesData.velocityVector.startTimeInterpMs,
			// 	endTime: d.getTime()
			// }
		}
	}

	nextStep() {
		this.teamEventValidationService.matchDataOutput.step4PhasesData = this.stepMatchPhasesData;
		this.stepSelectionEmitter.emit(4);
	}

	previousStep() {
		this.stepSelectionEmitter.emit(-1);
	}
}
