import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class CustomIconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}
  init() {
    this.matIconRegistry.addSvgIcon(
      'es',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/flags/flag-es.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'us',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/svg/flags/flag-us.svg')
    );
  }
}
