import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';
import { Observable } from 'rxjs';
import { StaticDataService } from 'src/app/core/services/static-data.service';

@Component({
	selector: 'app-step-match-players',
	templateUrl: './step-match-players.component.html',
	styleUrls: ['./step-match-players.component.scss']
})
export class StepMatchPlayersComponent implements OnInit {
	@Input() teamEventId: any;
	@Input() stepMatchPlayersData: any;
	@Output() stepSelectionEmitter = new EventEmitter<number>();
	playerTimeframeErrors: Observable<object>;

	constructor(private teamEventValidationService: TeamEventValidationService, private staticDataService: StaticDataService) { }

	ngOnInit() {
		this.playerTimeframeErrors = this.staticDataService.getData('player-timeframe-errors', 'team-event-validation')
	}

	nextStep() {
		this.teamEventValidationService.matchDataOutput.step2PlayersData = this.stepMatchPlayersData;
		this.stepSelectionEmitter.emit(2);
	}

	previousStep() {
		this.stepSelectionEmitter.emit(-1);
	}

	onParticipatingPlayersEmitter(participatingPlayersData) {
		console.log('participatingPlayersData: ', participatingPlayersData);
		const matchData = this.teamEventValidationService.getMatchValidationData();
		let matchDataCopy = {...matchData};
		matchDataCopy.participatingPlayers = participatingPlayersData;
		this.teamEventValidationService.setMatchValidationData(matchDataCopy);
	}
}
