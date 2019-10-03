import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeatureToggleService } from '../services/feature-toggle.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesGuard implements CanActivate, CanLoad {

  constructor(private featureToggleService: FeatureToggleService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const isFeature1Enabled = this.featureToggleService.isFeatureEnabled('feature1');
    return isFeature1Enabled;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    const isFeature1Enabled = this.featureToggleService.isFeatureEnabled('feature1');
    return isFeature1Enabled;
  }
}
