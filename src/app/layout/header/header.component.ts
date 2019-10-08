import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { TeamPickerService } from '../../core/services/team-picker.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() quickpanel: MatSidenav; // for the sidebar omnipanel

  isAuthenticated = false;
  private authStatusSub: Subscription;

  currentTranslation = 'en';
  private currentTranslationSub: Subscription;

  currentTheme = 'light';

  currentTeam = 'hull-u14';
  teams: any[] = [
    {value: 'hull-u18', viewValue: '2019/20: Hull City U18'},
    {value: 'hull-u14', viewValue: '2019/20: Hull City U14'},
    {value: 'hull-o18', viewValue: '2019/20: Hull City O18'}
  ];

  isUserMenuOpen = false;
  userImgUrl = './assets/img/user_img_placeholder.png';
  userFirstName = 'yoni';
  userLastName = 'kangun';

  constructor(
     public authService: AuthService,
     private localStorageService: LocalStorageService,
     public teamPickerService: TeamPickerService){}

  ngOnInit() {
    // this.setLanguagesDropdown();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });

    const appStore = this.localStorageService.getOnLocalStorage('login_data');
    console.log('appStore: ', appStore);
    // this.userImgUrl = appStore.image_url;
    // this.userFirstName = appStore.first_name ;
    // this.userLastName = appStore.last_name ;
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onOpenQuickpanel() {
    this.quickpanel.open();
  }

  onLogout() {
    this.authService.logout();
  }

  // setLanguagesDropdown() {
  //   this.translateService.get('layout.header.english')
  //     .subscribe( (text: string) => {
  //       console.log('text: ', text);
  //       this.languages.push({value: 'en', viewValue: text });
  //     })

  //   this.translateService.get('layout.header.spanish')
  //     .subscribe( (text: string) => {
  //       console.log('text: ', text);
  //       this.languages.push({value: 'es', viewValue: text });
  //     })
  // }


  changeTeam(team: string) {
    this.teamPickerService.setCurrentTeam(team);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.currentTranslationSub.unsubscribe();
  }
}
