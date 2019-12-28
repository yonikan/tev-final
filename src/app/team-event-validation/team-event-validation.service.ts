import { Injectable } from '@angular/core';
import { TrainingValidation, MatchValidation } from './team-event-validation.model';

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

  constructor() { }

  getTrainingData(): any {
    return this.trainingData;
  }

  getMatchData(): any {
    return this.matchData;
  }

  validateTraining(trainingPayload) {
    console.log('trainingDataOutput: ', this.trainingDataOutput);
  }

  validateMatch(matchayload) {
    console.log('matchDataOutput: ', this.matchDataOutput);
  }
}
