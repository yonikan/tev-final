import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public features: FeatureTypes; // set these allowed features from the init config json
  public teamAllowedFeatures;
  public roleAllowedFeatures;

  constructor() {}

  public isFeatureEnabled(featureName: string): boolean {
    const isFeaturedAllowed = this.features[featureName];

    const teamFeatureExists = this.teamAllowedFeatures.find(teamFeature => teamFeature === featureName); 
    const isFeaturedAllowedForTeam = teamFeatureExists === featureName ? true : false;

    const roleFeatureExists = this.roleAllowedFeatures.find(roleFeature => roleFeature === featureName); 
    const isFeaturedAllowedForRole = roleFeatureExists === featureName ? true : false;

    return isFeaturedAllowed && isFeaturedAllowedForTeam && isFeaturedAllowedForRole;
  }
}

export interface FeatureTypes {
  feature: boolean
}