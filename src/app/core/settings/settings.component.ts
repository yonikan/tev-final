import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationPickerService } from '../services/translation-picker.service';
import { ThemePickerService } from '../theme-picker/theme-picker.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentTranslation = 'en';
  private currentTranslationSub: Subscription;

  currentTheme = 'light';
  private currentThemeSub: Subscription;
  
  languages: any[] = [
    {value: 'en', viewValue: 'English - Eng'},
    {value: 'es', viewValue: 'Spanish - Esp'},
    {value: 'ch', viewValue: 'Chinese - 中文'}
  ];

  themes: any[] = [
    {value: 'light', viewValue: 'Light'},
    {value: 'dark', viewValue: 'Dark'}
  ];

  constructor(private translationPickerService: TranslationPickerService, private themePickerService: ThemePickerService) { }

  ngOnInit() {
    this.currentTranslationSub = this.translationPickerService
      .getCurrentTranslationUpdateListener()
      .subscribe(currentTrans => {
        this.currentTranslation = currentTrans;
      });
  }
  useLanguage(language: string) {
    this.translationPickerService.setCurrentTranslation(language)
  }

  useTheme(theme: string) {
    this.themePickerService.setDefaultTheme(theme);
  }

  ngOnDestroy() {
    this.currentTranslationSub.unsubscribe();
  }
}
