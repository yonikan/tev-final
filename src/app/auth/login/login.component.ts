import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../../core/animations/fade-in-up.animation';
import { fadeInRightAnimation } from '../../core/animations/fade-in-right.animation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class LoginComponent implements OnInit {
  loginMode = 'user-login';
  languages: any[] = [
    {value: 'en', viewValue: 'English - Eng'},
    {value: 'es', viewValue: 'Spanish - Esp'}
  ];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {

  }

  onLoginModeEmitter (loginModeString) {
    // console.log('loginModeString: ', loginModeString);
    this.loginMode = loginModeString;
  }

  useLanguage(language: string) {
      this.translateService.use(language);
  }
}
