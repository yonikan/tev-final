import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    LoaderSpinnerComponent
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
    LoaderSpinnerComponent
  ]
})
export class SharedModule { }
