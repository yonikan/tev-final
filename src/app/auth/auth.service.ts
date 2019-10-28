import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { AuthData } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
import { ServerEnvService } from '../core/services/server-env.service';
import { AuthorizationService } from '../core/services/authorization.service';

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
    private authorizationService: AuthorizationService,
    private serverEnvService: ServerEnvService
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
    const authData: AuthData = { username, password };
    const SERVER_ENV = this.serverEnvService.getBaseUrl();
    const BACKEND_URL = `${SERVER_ENV}v1/account/login`;
    // this.http
    //   .post<any>(BACKEND_URL, authData)
    //   .subscribe(
    //     response => {
    //       const loginData = response;
    //       if (response.token) {
    //         // this.token = response.token;
    //         // this.appStore = response;
    //         // this.localStorageService.storeOnLocalStorage('login_data', loginData);
    //         this.authorizationService.roleAuthoization('admin'); // hard-coded for now
    //         // const expiresInDuration = 60 * 60; // in seconds
    //         // this.setAuthTimer(expiresInDuration);
    //         this.isAuthenticated = true;
    //         this.authStatusListener.next(true);
    //         this.router.navigate(['/team-overview']);
    //       }
    //     },
    //     error => {
    //       this.isAuthenticated = false;
    //       this.authStatusListener.next(false);
    //     }
    //   );
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    this.router.navigate(['/team-overview']);
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
}

export interface AuthData {
  username: string;
  password: string;
}