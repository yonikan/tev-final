import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current team.
    const team = 'maccabi'; // Temp hard-coded!

    return team === 'maccabi' ? true : false;  
  }

  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // http call to the backend and gets resp of the current team.
    const team = 'maccabi'; // Temp hard-coded!

    return team === 'maccabi' ? true : false;  
  }
}
