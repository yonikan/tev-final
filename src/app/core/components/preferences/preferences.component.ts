import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { AppConsts } from '../../../app.consts';
import { TranslationPickerService } from '../../services/translation-picker.service';
import { ThemePickerService } from '../../theme-picker/theme-picker.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  pageName = 'Preferences';
  dashboardVersion = AppConsts.version;
  currentTranslation = 'en';
  languages: any[] = [
    { value: 'en', viewValue: 'English - Eng', img: './assets/svg/flag-us.svg' },
    { value: 'es', viewValue: 'Spanish - Esp', img: './assets/svg/flag-es.svg' },
    { value: 'ch', viewValue: 'Chinese - 中文', img: './assets/svg/flag-china.svg' }
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

  themeChange($event: MatRadioChange) {
    if ($event.value.value === 'light') {
      this.themePickerService.setDefaultTheme('light');
    } else if ($event.value.value === 'dark') {
      this.themePickerService.setDefaultTheme('dark');
    }
  }
}
