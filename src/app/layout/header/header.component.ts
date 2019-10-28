import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TeamPickerService } from '../../core/services/team-picker.service';
import { AppConsts } from '../../app.consts';

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

  currentTeam = 'hull-o18';
  teams: any[] = [
    {value: 'hull-u18', viewValue: '2019/20: Hull City U18'},
    {value: 'hull-u14', viewValue: '2019/20: Hull City U14'},
    {value: 'hull-o18', viewValue: '2019/20: Hull City O18'}
  ];
  userImgUrl;
  userFirstName;
  userLastName;
  appVersion;
  apiVersion;

  constructor(
     public authService: AuthService,
     private localStorageService: LocalStorageService,
     public teamPickerService: TeamPickerService
  ){}

  ngOnInit() {
    this.userImgUrl = this.localStorageService.getOnLocalStorage('login_data').user_image_url;
    this.userFirstName = this.localStorageService.getOnLocalStorage('login_data').user_first_name;
    this.userLastName = this.localStorageService.getOnLocalStorage('login_data').user_last_name;
    this.appVersion = AppConsts.version;
    this.apiVersion = this.localStorageService.getOnLocalStorage('login_data').api_version;

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
    this.currentTeam = this.teamPickerService.getCurrentTeam();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onSelectedTeam(team) {
    this.currentTeam = team;
    this.teamPickerService.setCurrentTeam(team);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.currentTranslationSub.unsubscribe();
  }
}
