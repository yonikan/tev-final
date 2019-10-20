import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private cookieService: CookieService
  ) {}

  public storeOnLocalStorage(key: string, value: string): void {
    const storageKey = key;
    let currentToken = this.storage.get(storageKey) || '';
    currentToken = value;
    this.storage.set(storageKey, currentToken);
  }

  public getOnLocalStorage(key: string): any {
    return this.storage.get(key) || '';
  }

  public storeOnCookie(key: string, value: string): void {
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
