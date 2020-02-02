import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UiComponentsService } from '../core/services/ui-components.service';
import { ServerEnvService } from '../core/services/server-env.service';
import { TEAM_EVENT_VALIDATION_MATCH_DATA } from 'server/data/team-event-validation-match.data';
import { StaticDataService } from '../core/services/static-data.service';

@Injectable({
	providedIn: 'root'
})
export class TeamEventValidationService {
	trainingDataOutput = {
		step1GeneralData: null,
		step2PlayersData: null,
		step3PhasesData: null
	};
	matchDataOutput = {
		step1OverviewData: null,
		step2PlayersData: null,
		step3FormationsData: null,
		step4PhasesData: null,
		step5SubsData: null
	};
	private trainingValidationData: any;
	private trainingValidationDataListener = new BehaviorSubject<any>({});
	private matchValidationData: any;
	private matchValidationDataListener = new BehaviorSubject<any>({});
	private currentTeamEventType: number;
	BASE_URL;

	constructor(
		private http: HttpClient,
		private uiComponentsService: UiComponentsService,
		private serverEnvService: ServerEnvService,
		private staticDataService: StaticDataService
	) {
		this.BASE_URL = serverEnvService.getBaseUrl(3);
	}

	fetchTraining(trainingId): any {
		const PATH = this.serverEnvService.getBaseUrl();
		this.http.get<any>(`${PATH}/v3/training/${trainingId}`)
			.subscribe(
				(trainingResp: any) => {
					this.trainingValidationData = trainingResp;
					this.setTrainingValidationData(this.trainingValidationData);
				},
				(error) => {

				}
			);
	}

	validateTraining(trainingId) {
		const PATH = this.serverEnvService.getBaseUrl();
		const PAYLOAD = this.trainingValidationData;
		return this.http.post<any>(`${PATH}/v3/training/${trainingId}`, PAYLOAD);
	}

	fetchMatch(matchId): any {
		const PATH = this.serverEnvService.getBaseUrl();
		this.http.get<any>(`${PATH}/v3/match/${matchId}`)
			.subscribe(
				(matchResp: any) => {
					this.matchValidationData = matchResp;
					this.setMatchValidationData(this.matchValidationData);
				},
				(error) => {

				}
			);
	}

	validateMatch(matchId) {
		const PATH = this.serverEnvService.getBaseUrl();
		const PAYLOAD = this.matchValidationData;
		return this.http.post<any>(`${PATH}/v3/match/${matchId}`, PAYLOAD);
	}

	getCurrentTeamEventType(): number {
		this.currentTeamEventType = this.uiComponentsService.getIsSidepanelOpen().teamEventType;
		return this.currentTeamEventType;
	}

	getTrainingValidationData(): any {
		return this.trainingValidationData;
	}

	setTrainingValidationData(data: any) {
		this.trainingValidationData = data;
		this.trainingValidationDataListener.next(data);
	}

	getTrainingValidationDataListener(): Observable<any> {
		return this.trainingValidationDataListener.asObservable();
	}

	getMatchValidationData(): any {
		return this.matchValidationData;
	}

	setMatchValidationData(data: any) {
		this.matchValidationData = data;
		this.matchValidationDataListener.next(data);
	}

	getMatchValidationDataListener(): Observable<any> {
		return this.matchValidationDataListener.asObservable();
	}


	// Speed graph & participating players methods =========================================================================================
	get phasesVerticesData() {
		return of(TEAM_EVENT_VALIDATION_MATCH_DATA.metadata.velocityVector);
	}

	revertSwaps(teamEventId, onSuccess) {
		this.http.put(`${this.BASE_URL}/v3/team-event/${teamEventId}/revert-swaps`, {})
			.subscribe(onSuccess);
	}

	swapPlayer(srcId, swapId, teamEventId, onSuccess) {
		this.http.put(`${this.BASE_URL}/v3/team-event/${teamEventId}/swap`, { srcId, swapId })
			.subscribe(onSuccess);
	}

	getPlayersForSwap(subject: Subject<any>, teamEventId) {
		this.http
			.get(`${this.BASE_URL}/v3/team-event/${teamEventId}/players-for-swap`)
			.subscribe((data: any) => {
				return subject.next({
					clubPlayers: data.map(player => ({
						...player,
						positionName: this.getPlayerPositionName(player.positionId, 'category')
					}))
				});
			})
	}

	getParticipatingPlayers(subject: Subject<any>, teamEventId, type = 'training') {
		this.http
			.get(`${this.BASE_URL}/v3/${type}/${teamEventId}`)
			.subscribe((data: any) => {
				const players = Object.values(data.participatingPlayers).map(
					(p: any) => ({
						...p,
						positionName: this.getPlayerPositionName(p.defaultPositionId, 'shortName')
					}));

				return subject.next({ allPlayers: players });
			});
	}

	getPlayerPositionName(positionId, prop) {
		const playerPosition = this.staticDataService.getStaticData().positions[positionId];
		return playerPosition
			? playerPosition[prop]
			: playerPosition["0"][prop]
	}
}
