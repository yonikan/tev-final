import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UiComponentsService } from '../core/services/ui-components.service';
import { ServerEnvService } from '../core/services/server-env.service';
import { TEAM_EVENT_VALIDATION_MATCH_DATA } from 'server/data/team-event-validation-match.data';

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

  constructor(
    private http: HttpClient,
    private uiComponentsService: UiComponentsService,
    private serverEnvService: ServerEnvService
  ) { }

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

  get phasesVerticesData() {
	  return of(TEAM_EVENT_VALIDATION_MATCH_DATA.metadata.velocityVector);
  }
}
