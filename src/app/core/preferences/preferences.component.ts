import { Component, OnInit } from '@angular/core';
import { TranslationPickerService } from '../services/translation-picker.service';
import { ThemePickerService } from '../services/theme-picker.service';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  pageName = 'Preferences';

  currentTranslation = 'en';
  languages: any[] = [
    { value: 'en', viewValue: 'English - Eng', flag: './assets/svg/flag-us.svg' },
    { value: 'es', viewValue: 'Spanish - Esp', flag: './assets/svg/flag-es.svg' },
    { value: 'ch', viewValue: 'Chinese - 中文', flag: './assets/svg/flag-china.svg' }
  ]

  currentTheme = 'light';
  themes: any[] = [
    {value: 'light', viewValue: 'Light'},
    {value: 'dark', viewValue: 'Dark'}
  ];

  constructor(private translationPickerService: TranslationPickerService, private themePickerService: ThemePickerService) { }

  ngOnInit() {
    this.currentTranslation = this.translationPickerService.getCurrentTranslation();
    this.currentTheme = this.themePickerService.getCurrentTheme();
  }

  useLanguage(language: string) {
    this.translationPickerService.setCurrentTranslation(language)
  }

  themeChange($event: MatRadioChange) {
    if ($event.value.value === 'light') {
      this.themePickerService.setDefaultTheme('light');
    } else if ($event.value.value === 'dark') {
      this.themePickerService.setDefaultTheme('dark');
    }
  }
}
