import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerEnvService } from '../services/server-env.service';
import { Observable } from 'rxjs';

@Injectable()
class ApiInterceptor implements HttpInterceptor {
	constructor(private serverEnvService: ServerEnvService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// only for APIs
		if (req.url.includes('api') && !req.url.includes('login')) {
			return next.handle(req.clone({ url: `${this.serverEnvService.getBaseUrl()}/${req.url}`}));
		}
		return next.handle(req);
    }
}

export default ApiInterceptor;
