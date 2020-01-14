import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public preLoginAllowedFeatures: FeatureTypes;
  public preLoginPlatformAllowedFeatures: FeatureTypes;
  public allowedFeatures: FeatureTypes;
  public currentPlatform = 'desktop';

  constructor(private http: HttpClient) {}

  public isFeatureEnabled(featureName: string): boolean {
    // let isFeaturedAllowed: boolean;
    // if (featuresType === 'preLogin') {
    //   isFeaturedAllowed = this.preLoginAllowedFeatures[featureName] && this.preLoginPlatformAllowedFeatures[featureName];
    // } else {
    //   isFeaturedAllowed = this.allowedFeatures[featureName];
    // }
    // return isFeaturedAllowed;
    return this.allowedFeatures[featureName];
  }

  public initFeatureToggling() {
    return this.http
      // .get('https://playermaker-dashboard-ng.s3.amazonaws.com/assets/features-configuration/config-features.json')
      .get('./assets/features-configuration/config-features.json')
      .pipe(
        tap(features => { 
          this.preLoginAllowedFeatures = features as any;
        }),
        mergeMap(param => this.initPlatformFeatureToggling()),
        tap(results => {
          this.allowedFeatures = {...this.preLoginAllowedFeatures};
          this.allowedFeatures = {...this.preLoginPlatformAllowedFeatures};
        })
      )
      .toPromise();
  }

  public initPlatformFeatureToggling() {
    return this.http
      // .get('https://playermaker-dashboard-ng.s3.amazonaws.com/assets/features-configuration/config-platform-features.json')
      .get('./assets/features-configuration/config-platform-features.json')
      .pipe(
        tap((features: any) => { 
          const platform = document.documentElement.clientWidth;
          // console.log('currentPlatformTest: ', platform);
          this.currentPlatform = platform > 768 ? 'desktop' : 'mobile';
          if (this.currentPlatform === 'desktop') {
            this.preLoginPlatformAllowedFeatures = features.desktop as any;
          } else if (this.currentPlatform === 'mobile') {
            this.preLoginPlatformAllowedFeatures = features.mobile as any;
          }
          // console.log(this.preLoginPlatformAllowedFeatures);
        })
      )
      // .toPromise();
  }
};

// NEEDED FOR THE APP MODULE AS PROVIDERS
export const initFeatureToggling = (authorizationService: AuthorizationService) => {
  return () => authorizationService.initFeatureToggling();
};
// export const initPlatformFeatureToggling = (authorizationService: AuthorizationService) => {
//   return () => authorizationService.initPlatformFeatureToggling();
// };
export interface FeatureTypes {
  feature: boolean
};