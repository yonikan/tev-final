import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {}

  goToPage(pageUrl: string) {
    this.router.navigate([pageUrl]);
  }

  onLogout() {
    this.authService.logout();
  }
}
