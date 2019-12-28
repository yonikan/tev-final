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
      test1: 'this is a test'
    },
    step2PlayersData: {
      test1: 'this is a test'
    },
    step3FormationsData: {
      test1: 'this is a test'
    },
    step4PhasesData: {
      test1: 'this is a test'
    },
    step5SubsData: {
      test1: 'this is a test'
    }
  };
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
