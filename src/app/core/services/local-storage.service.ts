import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorageService: StorageService, private cookieService: CookieService) {}

  public storeOnLocalStorage(key: string, value: string) {
    const storageKey: string = key;
    let currentToken = this.localStorageService.get(storageKey) || '';
    currentToken = value;
    this.localStorageService.set(storageKey, currentToken);
  }

  public getOnLocalStorage(key: string): any {
    return this.localStorageService.get(key) || '';
  }

  public storeOnCookie(key: string, value: string) {
    let isHttps = false;
    if (environment.production) {
      isHttps = true;
    }
    this.cookieService.set(key, value, 7, null, null, isHttps);
  }

  public getOnCookie(key: string): any {
    return this.cookieService.get(key);
  }
}
