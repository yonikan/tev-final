import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import FormationService from './formation.service';
import { StaticDataService } from 'src/app/core/services/static-data.service';

const players = [
	{ id: 1, name: 'John A.', "positionName": "XX" },
	{ id: 2, name: 'John B.', "positionName": "XX" },
	{ id: 3, name: 'John C.', "positionName": "XX" },
	{ id: 4, name: 'John A.', "positionName": "XY" },
	{ id: 5, name: 'John B.', "positionName": "XY" },
	{ id: 6, name: 'John A.', "positionName": "XZ" },
	{ id: 7, name: 'John B.', "positionName": "XZ" },
];

@Component({
	selector: 'app-step-match-formations',
	templateUrl: './step-match-formations.component.html',
	styleUrls: ['./step-match-formations.component.scss']
})
export class StepMatchFormationsComponent implements OnInit {
	@Input() stepMatchFormationsData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();

	playersData = [
		{ id: 1, name: 'Goalkeepers', players, positionName: 'GK' },
		{ id: 2, name: 'Defenders', players, positionName: 'DF' },
		{ id: 3, name: 'Midfielders', players, positionName: 'MF' },
		{ id: 4, name: 'Forwards', players, positionName: 'FR' }
	];

	tactics = null;

	definedSubs = [
		{ id: 1, name: 'Match Minutes', isSelected: true },
		{ id: 2, name: 'Phase Minutes', isSelected: false }
	];

	selectedFormation = {};

	constructor(
		private formationService: FormationService,
		private teamEventValidationService: TeamEventValidationService,
		private staticDataService: StaticDataService) {

	}


	ngOnInit() {
		this.staticDataService.getData('formations').subscribe(data => {
			this.tactics = data;
		})
	}

	selectTactic(tacticFormation) {
		console.log('tacticFormation', tacticFormation);
		this.selectedFormation = tacticFormation;
	}

	selectDefinedSub(id) {
		// console.log('selectDefinedSub', id);
	}

	nextStep() {
		this.teamEventValidationService.matchDataOutput.step3FormationsData = this.stepMatchFormationsData;
		this.stepSelectionEmitter.emit(3);
	}

	backStep() {
		this.stepSelectionEmitter.emit(1);
	}
}
