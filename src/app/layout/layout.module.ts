import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app.routes';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TeamPickerDropdownComponent } from './header/team-picker-dropdown/team-picker-dropdown.component';
import { MobilenavComponent } from './mobilenav/mobilenav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    TeamPickerDropdownComponent,
    MobilenavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    MobilenavComponent
  ]
})
export class LayoutModule { }
