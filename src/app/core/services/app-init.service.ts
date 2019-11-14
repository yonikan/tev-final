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
      .get('assets/features-configuration/config-features.json')
      .pipe(
        tap(features => { 
          this.authorizationService.preLoginAllowedFeatures = features as any 
        })
      )
      .toPromise();
  }

  //   public initTeamsAuth() {
  //   return this.httpClient
  //     .get('assets/features-configuration/config-platform-features.json')
  //     .pipe(
  //       tap(teamsAllowedFeatures => {
  //         const currentTeam = this.authService.currentPlatform; // hard-coded for now
  //         const currentTeamAllowedFeatures = teamsAllowedFeatures[currentTeam];
  //         this.authorizationService.teamAllowedFeatures = currentTeamAllowedFeatures as any;
  //       })
  //     )
  //     .toPromise();
  // }
}

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (appLoadService: AppInitService) => {
  return () => appLoadService.initFeatureToggling();
};