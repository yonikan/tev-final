import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root' 
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {}

  login(username: string, password: string) {}

  logout() {}
}
