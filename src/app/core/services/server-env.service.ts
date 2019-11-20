import { Injectable } from '@angular/core';
import { AppConsts } from '../../../app/app.consts';

@Injectable({
  providedIn: 'root'
})
export class ServerEnvService {
  private currentServerEnv = 'dev';
  
  constructor() { }

  initServerEnv() {
    const URL_HOSTNAME: string = window.location.hostname.toString();
    if (URL_HOSTNAME.includes('dev')) {
      this.currentServerEnv = 'dev';
      // console.log('DEV!!!');
    } else if (URL_HOSTNAME.includes('stage')) {
      this.currentServerEnv = 'stage';
      // console.log('STAGE!!!');
    } else if (URL_HOSTNAME.includes('prod')) {
      this.currentServerEnv = 'prod';
      // console.log('STAGE!!!');
    } else if (URL_HOSTNAME.includes('cn')) {
      this.currentServerEnv = 'ch';
      // console.log('CHINA PROD!!!');
    } else {
      this.currentServerEnv = 'dev';
      // console.log('DEV!!!');
    }
  }

  getBaseUrl(serverEnv = 1): string {
    if (this.currentServerEnv === 'dev') {
      if (serverEnv === 2) {
        return AppConsts.devBaseUrl2
      }
      return AppConsts.devBaseUrl
    } else if (this.currentServerEnv === 'stage') {
      if (serverEnv === 2) {
        return AppConsts.stageBaseUrl2
      }
      return AppConsts.stageBaseUrl
    } else if (this.currentServerEnv === 'prod') {
      if (serverEnv === 2) {
        return AppConsts.prodBaseUrl2
      }
      return AppConsts.prodBaseUrl
    }
  }
}
