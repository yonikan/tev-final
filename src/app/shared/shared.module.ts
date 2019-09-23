import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ContentLoaderModule
  ],
  exports: [MaterialModule, ContentLoaderModule]
})
export class SharedModule { }
