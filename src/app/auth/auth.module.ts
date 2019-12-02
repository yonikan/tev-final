import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routes';
import { AuthComponent } from './auth/auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { EmailSentComponent } from './email-sent/email-sent.component';

@NgModule({
  declarations: [
    AuthComponent,
    UserLoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    EmailSentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ShowHidePasswordModule
  ],
  exports: [
    AuthComponent,
    UserLoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    EmailSentComponent
  ]
})
export class AuthModule {}
