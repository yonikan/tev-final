import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent implements OnInit {
  @Output() loginModeEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }
}
