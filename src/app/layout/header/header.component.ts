import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserLogin } from '../../../app/auth/user-login.model';
import { TEAMS_DATA } from 'server/data/teams.data';
import { LOGIN_DATA } from 'server/data/login.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isUserMenuOpen = false;
  isAuthenticated = false;
  private authStatusSub: Subscription;
  currentTranslation = 'en';
  private currentTranslationSub: Subscription;

  userLoginData: UserLogin;
  private userLoginDataSub: Subscription;
  userImgUrl: string;
  userFirstName: string;
  userLastName: string;
  appVersion: string;
  // currentTeam;
  currentTeam = 'hull-o18';
  teams: any[];

  constructor(public authService: AuthService){}

  ngOnInit() {
    this.userLoginDataSub = this.authService
      .getUserLoginDataListener()
      .subscribe((userLoginData: UserLogin) => {
        this.userImgUrl = userLoginData.imgUrl;
        this.userFirstName = userLoginData.firstName;
        this.userLastName = userLoginData.lastName;
        // this.currentTeam = userLoginData.teams[0].value;
        // console.log('this.currentTeam: ', this.currentTeam);
        // console.log('userLoginData.teams: ', userLoginData.teams);
        // this.teams = LOGIN_DATA.teams;
        this.teams = userLoginData.teams;
      });

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuthenticated = authStatus;
      });
  }

  // onToggleSidenav() {
  //   this.sidenavToggle.emit();
  // }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.currentTranslationSub.unsubscribe();
    this.userLoginDataSub.unsubscribe();
  }
}
