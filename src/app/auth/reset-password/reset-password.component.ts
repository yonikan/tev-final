import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Output() loginModeEmitter = new EventEmitter<string>();
  isLoading = false;
  private authStatusSub: Subscription;
  resetPassworForm: FormGroup;
  password = null;
  reEnterPassword = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // console.log('authStatus: ', authStatus);
        this.isLoading = false;
      }
    );

    this.resetPassworForm = new FormGroup({
      passwordText: new FormControl(this.password, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]   
      }),
      reEnterPasswordText: new FormControl(this.reEnterPassword, Validators.required)
    });
  }

  onResetPassword() {
    if (!this.resetPassworForm.valid) {
      return;
    }
    this.isLoading = true;
    // this.authService.reset() // NEEDS TO ADD THE RELEVANT METHOD!
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
