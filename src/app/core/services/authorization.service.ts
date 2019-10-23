import { Injectable } from '@angular/core'

// export type featureTypes = {
//   'feature': boolean;
// };

export interface FeatureTypes {
  feature: boolean
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public features: FeatureTypes; // set these allowed features from the init config json
  public teamAllowedFeatures;
  public roleAllowedFeatures;

  constructor() {
    // console.log('features: ', this.features);
    // console.log('teamAllowedFeatures: ', this.teamAllowedFeatures);
    // console.log('roleAllowedFeatures: ', this.roleAllowedFeatures);
  }

  public isFeatureEnabled(featureName: string): boolean {
    const isFeaturedAllowed = this.features[featureName];
    console.log('isFeaturedAllowed: ', isFeaturedAllowed);

    const test = this.roleAllowedFeatures.find((roleFeature) => { 
      return roleFeature === featureName; 
    }); 
    const isFeaturedAllowedForRole = test === featureName ? true : false;
    console.log('isFeaturedAllowedForRole: ', isFeaturedAllowedForRole);

    return isFeaturedAllowed && isFeaturedAllowedForRole;


    // const isAllowed = this.features[featureName] && this.roleAllowedFeatures[featureName];
    // console.log('isAllowed: ', isAllowed);
    // return isAllowed;
  }

  public isFeatureEnabledOnTeam(featureName: string): boolean {
    // return this.teamAllowedFeatures
    return true;
  }

  public isFeatureEnabledOnRole(featureName: string): boolean {
    // return this.roleAllowedFeatures
    return true;
  }
}
