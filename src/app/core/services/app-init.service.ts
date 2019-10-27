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
      // .get('https://playermaker-public-dev.s3.amazonaws.com/resources/config-features.json')
      // .get('resources/features-configuration/config-features.json')
      .get('assets/features-configuration/config-features.json')
      .pipe(
        tap(features => { 
          this.authorizationService.features = features as any 
        })
      )
      .toPromise();
  }

  // public initTeamsAuth() {
  //   return this.httpClient
  //     // .get('https://playermaker-public-dev.s3.amazonaws.com/resources/config-teams-auth.json')
  //     // .get('resources/features-configuration/config-teams-auth.json')
  //     .get('assets/features-configuration/config-teams-auth.json')
  //     .pipe(
  //       tap(teamsAllowedFeatures => {
  //         const currentTeam = 'maccabi-tel-aviv'; // hard-coded for now
  //         const currentTeamAllowedFeatures = teamsAllowedFeatures[currentTeam];
  //         this.authorizationService.teamAllowedFeatures = currentTeamAllowedFeatures as any;
  //       })
  //     )
  //     .toPromise();
  // }

  // public initRolesAuth() {
  //   return this.httpClient
  //     // .get('https://playermaker-public-dev.s3.amazonaws.com/resources/config-roles-auth.json')
  //     // .get('resources/features-configuration/config-roles-auth.json')
  //     .get('assets/features-configuration/config-roles-auth.json')
  //     .pipe(
  //       tap(roleAllowedFeatures => { 
  //         const currentUserRole = 'admin'; // hard-coded for now
  //         const currentRoleAllowedFeatures = roleAllowedFeatures[currentUserRole];
  //         this.authorizationService.roleAllowedFeatures = currentRoleAllowedFeatures as any;
  //       })
  //     )
  //     .toPromise();
  // }
}

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (appLoadService: AppInitService) => {
  return () => appLoadService.initFeatureToggling();
  };

// export const initTeamsAuth = (appLoadService: AppInitService) => {
//   return () => appLoadService.initTeamsAuth();
// };

// export const initRolesAuth = (appLoadService: AppInitService) => {
//   return () => appLoadService.initRolesAuth();
// };