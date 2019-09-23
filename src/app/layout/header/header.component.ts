import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

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
  isUserMenuOpen = false;
  userImgUrl = '';
  userFirstName = '';
  userLastName = '';

  teams: any[] = [
    {value: 'hull-u18', viewValue: '2019/20: Hull City U18'},
    {value: 'hull-u14', viewValue: '2019/20: Hull City U14'},
    {value: 'hull-o18', viewValue: '2019/20: Hull City O18'}
  ];

  languages: any[] = [
    {value: 'en', viewValue: 'English - Eng'},
    {value: 'es', viewValue: 'Spanish - Esp'}
  ];
  // languages: any[] = [
  //   {value: 'en', viewValue: this.translateService.instant('layout.header.english') },
  //   {value: 'es', viewValue: this.translateService.instant('layout.header.spanish')   }
  // ];
  // languages = [];
  
  constructor(
    public authService: AuthService, 
    private translateService: TranslateService,
    private localStorageService: LocalStorageService)
  {}

  ngOnInit() {
    // this.setLanguagesDropdown();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });

    const appStore = this.localStorageService.getOnLocalStorage('login_data');
    this.userImgUrl = appStore.image_url;
    this.userFirstName = appStore.first_name ;
    this.userLastName = appStore.last_name ;
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

  useLanguage(language: string) {
    this.translateService.use(language);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
