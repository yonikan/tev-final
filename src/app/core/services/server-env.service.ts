import { Injectable } from '@angular/core';
import { AppConsts } from '../../../app/app.consts';

@Injectable({
  providedIn: 'root'
})
export class ServerEnvService {
  private currentServerEnv = 'dev'; // Hard-coded for now
  
  constructor() { }

  initServerEnv() {
    const URL_PATH = window.location.toString();
    const DEV_ENV_SUBSTRING = '-dev';
    const STAGE_ENV_SUBSTRING = '-stage';
    const CHINA_PROD_ENV_SUBSTRING = '.cn';

    if (URL_PATH.includes(DEV_ENV_SUBSTRING)) {
      this.setCurrentServerEnv('dev');
      // console.log('DEV!!!');
    // } else if (URL_PATH.includes(STAGE_ENV_SUBSTRING)) {
    //   this.setCurrentServerEnv('stage');
    //   console.log('STAGE!!!');
    // } else if (URL_PATH.includes(CHINA_PROD_ENV_SUBSTRING)) {
    //   this.setCurrentServerEnv('ch-prod');
    //   console.log('CHINA PROD!!!');
    } else {
      this.setCurrentServerEnv('dev');
      // console.log('DEV!!!');
      // this.setCurrentServerEnv('prod');
      // console.log('PROD!!!');
    }
  }

  getCurrentServerEnv() {
    return this.currentServerEnv;
  }

  setCurrentServerEnv(env: string) {
    this.currentServerEnv = env;
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
