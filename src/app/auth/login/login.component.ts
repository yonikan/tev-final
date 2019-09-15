import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  form: FormGroup;
  formForgotPassword: FormGroup;
  username = null;
  password = null;
  isForgotPasswordOn = false;

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
        validators: [Validators.required, Validators.minLength(3)]
      })
    });

    this.formForgotPassword = new FormGroup({
      passwordText: new FormControl(this.password, {
        validators: [Validators.required, Validators.minLength(3)]
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

  onForgotPassword() {

  }

  toggleForgotPassword() {
    this.isForgotPasswordOn = !this.isForgotPasswordOn;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
