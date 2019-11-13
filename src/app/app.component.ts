import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './auth/auth.service';
import { TranslationPickerService } from './core/services/translation-picker.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { ThemePickerService } from './core/services/theme-picker.service';
import { TeamPickerService } from './core/services/team-picker.service';
import { ServerEnvService } from './core/services/server-env.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authStatusSub: Subscription;

  constructor( 
    public authService: AuthService, 
    private localStorageService: LocalStorageService,
    private translationPickerService: TranslationPickerService,
    private themePickerService: ThemePickerService,
    public teamPickerService: TeamPickerService,
    public breakpointObserver: BreakpointObserver,
    private serverEnvService: ServerEnvService) {
  }

  ngOnInit() {
    this.serverEnvService.initServerEnv();
    this.authService.currentPlatform = this.breakpointObserver.isMatched('(min-width: 769px)') ? 'desktop' : 'mobile';

    if (this.localStorageService.getOnLocalStorage('selected_theme')) {
      this.themePickerService.setDefaultTheme(this.localStorageService.getOnLocalStorage('selected_theme'));
    } else {
      this.themePickerService.setDefaultTheme(this.themePickerService.getCurrentTheme());
    }

    if (this.localStorageService.getOnLocalStorage('selected_language')) {
      this.translationPickerService.setDefaultLang(this.localStorageService.getOnLocalStorage('selected_language'));
    } else {
      this.translationPickerService.setDefaultLang(this.translationPickerService.getCurrentTranslation());
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
