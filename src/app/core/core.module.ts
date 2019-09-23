import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';

import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { ErrorComponent } from './error/error.component';
import { FadeInRightStaggerElementDirective } from './animations/fade-in-right.animation';
import { FadeInUpStaggerElementDirective } from './animations/fade-in-up.animation';

@NgModule({
  declarations: [
    ThemePickerComponent,
    ErrorComponent,
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [ErrorComponent],
  exports: [
    ThemePickerComponent,
    ErrorComponent,
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective
  ]
})
export class CoreModule { }
