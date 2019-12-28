import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserLogin } from '../../auth/user-login.model';
import { StaffRoles } from '../../core/enums/staff-roles.enum';
import { enumToString } from '../../core/helpers/helper-functions';

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.scss']
})
export class MobilenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated = false;
  private authStatusSub: Subscription;

  userLoginData: UserLogin;
  private userLoginDataSub: Subscription;
  userImgUrl: string;
  userFirstName: string;
  userLastName: string;
  userRole: any;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.userLoginDataSub = this.authService
    .getUserLoginDataListener()
    .subscribe((userLoginData: UserLogin) => {
      this.userImgUrl = userLoginData.imgUrl;
      this.userFirstName = userLoginData.firstName;
      this.userLastName = userLoginData.lastName;
      this.userRole = enumToString(StaffRoles, 1);
    });

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuthenticated = authStatus;
      });
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
  
  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy(){
    this.userLoginDataSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
