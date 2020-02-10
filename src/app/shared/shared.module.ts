import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { PmDropdownComponent } from './pm-dropdown/pm-dropdown.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { PmContentDropdownComponent } from './pm-content-dropdown/pm-content-dropdown';
import { RestrictionContainerDirective } from './directives/restriction-container.directive';

@NgModule({
  declarations: [
    PageHeaderComponent,
    LoaderSpinnerComponent,
    PmDropdownComponent,
    TimePickerComponent,
    ProfileImageComponent,
    PmContentDropdownComponent,
    RestrictionContainerDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ContentLoaderModule,
	  TranslateModule
  ],
  exports: [
    MaterialModule,
    ContentLoaderModule,
    TranslateModule,
    PageHeaderComponent,
    LoaderSpinnerComponent,
    PmDropdownComponent,
    TimePickerComponent,
    ProfileImageComponent,
    PmContentDropdownComponent,
    RestrictionContainerDirective
  ]
})
export class SharedModule { }
