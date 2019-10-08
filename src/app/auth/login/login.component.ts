import { Component, OnInit, OnDestroy } from '@angular/core'
import { fadeInUpAnimation } from '../../core/animations/fade-in-up.animation'
import { fadeInRightAnimation } from '../../core/animations/fade-in-right.animation'
import { TranslationPickerService } from '../../core/services/translation-picker.service'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginMode = 'user-login'
  currentTranslation = 'en';
  languages: any[] = [
    { value: 'en', viewValue: 'English - Eng', flag: './assets/svg/flag-us.svg' },
    { value: 'es', viewValue: 'Spanish - Esp', flag: './assets/svg/flag-es.svg' },
    { value: 'ch', viewValue: 'Chinese - 中文', flag: './assets/svg/flag-china.svg' }
  ]
  isAuthenticated = false;
  private authStatusSub: Subscription;
  
  constructor(private translationPickerService: TranslationPickerService, public authService: AuthService) {}

  ngOnInit() {
    this.currentTranslation = this.translationPickerService.getCurrentTranslation();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  useLanguage(language: string) {
    this.translationPickerService.setCurrentTranslation(language)
  }

  onLoginModeEmitter(loginModeString) {
    this.loginMode = loginModeString
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
