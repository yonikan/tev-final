import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit {
  @Output() loginModeEmitter = new EventEmitter<string>();
  @Input() userEmailAddressInput: string; 

  constructor(public authService: AuthService) { }

  ngOnInit() {
    console.log('userEmailAddressInput: ', this.userEmailAddressInput);
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  sendAgain() {
    this.authService.forgotPassword(this.userEmailAddressInput);
  }
}
