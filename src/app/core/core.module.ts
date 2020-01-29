import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VersionUpdateInterceptor } from './interceptors/version-update.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FadeInRightStaggerElementDirective } from './animations/fade-in-right.animation';
import { FadeInUpStaggerElementDirective } from './animations/fade-in-up.animation';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { MenuComponent } from './components/menu/menu.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ValidatedEventsToastComponent } from './components/validated-events-toast/validated-events-toast.component';
import { StaticDataService } from './services/static-data.service';

@NgModule({
  declarations: [
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective,
    ThemePickerComponent,
    MenuComponent,
    ErrorModalComponent,
    ValidatedEventsToastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    ErrorModalComponent,
    ValidatedEventsToastComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: VersionUpdateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	StaticDataService
  ],
  exports: [
    FadeInRightStaggerElementDirective,
    FadeInUpStaggerElementDirective,
    ThemePickerComponent,
    MenuComponent,
    ErrorModalComponent,
    ValidatedEventsToastComponent
  ]
})
export class CoreModule { }
