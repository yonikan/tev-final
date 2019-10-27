import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class FeaturesGuard implements CanActivate, CanLoad {

  constructor(private authorizationService: AuthorizationService) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    // const isfeatureGuardPlayersEnabled = this.authorizationService.isFeatureEnabled('featureGuardPlayers');
    // console.log('isfeatureGuardPlayersEnabled: ', isfeatureGuardPlayersEnabled);
    // return isfeatureGuardPlayersEnabled;
    return true;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // const isfeatureGuardPlayersEnabled = this.authorizationService.isFeatureEnabled('featureGuardPlayers');
    // console.log('isfeatureGuardPlayersEnabled: ', isfeatureGuardPlayersEnabled);
    // return isfeatureGuardPlayersEnabled;
    return true;
  }
}
