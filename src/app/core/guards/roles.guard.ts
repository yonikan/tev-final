import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current user role.
    const userRole = 'admin'; // Temp hard-coded!

    return userRole === 'admin' ? true : false;
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current user role.
    const userRole = 'admin'; // Temp hard-coded!

    return userRole === 'admin' ? true : false;  }
}
