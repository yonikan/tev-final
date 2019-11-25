import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { AppConsts } from '../../app.consts';

@Injectable()
export class VersionUpdateInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        // tap((event: HttpEvent<any>) => {
        //   if (event instanceof HttpResponse) {
        //     // const appVersionFromBackend = event.headers.get('dashboardVersion');
        //     const appVersionFromBackend = AppConsts.version; // temp hard-coded
        //     const appVersion = AppConsts.version;
        //     if (appVersion === appVersionFromBackend) {
        //       return;
        //     }
        //     const modalTitle = 'version update error';
        //     const modalMessage = 'user is logged out because a version has been updated.';
        //     this.dialog.open(ModalComponent, {
        //       width: '500px',
        //       height: '200px',
        //       data: { 
        //         title: modalTitle,
        //         message: modalMessage
        //       }
        //     });
        //     this.authService.logout();
        //   }
        // },
        // (err: any) => {
        //   console.log('err: ', err);
        // })
      );
  }
}
