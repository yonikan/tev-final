import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {

  constructor(
    public authService: AuthService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  setCurrentTeam(selectedTeam: any) {
    console.log('selectedTeam: ', selectedTeam);
    // this.authService.fetchUserLoginData('', '')
    //   .subscribe((userLoginData: any) => {
    //     this.authorizationService.allowedFeatures = userLoginData.features;
    //     this.router.navigate(['team-overview']);
    //   });
  }
}
