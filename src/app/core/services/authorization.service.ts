import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public features: FeatureTypes; // set these allowed features from the init config json
  // public teamAllowedFeatures;
  // public roleAllowedFeatures;

  constructor(private httpClient: HttpClient) {}

  public isFeatureEnabled(featureName: string): boolean {
    const isFeaturedAllowed = this.features[featureName];
    return isFeaturedAllowed;
  }

  public teamAuthorization(team: string) {
    console.log('Auth team: ', team);
    // const teamFeatureExists = this.teamAllowedFeatures.find(teamFeature => teamFeature === featureName); 
    // const isFeaturedAllowedForTeam = teamFeatureExists === featureName ? true : false;

    // this.httpClient
    //   .get('assets/features-configuration/config-teams-auth.json')
    //     .pipe(
    //       tap(teamsAllowedFeatures => {
    //         console.log('teamsAllowedFeatures: ', teamsAllowedFeatures);
    //       })
    //     );
  }

  public roleAuthorization(userRole: string) {
    console.log('Auth userRole: ', userRole);
    // const roleFeatureExists = this.roleAllowedFeatures.find(roleFeature => roleFeature === featureName); 
    // const isFeaturedAllowedForRole = roleFeatureExists === featureName ? true : false;

    // this.httpClient
    //   .get('assets/features-configuration/config-roles-auth.json')
    //     .pipe(
    //       tap(roleAllowedFeatures => {
    //         console.log('roleAllowedFeatures: ', roleAllowedFeatures);
    //       })
    //     );
  }
}

export interface FeatureTypes {
  feature: boolean
}