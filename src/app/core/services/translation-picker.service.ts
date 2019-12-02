import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationPickerService {
  private currentTranslation = 'en';
  private currentTranslationUpdated = new BehaviorSubject<string>('en');
  
  constructor(private translateService: TranslateService, private localStorageService: LocalStorageService) { }

  getCurrentTranslation(): string {
    return this.currentTranslation;
  }

  setCurrentTranslation(language: string) {
    this.translateService.use(language);
    this.currentTranslation = language;
    this.currentTranslationUpdated.next(language);
    this.localStorageService.storeOnLocalStorage('selected_language', language);
  }

  setDefaultLang(language: string) { // for app init
    this.translateService.setDefaultLang(language);
    this.currentTranslation = language;
    this.currentTranslationUpdated.next(language);
    this.localStorageService.storeOnLocalStorage('selected_language', language);
  }
}
