import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { ErrorComponent } from './core/error/error.component';
import { ErrorInterceptor } from './core/error/error-interceptor';
import { AuthInterceptor } from './core/auth-interceptor';

import { AppComponent } from './app.component';
import { TeamOverviewComponent } from './team-overview/team-overview.component';
import { LoadRiskComponent } from './team-overview/load-risk/load-risk.component';
import { EventsComponent } from './team-overview/events/events.component';
import { PerformanceOvertimeComponent } from './team-overview/performance-overtime/performance-overtime.component';
import { LeaderBoardComponent } from './team-overview/leader-board/leader-board.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    TeamOverviewComponent,
    LoadRiskComponent,
    EventsComponent,
    PerformanceOvertimeComponent,
    LeaderBoardComponent
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
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [ErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
