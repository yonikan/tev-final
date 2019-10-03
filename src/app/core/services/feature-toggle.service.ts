import { Injectable } from '@angular/core';

export type featureTypes = {
  'feature': boolean;
};

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  public features: featureTypes;

  constructor() {}

  public isFeatureEnabled(feautureName: any): boolean {
    return this.features[feautureName];
  }
}
