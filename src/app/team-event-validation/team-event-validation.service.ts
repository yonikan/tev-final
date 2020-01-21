import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { TEAM_EVENT_VALIDATION_MATCH_DATA } from 'server/data/team-event-validation-match.data';
// import * as moment from 'moment';

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

  linup = [];
  availableForSub = [];

  constructor(
    private http: HttpClient,
    private serverEnvService: ServerEnvService
  ) {
    this.setFormation();
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
    of(TEAM_EVENT_VALIDATION_MATCH_DATA)
    // this.teamEventValidationService.getMatchData(this.matchId)
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

  getPlayerById(playerId) {
      // return this.getMatchValidationData().participatingPlayers.playersList[playerId] || {};
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
      // return this.getMatchValidationData().participatingPlayer.playersList || [];
    }

    setFormation() {
      const participatingPlayers = this.getMatchValidationData().participatingPlayers.playersList;
      this.linup = this.getMatchValidationData().formation.formationPosition;
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
      this.getMatchValidationData().phases.phasesList.forEach((phase)=>{
        if (this.isTimeRangesOverlap(phaseToCheck, phase)) {
          return phase.linup.some((player)=>{
            return player.playerId === playerId;
          });
        }
      });
    }

    isTimeRangesOverlap(timescope1, timescope2) {
      // const range  = moment.range(new Date(year, month, day, hours, minutes), new Date(year, month, day, hours, minutes));
      // const range2 = moment.range(new Date(year, month, day, hours, minutes), new Date(year, month, day, hours, minutes));
      // range.overlaps(range2);
      return true;
    }
}

