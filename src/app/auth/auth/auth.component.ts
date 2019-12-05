import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TranslationPickerService } from '../../core/services/translation-picker.service';
import { AuthService } from '../auth.service';
import { fadeInRightAnimation } from '../../core/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../core/animations/fade-in-up.animation';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = 'user-login';
  currentTranslation = 'en';
  languages: any[] = [
    { value: 'en', viewValue: 'English', img: './assets/svg/flag-us.svg' },
    { value: 'es', viewValue: 'Espanol', img: './assets/svg/flag-es.svg' },
    { value: 'ch', viewValue: '中文', img: './assets/svg/flag-china.svg' }
  ];
  isAuthenticated = false;
  private authStatusSub: Subscription;
  isTranslationPickerFeatureEnabled = true;

  constructor(
    private translationPickerService: TranslationPickerService,
    public authService: AuthService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute) {
      this.isTranslationPickerFeatureEnabled = this.authorizationService.isFeatureEnabled('translationPicker');
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        filter(params => params.page)
      )
      .subscribe(params => {
        this.loginMode = params.page; // ?page=reset-password
      });

    this.currentTranslation = this.translationPickerService.getCurrentTranslation();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  onLoginModeEmitter(loginModeString) {
    this.loginMode = loginModeString;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
