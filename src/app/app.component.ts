import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from './auth/auth.service';
import { TranslationPickerService } from './core/services/translation-picker.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { ServerEnvService } from './core/services/server-env.service';
import { AuthorizationService } from './core/services/authorization.service';
import { ThemePickerService } from './core/theme-picker/theme-picker.service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

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
    public authorizationService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private translationPickerService: TranslationPickerService,
    private themePickerService: ThemePickerService,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private serverEnvService: ServerEnvService) {
  }

  ngOnInit() {
    // if (!environment.production) {
    //   this.authService.setIsAuth(true);
    //   this.router.navigate(['/team-overview']);
    // };

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
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
