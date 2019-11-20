import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private localStorageService: LocalStorageService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const authToken = this.authService.getToken();
    const authToken: string = this.localStorageService.getOnCookie('token');
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
