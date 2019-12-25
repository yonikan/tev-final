import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AuthorizationService } from './authorization.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamPickerService {
  private isLoading = false;
  private isLoadingListener = new BehaviorSubject<boolean>(false);

  constructor(
    public authService: AuthService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  getIsLoadingListener(): Observable<boolean> {
    return this.isLoadingListener.asObservable();
  }

  setCurrentTeam(selectedTeam: any) {
    console.log('selectedTeam: ', selectedTeam);
    this.isLoadingListener.next(true);

    setTimeout(() => { 
      this.isLoadingListener.next(false);
      this.router.navigate(['team-overview']);
     }, 2000);

    // this.authService.fetchUserLoginData('', '')
    //   .subscribe((userLoginData: any) => {
    //     this.authorizationService.allowedFeatures = userLoginData.features;
    //     this.router.navigate(['team-overview']);
    //   });
  }
}
