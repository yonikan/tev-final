import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated = true;

  constructor() { }

  ngOnInit() {
    
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
