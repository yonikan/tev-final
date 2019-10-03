import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  @Output() loginModeEmitter = new EventEmitter<string>();
  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;
  username = null;
  password = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // console.log('authStatus: ', authStatus);
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      usernameText: new FormControl(this.username, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      passwordText: new FormControl(this.password, {
        validators: [
          Validators.required,
          // Validators.minLength(8),
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]
      })
    });
  }

  onLogin() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.form.value.usernameText, this.form.value.passwordText);
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
