import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public storeOnLocalStorage(key: string, value: string): void {
    const storageKey = key;
    let currentToken = this.storage.get(storageKey) || '';
    currentToken = value;
    this.storage.set(storageKey, currentToken);
  }

  public getOnLocalStorage(key: string): any {
    return this.storage.get(key) || '';
  }
}
