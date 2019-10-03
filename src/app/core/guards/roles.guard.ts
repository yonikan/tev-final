import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate, CanLoad {

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current user role.
    const isUserRole = this.authorizationService.isRoleEnabled();
    return isUserRole ? true : false;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current user role.
    const isUserRole = this.authorizationService.isRoleEnabled();
    return isUserRole ? true : false;
  }
}
