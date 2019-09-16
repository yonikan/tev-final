import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
