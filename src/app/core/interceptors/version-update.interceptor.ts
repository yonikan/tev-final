import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { AppConsts } from 'src/app/app.consts';
import { ModalComponent } from 'src/app/shared/modal/modal.component';


@Injectable()
export class VersionUpdateInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      // .pipe(
      //   tap((event: HttpEvent<any>) => {
      //     if (event instanceof HttpResponse) {
      //       const appVersionFromBackend = event.headers.get('appVersion');
      //       const appVersion = AppConsts.version;
      //       if (appVersion === appVersionFromBackend) {
      //         return;
      //       }
      //       const modalTitle = 'version update error';
      //       const modalMessage = 'user is logged out because a version has been updated.';
      //       this.dialog.open(ModalComponent, {
      //         width: '500px',
      //         height: '200px',
      //         data: { 
      //           title: modalTitle,
      //           message: modalMessage
      //         }
      //       });
      //       this.authService.logout();
      //     }
      //   },
      //   (err: any) => {
      //     console.log('err: ', err);
      //   })
      // );
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const appVersion = AppConsts.version;
  //   const authRequest = req.clone({
  //     headers: req.headers.set('AuthAppVersion', appVersion)
  //   });

  //   return next.handle(authRequest);
  // }
}
    
    // .tap((event: HttpEvent<any>) => {
    //     console.log(event);
    //     if (event instanceof HttpResponse) {
    //       // do stuff with response if you want
    //       console.log(event.headers);
    //       const jwt = event.headers.get('Autho');
    //       console.log(jwt);
    //     }
    //   }, (err: any) => {
    //     if (err instanceof HttpErrorResponse) {
    //       console.log(err);
    //       if (err.status === 400) {
    //         // redirect to the login route
    //         // or show a modal
    //         console.log('ERROR');
    //       }
    //     }
    //   }
      
      
    //   );
    // }