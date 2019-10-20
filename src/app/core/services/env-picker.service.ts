import { Injectable } from '@angular/core';
import { AppConsts } from '../../../app/app.consts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvPickerService {
  private currentServerEnv = 'dev'; // Hard-coded for now
  private currentServerEnvListener = new BehaviorSubject<string>('dev');
  
  constructor() { }

  getCurrentServerEnv() {
    return this.currentServerEnv;
  }

  getCurrentServerEnvListener() {
    return this.currentServerEnvListener.asObservable();
  }

  getBaseUrl(server = 1) { // 1 as default
    if (this.currentServerEnv === 'stage') {
      if (server === 2) {
        return AppConsts.stageBaseUrl2
      }
      return AppConsts.stageBaseUrl
    } else if (this.currentServerEnv === 'dev') {
      if (server === 2) {
        return AppConsts.devBaseUrl2
      }
      return AppConsts.devBaseUrl
    } else if (this.currentServerEnv === 'qa') {
      if (server === 2) {
        return AppConsts.qaBaseUrl2
      }
      return AppConsts.qaBaseUrl
    } else if (this.currentServerEnv === 'prod') {
      if (server === 2) {
        return AppConsts.prodBaseUrl2
      }
      return AppConsts.prodBaseUrl
    }
  }
}
