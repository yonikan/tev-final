import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() quickpanel: MatSidenav; // for the sidebar omnipanel
  isAuthenticated = true;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onOpenQuickpanel() {
    this.quickpanel.open();
  }

  onLogout() {
    this.authService.logout();
  }
}
