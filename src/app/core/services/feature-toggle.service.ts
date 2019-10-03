import { Injectable } from '@angular/core';

export type featureTypes = {
  'feature': number | boolean;
};

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  public features: featureTypes;
  public envVars: featureTypes;

  constructor() {}

  public isFeatureEnabled(feautureName: any): boolean {
    console.log(this.features);
    console.log('this.features[feautureName]: ', this.features[feautureName]);
    return this.features[feautureName];
  }

  public getEnvVars(): any {
    return this.envVars;
  }
}
