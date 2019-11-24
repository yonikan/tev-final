import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TeamPickerService } from '../../../app/core/services/team-picker.service';
import { AppConsts } from '../../app.consts';
import { UserLogin } from '../../../app/auth/user-login.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isUserMenuOpen = false;
  isAuthenticated = false;
  private authStatusSub: Subscription;
  currentTranslation = 'en';
  private currentTranslationSub: Subscription;
  userLoginData: UserLogin;
  private userLoginDataSub: Subscription;
  userImgUrl: string;
  userFirstName: string;
  userLastName: string;
  dashboardVersion: string;
  currentTeam = 'hull-o18';
  // teams;
  teams: any[] = [
    {
      value: 'hull-u18',
      viewValue: '2019/20: Hull City U18',
      img: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1566916634.png'
    },
    {
      value: 'hull-u14',
      viewValue: '2019/20: Hull City U14',
      img: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1566916634.png'
    },
    {
      value: 'hull-o18',
      viewValue: '2019/20: Hull City O18',
      img: 'https://s3.eu-west-2.amazonaws.com/playermaker-user-images/public/1566916634.png'
    }
  ];

  constructor(public authService: AuthService, public teamPickerService: TeamPickerService){}

  ngOnInit() {
    this.userLoginDataSub = this.authService
      .getUserLoginDataListener()
      .subscribe((userLoginData: UserLogin) => {
        this.userImgUrl = userLoginData.image_url;
        this.userFirstName = userLoginData.first_name;
        this.userLastName = userLoginData.last_name;
        this.dashboardVersion = AppConsts.version;
        // this.teams = userLoginData.teams;
        // this.teamPickerService.teams = userLoginData.teams;
        // this.teamPickerService.setCurrentTeam(userLoginData.teams[0]);
      });

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuthenticated = authStatus;
      });

    this.currentTeam = this.teamPickerService.getCurrentTeam();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onSelectedTeam(team) {
    this.currentTeam = team;
    this.teamPickerService.setCurrentTeam(team);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.currentTranslationSub.unsubscribe();
    this.userLoginDataSub.unsubscribe();
  }
}
