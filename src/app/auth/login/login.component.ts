import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from '../../core/fade-in-up.animation';
import { fadeInRightAnimation } from '../../core/fade-in-right.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class LoginComponent implements OnInit {
  loginMode = 'user-login'
  
  constructor() {}

  ngOnInit() {

  }

  onLoginModeEmitter (loginModeString) {
    console.log('loginModeString: ', loginModeString);
    this.loginMode = loginModeString;
  }
}
