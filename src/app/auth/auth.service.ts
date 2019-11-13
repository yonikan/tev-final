import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
import { ServerEnvService } from '../core/services/server-env.service';
import { AuthorizationService } from '../core/services/authorization.service';
import { TeamPickerService } from '../core/services/team-picker.service';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token = null;
  private tokenTimer: any;

  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private userLoginData;
  private userLoginDataListener = new BehaviorSubject<any>({});
  currentPlatform = 'desktop';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService,
    public teamPickerService: TeamPickerService,
    private serverEnvService: ServerEnvService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserLoginData() {
    return this.userLoginData;
  }

  getUserLoginDataListener() {
    return this.userLoginDataListener.asObservable();
  }

  login(email: string, password: string) {
    this.http
      .get<any>('assets/mocks/login-mock.json')
      .subscribe(userLoginDataResponse => {
          if (userLoginDataResponse.token) {
            this.userLoginData = userLoginDataResponse;
            this.userLoginDataListener.next(userLoginDataResponse);
            this.authorizationService.allowedFeatures = userLoginDataResponse.features;

            if (this.localStorageService.getOnLocalStorage('selected_team')) {
              this.teamPickerService.setCurrentTeam(this.localStorageService.getOnLocalStorage('selected_team'));
            } else {
              this.teamPickerService.setCurrentTeam(this.teamPickerService.getCurrentTeam());
            }

            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.router.navigate(['/team-overview']);
          }
        },
        error => {
          console.log('error: ', error);
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      );

    // const authData: AuthData = { username, password };
    // const SERVER_ENV = this.serverEnvService.getBaseUrl();
    // const BACKEND_URL = `${SERVER_ENV}v1/account/login`;
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
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['login']);
  }

  // private setAuthTimer(duration: number) {
  //   this.tokenTimer = setTimeout(() => {
  //     this.logout();
  //   }, duration * 1000);
  // }
}

export interface AuthData {
  email: string;
  password: string;
}