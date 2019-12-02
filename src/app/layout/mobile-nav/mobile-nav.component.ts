import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
