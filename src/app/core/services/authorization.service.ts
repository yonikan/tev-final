import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public preLoginAllowedFeatures: FeatureTypes;
  // public preLoginPlatformAllowedFeatures: FeatureTypes;
  public allowedFeatures: FeatureTypes;

  constructor() {}

  public isFeatureEnabled(featureName: string, featuresType?: string): boolean {
    const isFeaturedAllowed = featuresType === 'preLogin' ? this.preLoginAllowedFeatures[featureName] : this.allowedFeatures[featureName];
    return isFeaturedAllowed;
  }
}

export interface FeatureTypes {
  feature: boolean
}