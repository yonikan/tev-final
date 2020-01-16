import { Injectable } from '@angular/core';
import { TrainingValidation, MatchValidation } from './team-event-validation.model';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';

@Injectable({
  providedIn: 'root'
})
export class TeamEventValidationService {
  trainingData: TrainingValidation = {
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

  matchData: MatchValidation = {
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

  // matchData: MatchValidation = {
  //   step1OverviewData: {
  //     test1: 'this is a test'
  //   },
  //   step2PlayersData: {
  //     test1: 'this is a test'
  //   },
  //   step3FormationsData: {
  //     test1: 'this is a test'
  //   },
  //   step4PhasesData: {
  //     test1: 'this is a test'
  //   },
  //   step5SubsData: {
  //     test1: 'this is a test'
  //   }
  // };

  trainingDataOutput: TrainingValidation = {
    step1GeneralData: {
      
    },
    step2PlayersData: {
      
    },
    step3PhasesData: {
      
    }
  };
  
  matchDataOutput: MatchValidation = {
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

  constructor(
    private http: HttpClient,
    private serverEnvService: ServerEnvService
  ) { }

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

  testApi(trainingId) {
    const PATH = this.serverEnvService.getBaseUrl();
    this.http.get<any>(`${PATH}/v3/training/${trainingId}`)
      .subscribe(
        (response: any) => {
          console.log('response: ', response);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
