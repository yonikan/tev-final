import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private httpClient: HttpClient, private authorizationService: AuthorizationService) {}

  public initFeatureToggling() {
    return this.httpClient
      // .get('http://playermaker-dash-ng-dev.s3.amazonaws.com/assets/configs/config-features.json')
      .get('assets/configs/config-features.json')
      .pipe(
        // tap(features => (this.authorizationService.features = features as any))
        tap(features => { 
          // console.log('features: ', features);
          this.authorizationService.features = features as any 
        })
      )
      .toPromise();
  }

  public initTeamsAuth() {
    return this.httpClient
      // .get('http://playermaker-dash-ng-dev.s3.amazonaws.com/assets/configs/config-teams-auth.json')
      .get('assets/configs/config-teams-auth.json')
      .pipe(
        tap(teamsAllowedFeatures => {
          const currentTeam = 'maccabi-tel-aviv'; // hard-coded for now
          const test1 = teamsAllowedFeatures[currentTeam];
          // console.log('test1: ', test1);
          this.authorizationService.teamAllowedFeatures = test1 as any;
        })
      )
      .toPromise();
  }

  public initRolesAuth() {
    return this.httpClient
      // .get('http://playermaker-dash-ng-dev.s3.amazonaws.com/assets/configs/config-roles-auth.json')
      .get('assets/configs/config-roles-auth.json')
      .pipe(
        tap(roleAllowedFeatures => { 
          const currentUserRole = 'admin'; // hard-coded for now
          const test2 = roleAllowedFeatures[currentUserRole];
          // console.log('test2: ', test2);
          this.authorizationService.roleAllowedFeatures = test2 as any;
        })
      )
      .toPromise();
  }
}

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (appLoadService: AppInitService) => {
  return () => appLoadService.initFeatureToggling();
  };

export const initTeamsAuth = (appLoadService: AppInitService) => {
  return () => appLoadService.initTeamsAuth();
};

export const initRolesAuth = (appLoadService: AppInitService) => {
  return () => appLoadService.initRolesAuth();
};