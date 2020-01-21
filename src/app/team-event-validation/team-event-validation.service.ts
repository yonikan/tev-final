import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';
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

  linup = [];
  availableForSub = [];

  constructor(
    private http: HttpClient,
    private serverEnvService: ServerEnvService
  ) {
    this.setFormation();
  }

  getTrainingData(trainingId): any {
    const PATH = this.serverEnvService.getBaseUrl();
    return this.http.get<any>(`${PATH}/v3/training/${trainingId}`);
  }

  validateTraining(trainingId) {
    console.log('trainingDataOutput: ', this.trainingDataOutput);
    const PATH = this.serverEnvService.getBaseUrl();
    const PAYLOAD = null;
    return this.http.post<any>(`${PATH}/v3/training/${trainingId}`, PAYLOAD);
  }

  getMatchData(matchId): any {
    // return this.matchData;
    const PATH = this.serverEnvService.getBaseUrl();
    return this.http.get<any>(`${PATH}/v3/match/${matchId}`);
  }

  validateMatch(matchId) {
    console.log('matchDataOutput: ', this.matchDataOutput);
    const PATH = this.serverEnvService.getBaseUrl();
    const PAYLOAD = null;
    return this.http.post<any>(`${PATH}/v3/match/${matchId}`, PAYLOAD);
  }

  getPlayerById(playerId) {
  //   return TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList[playerId] || {};
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
  //   return TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList || [];
  }

  setFormation() {
    // const participatingPlayers = TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList;
    // this.linup = TEAM_EVENT_VALIDATION_MATCH.formation.formationPosition;
    // this.availableForSub = { ...participatingPlayers };
    // this.linup.forEach((player) => {
    //   const playerId = player.playerId;
    //   if (participatingPlayers.hasOwnProperty(playerId) && participatingPlayers[playerId]) { delete this.availableForSub[playerId] };
    // });

    // console.log(participatingPlayers, this.linup, this.availableForSub)
    // this.availableForSub = participatingPlayers.filter((player) => {
    //   return this.isPlayerInLineup(player);
    // });
  }

  isPlayerInLineup(player) {
    return this.linup.some((lineupPlayer) => {
      return lineupPlayer.playerId === player.playerId;
    });
  }

  isPlayerPartitpateInOverlapPhase(playerId, phaseToCheck) {
  //   TEAM_EVENT_VALIDATION_MATCH.phases.phasesList.forEach((phase)=>{
  //     if (this.isTimeRangesOverlap(phaseToCheck, phase)) {
  //       return phase.linup.some((player)=>{
  //         return player.playerId === playerId;
  //       });
  //     }
  //   });
  }

  isTimeRangesOverlap(timescope1, timescope2) {
    // const range  = moment.range(new Date(year, month, day, hours, minutes), new Date(year, month, day, hours, minutes));
    // const range2 = moment.range(new Date(year, month, day, hours, minutes), new Date(year, month, day, hours, minutes));
    // range.overlaps(range2);
    return true;
  }
}

