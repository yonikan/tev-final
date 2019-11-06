import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    LoaderSpinnerComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ContentLoaderModule,
    TranslateModule
  ],
  entryComponents: [ModalComponent],
  exports: [
    MaterialModule,
    ContentLoaderModule,
    TranslateModule,
    PageHeaderComponent,
    LoaderSpinnerComponent,
    ModalComponent
  ]
})
export class SharedModule { }
