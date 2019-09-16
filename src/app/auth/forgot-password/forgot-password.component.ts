import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @Output() loginModeEmitter = new EventEmitter<string>();
  isLoading = false;
  private authStatusSub: Subscription;
  forgotPasswordForm: FormGroup;
  username = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // console.log('authStatus: ', authStatus);
        this.isLoading = false;
      }
    );

    this.forgotPasswordForm = new FormGroup({
      usernameText: new FormControl(this.username, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }

  onForgotPassword() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }
    this.isLoading = true;
    // this.authService.forogot() // NEEDS TO ADD THE RELEVANT METHOD!
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
