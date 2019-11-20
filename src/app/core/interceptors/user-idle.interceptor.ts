import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Injectable()
export class UserIdleInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
         tap(() => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              const modalTitle = 'session idle';
              const modalMessage = 'user is logged out because of session idle';
              this.dialog.open(ModalComponent, {
                width: '500px',
                height: '200px',
                data: { 
                  title: modalTitle,
                  message: modalMessage
                }
              });
              this.authService.logout();
            }
         })
      );
  }
}