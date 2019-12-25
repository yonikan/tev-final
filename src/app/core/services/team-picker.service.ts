import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthorizationService } from './authorization.service';
import { UiComponentsService } from './ui-components.service';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from './server-env.service';

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
    this.uiComponentsService.getIsLoadingListener().next(true);

    // setTimeout(() => { 
    //   this.uiComponentsService.getIsLoadingListener().next(false);
    //   this.router.navigate(['team-overview']);
    //  }, 2000);

    const PATH = this.serverEnvService.getBaseUrl();
    this.http.get<any>(`${PATH}/staff/26235`)
      .subscribe((result: any) => {
        console.log('result: ', result);
        this.uiComponentsService.getIsLoadingListener().next(false);
        this.router.navigate(['team-overview']);
      }, err => {
        this.uiComponentsService.getIsLoadingListener().next(false);
      });
  }
}
