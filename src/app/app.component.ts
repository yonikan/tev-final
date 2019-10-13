import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
// import { TranslateService } from '@ngx-translate/core';
import { TranslationPickerService } from './core/services/translation-picker.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { AuthorizationService } from './core/services/authorization.service';
import { ThemePickerService } from './core/services/theme-picker.service';
import { TeamPickerService } from './core/services/team-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authStatusSub: Subscription;
  // public isFeature1Enabled = false;

  constructor( 
    public authService: AuthService, 
    private localStorageService: LocalStorageService,
    private translationPickerService: TranslationPickerService,
    private themePickerService: ThemePickerService,
    public teamPickerService: TeamPickerService,
    private authorizationService: AuthorizationService) {
      // this.isFeature1Enabled = authorizationService.isFeatureEnabled('feature1');
  }

  ngOnInit() {
    // this.themePickerService.setDefaultTheme();
    if (this.localStorageService.getOnLocalStorage('selected_theme')) {
      this.themePickerService.setDefaultTheme(this.localStorageService.getOnLocalStorage('selected_theme'));
    } else {
      this.themePickerService.setDefaultTheme('light');
    }

    if (this.localStorageService.getOnLocalStorage('selected_language')) {
      this.translationPickerService.setDefaultLang(this.localStorageService.getOnLocalStorage('selected_language'));
    } else {
      this.translationPickerService.setDefaultLang('en');
    }

    if (this.localStorageService.getOnLocalStorage('selected_team')) {
      this.teamPickerService.setCurrentTeam(this.localStorageService.getOnLocalStorage('selected_team'));
    } else {
      const currentTeam = this.teamPickerService.getCurrentTeam();
      this.teamPickerService.setCurrentTeam('hull-u14');
    }

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
