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
    console.log('selectedTeam: ', selectedTeam);
    this.uiComponentsService.setIsLoading(true);

    const PATH = this.serverEnvService.getBaseUrl();
    this.http.get<any>(`${PATH}/user/26235/re-login`)
      .subscribe((updatedLoginDetails: UserLogin) => {
        console.log('updated Login Details: ', updatedLoginDetails);
        this.authService.setUserLoginData(updatedLoginDetails);
        // this.authService.getUserLoginDataListener().next(updatedLoginDetails);
        this.uiComponentsService.setIsLoading(false);
        this.router.navigate(['team-overview']);
      }, err => {
        this.uiComponentsService.setIsLoading(false);
      });
  }
}
