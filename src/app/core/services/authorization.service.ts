import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public preLoginAllowedFeatures: FeatureTypes;
  public preLoginPlatformAllowedFeatures: FeatureTypes;
  public allowedFeatures: FeatureTypes;
  public currentPlatform = 'desktop';

  constructor(private httpClient: HttpClient) {}

  public isFeatureEnabled(featureName: string, featuresType?: string): boolean {
    let isFeaturedAllowed;
    if (featuresType === 'preLogin') {
      isFeaturedAllowed = this.preLoginAllowedFeatures[featureName] && this.preLoginPlatformAllowedFeatures[featureName];
    } else {
      isFeaturedAllowed = this.allowedFeatures[featureName];
    }
    return isFeaturedAllowed;
  }

  public initFeatureToggling() {
    return this.httpClient
      .get('./assets/features-configuration/config-features.json')
      .pipe(
        tap(features => { 
          this.preLoginAllowedFeatures = features as any 
        })
      )
      .toPromise();
  }

  public initPlatformFeatureToggling() {
    return this.httpClient
      .get('./assets/features-configuration/config-platform-features.json')
      .pipe(
        tap((features: any) => { 
          const platform = document.documentElement.clientWidth;
          console.log('currentPlatformTest: ', platform);
          this.currentPlatform = platform > 768 ? 'desktop' : 'mobile';
          if (this.currentPlatform === 'desktop') {
            this.preLoginPlatformAllowedFeatures = features.desktop as any 
          } else if (this.currentPlatform === 'mobile') {
            this.preLoginPlatformAllowedFeatures = features.mobile as any 
          }
          console.log(this.preLoginPlatformAllowedFeatures);
        })
      )
      .toPromise();
  }
};

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (authorizationService: AuthorizationService) => {
  return () => authorizationService.initFeatureToggling();
};
export const initPlatformFeatureToggling = (authorizationService: AuthorizationService) => {
  return () => authorizationService.initPlatformFeatureToggling();
};
export interface FeatureTypes {
  feature: boolean
};