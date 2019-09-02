import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}

  public storeOnLocalStorage(value: string): void {

  }
}
