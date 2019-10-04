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
      .get('assets/configs/features-config.json')
      .pipe(
        tap(features => (this.authorizationService.features = features as any))
      )
      .toPromise();
  }

  public initTeamsAuth() {
    return this.httpClient
      .get('assets/configs/teams-auth-config.json')
      .pipe(
        tap(isTeamShown => (this.authorizationService.isTeamShown = true)) // temp hard-coded
      )
      .toPromise();
  }

  public initRolesAuth() {
    return this.httpClient
      .get('assets/configs/roles-auth-config.json')
      .pipe(
        tap(isRoleShown => (this.authorizationService.isRoleShown = true)) // temp hard-coded
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