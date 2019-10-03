import { Injectable } from '@angular/core';
import { FeatureToggleService } from './feature-toggle.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor(private httpClient: HttpClient, private featureToggleService: FeatureToggleService) {}

  public init() {
    return this.httpClient
      .get('assets/configs/features-config.json')
      .pipe(tap(features => (this.featureToggleService.features = features as any)))
      .toPromise();
  }
}