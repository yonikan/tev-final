import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { VerticesData } from '../../team-event-validation.interface';

@Component({
	selector: 'app-step-training-general',
	templateUrl: './step-training-general.component.html',
	styleUrls: ['./step-training-general.component.scss']
})
export class StepTrainingGeneralComponent implements OnInit, OnChanges {
	@Input() stepTrainingGeneralData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();
	isNextBtnDisabled = false;
	trainingDuration;
	trainingTags;
	verticesData: VerticesData = {velInterpMs: 0, timeDtMs: 0, startTimeInterpMs: 0};
	highlightedRange = {
		startTime: 0,
		endTime: 0
	};

	constructor(private teamEventValidationService: TeamEventValidationService) { }

	ngOnInit() {
		console.log('stepTrainingGeneralData: ', this.stepTrainingGeneralData);
		// this.teamEventValidationService.phasesVerticesData
		//   .subscribe(verticesData => this.verticesData = verticesData);
	}

	ngOnChanges() {
		if (this.stepTrainingGeneralData && 'velocityVectors' in this.stepTrainingGeneralData) {
			this.verticesData = this.stepTrainingGeneralData.velocityVectors;

			const d = new Date(this.stepTrainingGeneralData.velocityVectors.startTimeInterpMs + 30 * 60000);
			this.highlightedRange = {
				startTime: this.stepTrainingGeneralData.velocityVectors.startTimeInterpMs,
				endTime: d.getTime()
			}
		}
	}

	nextStep() {
		// this.teamEventValidationService.setTrainingValidationData({...this.stepTrainingGeneralData, });
		// this.teamEventValidationService.trainingDataOutput.step1GeneralData = this.stepTrainingGeneralData;
		this.stepSelectionEmitter.emit(1);
	}

	onTagsEmitter(tags) {
		let trimmedTags = [];
		tags.forEach(tag => {
			trimmedTags.push(tag.name);
		});
		let trainingData = this.teamEventValidationService.getTrainingValidationData();
		trainingData.metadata.tags = trimmedTags;
		this.teamEventValidationService.setTrainingValidationData(trainingData);
	}
}
