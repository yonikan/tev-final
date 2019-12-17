import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RepeatPasswordValidator } from './repeatPassword.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @Output() loginModeEmitter = new EventEmitter<string>();
  @Input() userToken: string; 

  isLoading = false;
  private authStatusSub: Subscription;
  resetPasswordFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]]
    }, {
      validator: RepeatPasswordValidator.validate.bind(this)
    });
    this.resetPasswordFormGroup = this.formBuilder.group({
      passwordFormGroup: this.passwordFormGroup
    });
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(
        (authStatus: any) => {
          this.isLoading = false;
        }
      );
  }

  onResetPassword() {
    if (!this.passwordFormGroup.valid) {
      return;
    }
    // this.isLoading = true;
    // this.authService.resetPassword(this.passwordFormGroup.value.password, this.passwordFormGroup.value.repeatPassword);
    this.authService.setPassword(this.passwordFormGroup.value.password, this.passwordFormGroup.value.repeatPassword);
  }
  
  
  onSetPassword(userToken) {
    if (!this.passwordFormGroup.valid) {
      return;
    }
    // this.isLoading = true;
    // this.authService.resetPassword(this.passwordFormGroup.value.password, this.passwordFormGroup.value.repeatPassword);
    this.authService.setPassword(userToken, this.passwordFormGroup.value.password);
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
