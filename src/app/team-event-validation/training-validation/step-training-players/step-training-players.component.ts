import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StaticDataService } from 'src/app/core/services/static-data.service';
import { Observable } from 'rxjs';

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
	playerTimeframeErrors: Observable<Object>;

	constructor(private staticDataService: StaticDataService) { }

	ngOnInit() {
		this.playerTimeframeErrors = this.staticDataService.getData('player-timeframe-errors', 'team-event-validation')
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
