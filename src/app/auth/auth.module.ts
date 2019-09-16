import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routes';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [LoginComponent, UserLoginComponent, ResetPasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, UserLoginComponent, ResetPasswordComponent, ForgotPasswordComponent]
})
export class AuthModule {}
