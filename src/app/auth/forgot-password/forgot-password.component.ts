import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );


    this.forgotPasswordFormGroup = this.formBuilder.group({
      usernameText: ['', 
      [
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]]
    });

    // this.forgotPasswordFormGroup = new FormGroup({
    //   usernameText: new FormControl(this.username, {
    //     validators: [Validators.required, Validators.minLength(3)]
    //   })
    // });
  }

  onForgotPassword() {
    if (!this.forgotPasswordFormGroup.valid) {
      return;
    }
    this.isLoading = true;
  }

  loginMode(loginModeState) {
    this.loginModeEmitter.emit(loginModeState);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
