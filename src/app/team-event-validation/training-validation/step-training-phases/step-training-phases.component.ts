import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { VerticesData } from '../../team-event-validation.interface';

@Component({
	selector: 'app-step-training-phases',
	templateUrl: './step-training-phases.component.html',
	styleUrls: ['./step-training-phases.component.scss']
})
export class StepTrainingPhasesComponent implements OnInit, OnChanges {
	@Input() stepTrainingPhasesData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();
	isNextBtnDisabled = false;
	trainingPhases;
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
		this.plotBands = this.stepTrainingPhasesData.phasesList.map(({startTime, endTime}) => ({from: startTime, to: endTime}));
		// this.teamEventValidationService.phasesVerticesData
		//   .subscribe(verticesData => this.verticesData = verticesData);
	}

	ngOnChanges() {
		if (this.stepTrainingPhasesData && 'velocityVectors' in this.stepTrainingPhasesData) {
			this.verticesData = this.stepTrainingPhasesData.velocityVectors;
		}
	}

	nextStep() {
		this.teamEventValidationService.trainingDataOutput.step3PhasesData = this.stepTrainingPhasesData;
		this.stepSelectionEmitter.emit(3);
	}

	backStep() {
		this.stepSelectionEmitter.emit(1);
	}
}
