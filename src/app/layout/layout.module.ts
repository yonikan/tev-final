import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routes';
import { HeaderComponent } from './header/header.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TeamPickerDropdownComponent } from './header/team-picker-dropdown/team-picker-dropdown.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MobileNavComponent,
    SidenavComponent,
    TeamPickerDropdownComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    MobileNavComponent,
    SidenavComponent
  ]
})
export class LayoutModule { }
