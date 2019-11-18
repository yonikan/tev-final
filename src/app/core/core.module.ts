import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserIdleInterceptor } from './interceptors/user-idle.interceptor';
import { VersionUpdateInterceptor } from './interceptors/version-update.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FadeInRightStaggerElementDirective } from './animations/fade-in-right.animation';
import { FadeInUpStaggerElementDirective } from './animations/fade-in-up.animation';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { MenuComponent } from './components/menu/menu.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective,
    ThemePickerComponent,
    MenuComponent,
    PreferencesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule // for the [(ngModel)]=""
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserIdleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: VersionUpdateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective,
    ThemePickerComponent,
    MenuComponent,
    PreferencesComponent,
    ProfileComponent
  ]
})
export class CoreModule { }
