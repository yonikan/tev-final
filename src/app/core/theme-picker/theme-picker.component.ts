import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePickerService } from 'src/app/core/services/theme-picker.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  form: FormGroup;
  navColor = null;
  navBackground = null;
  cardColor = null;
  cardBackground = null;
  buttonColor = null;
  buttonBackground = null;
  footerColor = null;
  footerBackground = null;

  constructor(private themePickerService: ThemePickerService) { }

  ngOnInit() {
    this.form = new FormGroup({
      navColor: new FormControl(this.navColor, {}),
      navBackground: new FormControl(this.navBackground, {}),
      cardColor: new FormControl(this.cardColor, {}),
      cardBackground: new FormControl(this.cardBackground, {}),
      buttonColor: new FormControl(this.buttonColor, {}),
      buttonBackground: new FormControl(this.buttonBackground, {}),
      footerColor: new FormControl(this.footerColor, {}),
      footerBackground: new FormControl(this.footerBackground, {})
    });
  }

  onSubmitTheme() {
    if (!this.form.valid) {
      return;
    }
    this.themePickerService.globalOverride(this.form.value);
  }

  globalOverride(stylesheet) {
    this.themePickerService.globalOverride(stylesheet);
  }
}
