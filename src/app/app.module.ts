import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app.routes';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TeamOverviewModule } from './team-overview/team-overview.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './core/error/error.component';

import { ErrorInterceptor } from './core/error/error-interceptor';
import { AuthInterceptor } from './core/auth-interceptor';
import { TeamConfigurationComponent } from './team-configuration/team-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    TeamConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ContentLoaderModule,
    CoreModule,
    LayoutModule,
    AuthModule,
    TeamOverviewModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
