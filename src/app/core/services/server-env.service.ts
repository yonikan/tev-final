import { Injectable } from '@angular/core';
import { AppConsts } from '../../../app/app.consts';

@Injectable({
  providedIn: 'root'
})
export class ServerEnvService {
  private currentServerEnv = 'dev'; // Hard-coded for now
  
  constructor() { }

  getCurrentServerEnv() {
    return this.currentServerEnv;
  }

  getBaseUrl(server = 1) { // 1 as default
    if (this.currentServerEnv === 'dev') {
      if (server === 2) {
        return AppConsts.devBaseUrl2
      }
      return AppConsts.devBaseUrl
    } else if (this.currentServerEnv === 'stage') {
      if (server === 2) {
        return AppConsts.stageBaseUrl2
      }
      return AppConsts.stageBaseUrl
    } else if (this.currentServerEnv === 'prod') {
      if (server === 2) {
        return AppConsts.prodBaseUrl2
      }
      return AppConsts.prodBaseUrl
    }
  }
}
