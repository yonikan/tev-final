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
  private token: string = 'barb441led1b58e2T91e4T4735T84eaT741534ec0c9eoked1b58e2T91e4T4735T84eaT741534ec0c9e'; // temp
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
        }
      },
      error => {
        console.log('error: ', error);
        this.isAuthenticated = false;
      }
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.router.navigate(['login']);
    this.uiService.showSnackbar('You have just logged out!', null, 2000);
  }
}
