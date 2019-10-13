import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesGuard implements CanActivate, CanLoad {

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const isfeatureGuardPlayersEnabled = this.authorizationService.isFeatureEnabled('featureGuardPlayers');
    return isfeatureGuardPlayersEnabled;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    const isfeatureGuardPlayersEnabled = this.authorizationService.isFeatureEnabled('featureGuardPlayers');
    return isfeatureGuardPlayersEnabled;
  }
}
