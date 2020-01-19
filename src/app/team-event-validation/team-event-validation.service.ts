import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from '../core/services/server-env.service';

@Injectable({
  providedIn: 'root'
})
export class TeamEventValidationService {
  trainingDataOutput = {
    step1GeneralData: null,
    step2PlayersData: null,
    step3PhasesData: null
  };
  matchDataOutput;

  constructor(
    private http: HttpClient,
    private serverEnvService: ServerEnvService
  ) { }

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

  validateMatch() {
    console.log('matchDataOutput: ', this.matchDataOutput);
  }
}
