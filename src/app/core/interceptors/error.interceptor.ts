import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from 'src/app/shared/modal/modal.component';


@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const modalTitle = 'Error!!!';
          let modalMessage = 'An unknown error occurred!';
          if (error.error.message) {
            modalMessage = error.error.message;
          }
          this.dialog.open(ModalComponent, {
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
