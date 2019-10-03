import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemePickerService {
  private themeWrapper = document.querySelector('body');
  private isDarkMode = false;
  private isDarkModeUpdated = new Subject<boolean>();

  lightThemeData = {
    navColor: '#fff',
    navBackground: '#444',
    cardColor: '#fff',
    cardBackground: '#353435 !important',
    buttonColor: '#9575cd',
    buttonBackground: '#4ccead',
    footerColor: null,
    footerBackground: null
  };

  darkThemeData = {
    navColor: '#000',
    navBackground: '#yellow',
    cardColor: '#fff',
    cardBackground: '#353435 !important',
    buttonColor: '#9575cd',
    buttonBackground: '#4ccead',
    footerColor: null,
    footerBackground: null
  };

  constructor(private localStorageService: LocalStorageService) { }

  getIsDarkModeUpdateListener() {
    return this.isDarkModeUpdated.asObservable();
  }

  getIsDarkMode() {
    return this.isDarkMode;
  }

  setIsDarkMode(currentMode) {
    const themeData = {
      navColor: '#fff',
      navBackground: '#444',
      cardColor: '#fff',
      cardBackground: '#353435 !important',
      buttonColor: '#9575cd',
      buttonBackground: '#4ccead',
      footerColor: null,
      footerBackground: null
    };
    this.isDarkMode = currentMode;
    this.globalOverride(themeData);
    this.localStorageService.storeOnLocalStorage('selected_theme', currentMode);
  }

  setDefaultTheme(theme) { // for app init
    let themeData;
    if (theme === 'light') {
      themeData = {
        pageBackground: '#303030;',

        headerColor: '#fff',
        headerBackground: '#212121',

        navColor: '#000',
        navBackground: '#fff',

        cardColor: '#fff',
        cardBackground: '#353435 !important',

        buttonColor: '#9575cd',
        buttonBackground: '#4ccead',

        footerColor: null,
        footerBackground: null
      };
    } else if (theme === 'dark') {
      themeData = {
        pageBackground: '#303030;',

        headerColor: '#fff',
        headerBackground: '#212121',

        navColor: '#fff',
        navBackground: '#212121',

        cardColor: '#fff',
        cardBackground: '#424242 !important',

        buttonColor: '#9575cd',
        buttonBackground: '#4ccead',

        footerColor: null,
        footerBackground: null
      };
    }
    this.globalOverride(themeData);
    this.localStorageService.storeOnLocalStorage('selected_theme', theme);
  }

  globalOverride(stylesheet) {
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
    if (stylesheet.footerAlignment) {
      this.themeWrapper.style.setProperty('--footerAlignment', stylesheet.footerAlignment);
    }
    // Button Styles
    if (stylesheet.buttonColor) {
      this.themeWrapper.style.setProperty('--buttonColor', stylesheet.buttonColor);
    }
    if (stylesheet.buttonBackground) {
      this.themeWrapper.style.setProperty('--buttonBackground', stylesheet.buttonBackground);
    }
  }}
