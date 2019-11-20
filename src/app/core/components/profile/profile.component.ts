import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { UserLogin } from '../../../auth/user-login.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  pageName = 'Profile';
  private userLoginDataSub: Subscription;
  userImgUrl: string;
  userFirstName: string;
  userLastName: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.userLoginDataSub = this.authService
      .getUserLoginDataListener()
      .subscribe((userLoginData: UserLogin) => {
        this.userImgUrl = userLoginData.image_url;
        this.userFirstName = userLoginData.first_name;
        this.userLastName = userLoginData.last_name;
      });
  }

  ngOnDestroy() {
    this.userLoginDataSub.unsubscribe();
  }
}
