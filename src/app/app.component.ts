import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './auth/auth.service';
import { TranslationPickerService } from './core/services/translation-picker.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { ServerEnvService } from './core/services/server-env.service';
import { AuthorizationService } from './core/services/authorization.service';
import { ThemePickerService } from './core/theme-picker/theme-picker.service';
import { TeamPickerService } from './core/services/team-picker.service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { UiComponentsService } from './core/services/ui-components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authStatusSub: Subscription;
  isLoading = false;
  private isLoadingSub: Subscription;

  constructor(
    public authService: AuthService,
    public authorizationService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private translationPickerService: TranslationPickerService,
    private themePickerService: ThemePickerService,
    private uiComponentsService: UiComponentsService,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private serverEnvService: ServerEnvService) {
  }

  ngOnInit() {
    if (!environment.production) {
      this.authService.login('yoni.kangun@playermaker.com', 'aaaAAA111');
      // this.router.navigate(['/team-overview']);
    };

    this.serverEnvService.initServerEnv();
    this.authorizationService.currentPlatform = this.breakpointObserver.isMatched('(min-width: 769px)') ? 'desktop' : 'mobile';

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
      .subscribe((authStatus: boolean) => {
        this.isAuthenticated = authStatus;
      });

    this.isLoadingSub = this.uiComponentsService
      .getIsLoadingListener()
      .subscribe((isLoading: boolean) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }
}
