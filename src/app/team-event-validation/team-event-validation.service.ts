import { Injectable } from '@angular/core';
import { TrainingValidation, MatchValidation } from './team-event-validation.model';
import { TEAM_EVENT_VALIDATION_TRAINING } from 'server/data/team-event-validation-training.data';
import { TEAM_EVENT_VALIDATION_MATCH } from 'server/data/team-event-validation-match.data';
import { of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';
import { DataService } from '../core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TeamEventValidationService {
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

  private BASE_URL = '/';

  constructor(private http: HttpClient, private serverEnvService: ServerEnvService, private dataService: DataService) {
	this.BASE_URL = serverEnvService.getBaseUrl(3);
  }

  revertSwaps(teamEventId=49609, onSuccess) {
	this.http.put(`${this.BASE_URL}/team-event/${teamEventId}/revert-swaps`, {})
		.subscribe(onSuccess);
  }

  swapPlayer(srcId, swapId, teamEventId=49609, onSuccess) {
	  this.http.put(`${this.BASE_URL}/team-event/${teamEventId}/swap`, {srcId, swapId})
	  	.subscribe(onSuccess);
  }

  getPlayersForSwap(subject: Subject<any>, teamEventId=49609) {
		this.http
			.get(`${this.BASE_URL}/team-event/${teamEventId}/players-for-swap`)
			.subscribe((data: any) => {
				return subject.next({clubPlayers: data.map(player => ({
					...player,
					positionName: this.dataService.metadata.positions[player.positionId] || this.dataService.metadata.positions.default
				}))});
			})
  }

  getParticipatingPlayers(subject: Subject<any>, teamEventId=49609) {
	this.http
		.get(`${this.BASE_URL}/training/${teamEventId}`)
		.subscribe((data: any) => {
			// HACK: remove tmp code
			const players = Object.values(data.participatingPlayers).map(
				(p: any) => ({...p, "profilePic": "https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1573040414.jpg"}));

			return subject.next({allPlayers: players});
		});
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
}

