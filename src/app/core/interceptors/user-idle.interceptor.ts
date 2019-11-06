import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class UserIdleInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
         tap(() => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {  // 401 error for user idle
              if (err.status !== 401) {
                return;
              }
              // this.authService.logout();
            }
         })
      );
    }
}