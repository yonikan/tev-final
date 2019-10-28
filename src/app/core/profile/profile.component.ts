import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pageName = 'Profile';

  userImgUrl;
  userFirstName;
  userLastName;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.userImgUrl = this.localStorageService.getOnLocalStorage('login_data').user_image_url;
    this.userFirstName = this.localStorageService.getOnLocalStorage('login_data').user_first_name;
    this.userLastName = this.localStorageService.getOnLocalStorage('login_data').user_last_name;
  }
}
