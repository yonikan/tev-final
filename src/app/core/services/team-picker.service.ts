import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthorizationService } from './authorization.service';
import { UiComponentsService } from './ui-components.service';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from './server-env.service';
import { UserLogin } from '../../auth/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {

  constructor(
    public authService: AuthService,
    private authorizationService: AuthorizationService,
    private uiComponentsService: UiComponentsService,
    private http: HttpClient,
    private serverEnvService: ServerEnvService,
    private router: Router
  ) { }

  setCurrentTeam(selectedTeam: any) {
    this.uiComponentsService.setIsLoading(true);

    const BASE_URL = this.serverEnvService.getBaseUrl();
    const API_VERSION = 'v2';
    this.http.get<any>(`${BASE_URL}/${API_VERSION}/user/26235/re-login`)
      .subscribe((updatedLoginDetails: UserLogin) => {
        this.authService.setUserLoginData(updatedLoginDetails);
        // this.authService.getUserLoginDataListener().next(updatedLoginDetails);
        this.uiComponentsService.setIsLoading(false);
        this.router.navigate(['team-overview']);
      }, err => {
        this.uiComponentsService.setIsLoading(false);
      });
  }
}
