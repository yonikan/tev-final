import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CustomIconsService } from 'src/app/core/services/custom-icons.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(
    public authService: AuthService,
    public customIconsService: CustomIconsService) {
    // this.customIconsService.init();
  }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuthenticated = authStatus;
      });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
