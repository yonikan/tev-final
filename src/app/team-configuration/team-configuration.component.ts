import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemePickerService } from '../core/theme-picker/theme-picker.service';

@Component({
  selector: 'app-team-configuration',
  templateUrl: './team-configuration.component.html',
  styleUrls: ['./team-configuration.component.scss']
})
export class TeamConfigurationComponent implements OnInit {
  themeData;
  isDarkMode = false;
  private isDarkModeSub: Subscription;

  constructor(private themePickerService: ThemePickerService) { }

  ngOnInit() {
    this.darkModeToggle(true);
  }
  
  darkModeToggle(eventBoolean) {
    // console.log('eventBoolean: ', eventBoolean);
    // console.log('eventBoolean: ', eventBoolean);
    // this.themeData = eventBoolean;
    if (eventBoolean) {
      this.isDarkMode = true;
      this.themePickerService.setIsDarkMode(this.isDarkMode);
      this.themeData = {
        navColor: null,
        navBackground: null,

        cardColor: '#4ccead',
        cardBackground: '#353435 !important',

        buttonColor: '#9575cd',
        buttonBackground: '#4ccead',

        footerColor: null,
        footerBackground: null
      };
    } else {
      this.isDarkMode = false;
      this.themePickerService.setIsDarkMode(this.isDarkMode);
      this.themeData = {
        navColor: null,
        navBackground: null,

        cardColor: '#9575cd',
        cardBackground: '#f44336 !important',

        buttonColor: '#4ccead',
        buttonBackground: '#9575cd',

        footerColor: null,
        footerBackground: null
      };
    }
  }
}
