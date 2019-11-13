import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  public features: FeatureTypes;
  public allowedFeatures: FeatureTypes;

  constructor() {}

  public isFeatureEnabled(featureName: string): boolean {
    const isFeaturedAllowed = this.features[featureName];
    return isFeaturedAllowed;
  }
}

export interface FeatureTypes {
  feature: boolean
}