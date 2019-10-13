import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated = false;
  private authStatusSub: Subscription;

  public isFeaturePlayersEnabled = false;

  constructor(public authService: AuthService, private authorizationService: AuthorizationService) {
    this.isFeaturePlayersEnabled = authorizationService.isFeatureEnabled('featurePlayers');
  }

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }
}
