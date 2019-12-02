import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // console.log('error: ', error.error.errorMessage);
          let modalTitle;
          let modalMessage;

          if(error.status === 500) {
            modalTitle = 'Error 500';
          } else if (error.status === 401) {
            modalTitle = 'Error 401';
          } else if (error.status === 403) {
            modalTitle = 'Error 403';
          } else if (error.status === 404) {
            modalTitle = 'Error 404';
          } else if (error.status === 412) {
            modalTitle = 'Error 412';
          } else {
            modalTitle = 'General Error';
          }

          if(error.error.errorMessage) {
            modalMessage = error.error.errorMessage;
          } else {
            modalMessage = 'An unknown error occurred!';
          }
          
          this.dialog.open(ErrorModalComponent, {
            width: '500px',
            height: '200px',
            data: { 
              title: modalTitle,
              message: modalMessage
            }
          });
          return throwError(error);
        })
      );
  }
}
