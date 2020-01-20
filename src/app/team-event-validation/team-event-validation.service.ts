import { Injectable } from '@angular/core';
import { TrainingValidation, MatchValidation } from './team-event-validation.model';
import { TEAM_EVENT_VALIDATION_TRAINING } from 'server/data/team-event-validation-training.data';
import { TEAM_EVENT_VALIDATION_MATCH } from 'server/data/team-event-validation-match.data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamEventValidationService {

  linup = [];
  availableForSub = [];

  trainingData: any = {
    step1GeneralData: {
      test1: 'this is a test'
    },
    step2PlayersData: {
      test1: 'this is a test'
    },
    step3PhasesData: {
      test1: 'this is a test'
    }
  };

  matchData: any = {
    step1OverviewData: {
      data: 'this is a test'
    },
    step2PlayersData: {
      data: {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        defaultPositionId: 1,
        activeTime: {
          startTime: 1, endTime: 1
        },
        isParticipated: true,
        errorId: 1
      }
    },
    step3FormationsData: {
      data: 'this is a test'
    },
    step4PhasesData: {
      data: {
        id: 1,
        type: 1,
        name: 1,
        startTime: 1,
        endTime: 1,
        offset: 1,
        numberOfSubs: 1
      }
    },
    step5SubsData: {
      data: {
        id: 1,
        inPlayerId: 1,
        outPlayerId: 1,
        timeMin: 1
      }
    }
  };

  trainingDataOutput: any = {
    step1GeneralData: {

    },
    step2PlayersData: {

    },
    step3PhasesData: {

    }
  };

  matchDataOutput: any = {
    step1OverviewData: {

    },
    step2PlayersData: {

    },
    step3FormationsData: {

    },
    step4PhasesData: {

    },
    step5SubsData: {

    }
  };

  constructor() {
    this.setFormation();
  }

  getTrainingDataNewModel(): any {
    return of(TEAM_EVENT_VALIDATION_TRAINING);
  }

  getMatchDataNewModel(): any {
    return of(TEAM_EVENT_VALIDATION_MATCH);
  }

  getTrainingData(): any {
    return this.trainingData;
  }

  getMatchData(): any {
    return this.matchData;
  }

  validateTraining() {
    console.log('trainingDataOutput: ', this.trainingDataOutput);
  }

  validateMatch() {
    console.log('matchDataOutput: ', this.matchDataOutput);
  }

  getPlayerById(playerId) {
    return TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList[playerId] || {};
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
    return TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList || [];
  }

  setFormation() {
    const participatingPlayers = TEAM_EVENT_VALIDATION_MATCH.participatingPlayers.playersList;
    this.linup = TEAM_EVENT_VALIDATION_MATCH.formation.formationPosition;
    this.availableForSub = { ...participatingPlayers };
    this.linup.forEach((player) => {
      const playerId = player.playerId;
      if (participatingPlayers.hasOwnProperty(playerId) && participatingPlayers[playerId]) { delete this.availableForSub[playerId] };
    });
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
    TEAM_EVENT_VALIDATION_MATCH.phases.phasesList.forEach((phase)=>{
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

