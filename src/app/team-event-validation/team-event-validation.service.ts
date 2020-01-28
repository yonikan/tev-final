import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
// import { TEAM_EVENT_VALIDATION_MATCH_DATA } from 'server/data/team-event-validation-match.data';
import { UiComponentsService } from '../core/services/ui-components.service';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

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

  linup = [];
  availableForSub = [];

  constructor(
    private http: HttpClient,
    private uiComponentsService: UiComponentsService,
    private serverEnvService: ServerEnvService
  ) {
    // this.setFormation();
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
    const PAYLOAD = null;
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
    const PAYLOAD = null;
    return this.http.post<any>(`${PATH}/v3/match/${matchId}`, PAYLOAD);
  }

  getCurrentTeamEventType(): number {
    this.currentTeamEventType = this.uiComponentsService.getIsSidepanelOpen().teamEventType;
    return this.currentTeamEventType;
  }

  getTrainingValidationData(): any {
    // console.log('trainingValidationData: ', this.trainingValidationData)
    return this.trainingValidationData;
  }

  setTrainingValidationData(data: any) {
    // console.log(data)
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
    // console.log(data)
    this.matchValidationData = data;
    this.matchValidationDataListener.next(data);
  }

  getMatchValidationDataListener(): Observable<any> {
    return this.matchValidationDataListener.asObservable();
  }

  getCurrentValitationData() {
    switch (this.getCurrentTeamEventType()) {
      case 1:
        // console.log('getCurrentValitationData: ', this.getTrainingValidationData(), this.currentTeamEventType)
        return this.getTrainingValidationData();

      case 2:
        // console.log('getCurrentValitationData: ', this.getMatchValidationData(), this.currentTeamEventType)
        return this.getMatchValidationData();
    }
  }

  getPlayerById(playerId) {
    return this.getCurrentValitationData().participatingPlayers[playerId] || {};
  }

  getPlayersByIds(playerIds, key?) {
    return playerIds.map((playerId) => {
      return this.getPlayerById(key ? playerId[key] : playerId);
    })
  }

  getPositionById(positionId) {
    const positions = { 1: 'Goalkeepers', 2: 'Defenders' }
    return positions[positionId];
  }

  getAllParticipatingPlayers() {
    // console.log('getCurrentValitationData: ', this.getCurrentValitationData(), this.getMatchValidationData());
    return this.getCurrentValitationData().participatingPlayers || [];
  }

  setFormation() {
    // console.log(this.getCurrentValitationData())
    const participatingPlayers = this.getCurrentValitationData().participatingPlayers;
    this.linup = this.getCurrentValitationData().formation.formationPosition;
    this.availableForSub = { ...participatingPlayers };
    this.linup.forEach((player) => {
      const playerId = player.playerId;
      if (participatingPlayers.hasOwnProperty(playerId) && participatingPlayers[playerId]) { delete this.availableForSub[playerId] };
    });


    this.availableForSub = participatingPlayers.filter((player) => {
      return this.isPlayerInLineup(player);
    });
  }

  isPlayerInLineup(player) {
    return this.linup.some((lineupPlayer) => {
      return lineupPlayer.playerId === player.playerId;
    });
  }

  isPlayerPartitpateInOverlapPhase(playerId, phaseToCheck) {
    this.getCurrentValitationData().phases.phasesList.forEach((phase) => {
      if (phase.id !== phaseToCheck.id && this.isTimeRangesOverlap(phaseToCheck, phase)) {
        // return phase.linup.some((player) => {
        //   return player.playerId === playerId;
        // });
      }
    });
  }

  isTimeRangesOverlap(timescope1, timescope2) { // npm install --save moment-range
    // return true;
    const range = moment.range(timescope1.startTime, timescope1.endTime);
    const range2 = moment.range(timescope2.startTime, timescope2.endTime);
    console.log(range,range2,range.overlaps(range2))
    return range.overlaps(range2);
  }
}

