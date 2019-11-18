import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { PmDropdownComponent } from './pm-dropdown/pm-dropdown.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    LoaderSpinnerComponent,
    ModalComponent,
    PmDropdownComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ContentLoaderModule,
    TranslateModule
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
    MaterialModule,
    ContentLoaderModule,
    TranslateModule,
    PageHeaderComponent,
    LoaderSpinnerComponent,
    ModalComponent,
    PmDropdownComponent
  ]
})
export class SharedModule { }
