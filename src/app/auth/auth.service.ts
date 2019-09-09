import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { LocalStorageServiceService } from 'src/app/shared/local-storage-service.service';
import { UIService } from 'src/app/shared/ui.service';
const BACKEND_URL = 'https://football-dev.playermaker.co.uk/api/v1/account/login';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token = null;
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageServiceService,
    private uiService: UIService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {}

  login(username: string, password: string) {
    this.setServerToAccess(username);
    const authData: AuthData = { username, password };
    this.http.post<any>(BACKEND_URL, authData).subscribe(
      response => {
        const token = response.token;
        this.token = token;
        if (token) {
          console.log('success!!!');
          this.localStorageService.storeOnLocalStorage(token);
          this.isAuthenticated = true;
          this.router.navigate(['/teams']);
          this.uiService.showSnackbar('User is logged in!', null, 2000);
          // return true; // for the login page indication if succeeded.
        }
      },
      error => {
        console.log('error: ', error);
        this.isAuthenticated = false;
        // return false;
      }
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.router.navigate(['login']);
    this.uiService.showSnackbar('You have just logged out!', null, 2000);
  }

  setServerToAccess(username) {
    if (username.startsWith('$$')) { // Stage
      console.log('STAGE');
      if (window.location.hostname.includes('cn')) {

      } else {

      }
      username = username.substr(2)         
    } else if (username.startsWith('@@')) { // DEV
      console.log('DEV');
      if (window.location.hostname.includes('cn')) {

      } else {

      }
      username = username.substr(2)
    } else { // PROD
      console.log('PROD');
      if (window.location.hostname.includes('cn')) {

      } else {

      }
    }
  }
}
