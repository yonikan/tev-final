import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { LocalStorageServiceService } from 'src/app/shared/local-storage-service.service';
const BACKEND_URL = 'https://football-dev.playermaker.co.uk/api/v1/account/login';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageServiceService
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
        }
      },
      error => {
        console.log('error: ', error);
        this.isAuthenticated = false;
      }
    );
  }

  logout() {}
}
