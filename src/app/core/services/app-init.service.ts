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
    // let features = {
    //   featureLoadRisk: true,
    //   featurePlayers: true
    // };
    // this.authorizationService.features = features as any;
    return this.httpClient
      .get('assets/features-configuration/config-features.json')
      .pipe(
        tap(features => { 
          this.authorizationService.features = features as any 
        })
      )
      .toPromise();
  }
}

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (appLoadService: AppInitService) => {
  return () => appLoadService.initFeatureToggling();
};