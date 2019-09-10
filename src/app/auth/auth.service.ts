import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage-service.service';

import { AuthData } from './auth-data.model';
import { UIService } from 'src/app/shared/ui.service';
import { BehaviorSubject } from 'rxjs';
const BACKEND_URL = 'https://football-dev.playermaker.co.uk/api/v1/account/login';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token = null;
  private appStore = {};
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private uiService: UIService
  ) {}

  getToken() {
    return this.token;
  }

  getAppStore() {
    return this.appStore;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(username: string, password: string) {
    this.setServerToAccess(username);
    const authData: AuthData = { username, password };
    this.http.post<any>(BACKEND_URL, authData).subscribe(
      response => {
        const loginData = response;
        if (response.token) {
          this.token = response.token;
          this.appStore = response;
          this.localStorageService.storeOnLocalStorage('login_data', loginData);
          const expiresInDuration = 60 * 60; // in seconds
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/teams']);
          this.uiService.showSnackbar('User is logged in!', null, 2000);
        }
      },
      error => {
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
      }
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['login']);
    this.uiService.showSnackbar('You have just logged out!', null, 2000);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  setServerToAccess(username) {
    if (username.startsWith('$$')) { // Stage
      console.log('STAGE');
      if (window.location.hostname.includes('cn')) {
        
      } else {

      }
      username = username.substr(2)         
      console.log('username: ', username);
    } else if (username.startsWith('@@')) { // DEV
      console.log('DEV');
      if (window.location.hostname.includes('cn')) {

      } else {

      }
      username = username.substr(2)
      console.log('username: ', username);
    } else { // PROD
      console.log('PROD');
      if (window.location.hostname.includes('cn')) {

      } else {

      }
    }
  }
}
