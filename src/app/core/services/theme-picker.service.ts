import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemePickerService {
  private themeWrapper = document.querySelector('body');
  currentTheme = 'light';

  constructor(private localStorageService: LocalStorageService) { }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setDefaultTheme(theme) { // for app init
    let themeData;
    if (theme === 'light') {
      themeData = {
        pageBackground: '#e1e1e1',
        headerColor: '#000',
        headerBackground: '#fff',
        navColor: '#000',
        navBackground: '#d4d4d4',
        cardColor: '#000',
        cardBackground: '#fff',
        footerColor: null,
        footerBackground: null
      };
    } else if (theme === 'dark') {
      themeData = {
        pageBackground: '#000',
        headerColor: '#fff',
        headerBackground: '#212121',
        navColor: '#fff',
        navBackground: '#000',
        cardColor: '#fff',
        cardBackground: '#000 !important',
        footerColor: null,
        footerBackground: null
      };
    }
    this.currentTheme = theme;
    this.globalOverride(themeData);
    this.localStorageService.storeOnLocalStorage('selected_theme', theme);
  }

  globalOverride(stylesheet) {
    // Page Background Styles
    if (stylesheet.pageBackground) {
      this.themeWrapper.style.setProperty('--pageBackground', stylesheet.pageBackground);
    }
    // Header Styles
    if (stylesheet.headerColor) {
      this.themeWrapper.style.setProperty('--headerColor', stylesheet.headerColor);
    }
    if (stylesheet.headerBackground) {
      this.themeWrapper.style.setProperty('--headerBackground', stylesheet.headerBackground);
    }
    // Navigation Styles
    if (stylesheet.navColor) {
      this.themeWrapper.style.setProperty('--navColor', stylesheet.navColor);
    }
    if (stylesheet.navBackground) {
      this.themeWrapper.style.setProperty('--navBackground', stylesheet.navBackground);
    }
    // Card Styles
    if (stylesheet.cardColor) {
      this.themeWrapper.style.setProperty('--cardColor', stylesheet.cardColor);
    }
    if (stylesheet.navBackground) {
      this.themeWrapper.style.setProperty('--cardBackground', stylesheet.cardBackground);
    }
    // Footer Styles
    if (stylesheet.footerColor) {
      this.themeWrapper.style.setProperty('--footerColor', stylesheet.footerColor);
    }
    if (stylesheet.footerBackground) {
      this.themeWrapper.style.setProperty('--footerBackground', stylesheet.footerBackground);
    }
  }
}
