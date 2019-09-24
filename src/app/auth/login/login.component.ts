import { Component, OnInit } from '@angular/core'
import { fadeInUpAnimation } from '../../core/animations/fade-in-up.animation'
import { fadeInRightAnimation } from '../../core/animations/fade-in-right.animation'
import { TranslationPickerService } from '../../core/services/translation-picker.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation],
})
export class LoginComponent implements OnInit {
  loginMode = 'user-login'
  languages: any[] = [
    { value: 'en', viewValue: 'English - Eng' },
    { value: 'es', viewValue: 'Spanish - Esp' },
    { value: 'ch', viewValue: 'Chinese - 中文' }
  ]
  currentTranslation = 'en';

  constructor(private translationPickerService: TranslationPickerService) {}

  ngOnInit() {
    this.currentTranslation = this.translationPickerService.getCurrentTranslation();
  }

  useLanguage(language: string) {
    this.translationPickerService.setCurrentTranslation(language)
  }

  onLoginModeEmitter(loginModeString) {
    this.loginMode = loginModeString
  }
}
