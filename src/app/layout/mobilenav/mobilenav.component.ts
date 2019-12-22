import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserLogin } from 'src/app/auth/user-login.model';
import { StaffRoles } from 'src/app/core/enums/staff-roles.enum';

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.scss']
})
export class MobilenavComponent implements OnInit {
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
      this.userRole = StaffRoles[userLoginData.role];
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
