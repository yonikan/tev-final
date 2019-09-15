import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, ForgotPasswordComponent, UserLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, ResetPasswordComponent, ForgotPasswordComponent, UserLoginComponent]
})
export class AuthModule {}
