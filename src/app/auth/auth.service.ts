import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
const BACKEND_URL = 'https://football-dev.playermaker.co.uk/api/v1/account/login';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token = null;
  private appStore = {};
  private tokenTimer: any;
  private isAuthenticated = true;
  private authStatusListener = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
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
          this.router.navigate(['/team-overview']);
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
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  setServerToAccess(username) {
    console.log('username: ', username);
    if (username.startsWith('$$')) { // Stage
      if (window.location.hostname.includes('cn')) {
        console.log('ch_stage');
      } else {
        console.log('stage');
      }
      username = username.substr(2);
    } else if (username.startsWith('@@')) { // DEV
      if (window.location.hostname.includes('cn')) {
        console.log('ch_dev');
      } else {
        console.log('dev');
      }
      username = username.substr(2);
    } else { // PROD
      if (window.location.hostname.includes('cn')) {
        console.log('ch_prod');
      } else {
        console.log('prod');
      }
    }
  }
}
