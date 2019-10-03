import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ContentLoaderModule
  ],
  exports: [
    MaterialModule,
    ContentLoaderModule,
    TranslateModule
  ]
})
export class SharedModule { }
