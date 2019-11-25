import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  forgotPasswordFormGroup: FormGroup;
  username = null;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(
        (authStatus: any) => {
          this.isLoading = false;
        }
      );

    this.forgotPasswordFormGroup = this.formBuilder.group({
      emailText: ['', 
      [
        Validators.required,
        Validators.email
      ]]
    });
  }

  onForgotPassword() {
    if (!this.forgotPasswordFormGroup.valid) {
      return;
    }
    // this.isLoading = true;
    this.authService.forgotPassword(this.forgotPasswordFormGroup.value.emailText);
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
