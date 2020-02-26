import { Directive, ElementRef, HostListener } from '@angular/core';
import { TranslationPickerService } from 'src/app/core/services/translation-picker.service';

@Directive({
  selector: '[appRestrictLanguages]'
})
export class RestrictLanguagesDirective {
  private regex: RegExp;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  selectedLang: string;

  constructor(private translationPickerService: TranslationPickerService, private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
      this.selectedLang = this.translationPickerService.getCurrentTranslation();
      switch (this.selectedLang) {
        case 'en':
          this.regex = /^[A-Za-z0-9 _~!@#$%^*()+=,.?:|<>\s\-\s\\s\/]*$/;
          break;
        case 'es':
          this.regex = /^[ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜäëïöü¡¿çÇßØøÅåÆæÞþÐð""\w\d\s-'.,&amp;#@:?!()$\/]+$/;
          break;
        case 'ch':
          this.regex = /^[\u4e00-\u9effA-Za-z0-9 _~!@#$%^*()+=,.?:|<>\s\-\s\\s\/]{1,20}$/i;
          break;
        default:
          this.regex = /^[A-Za-z0-9 _~!@#$%^*()+=,.?:|<>\s\-\s\\s\/]*$/;
      }

      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
          return;
      }
  
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
          event.preventDefault();
      }
  }

  @HostListener('paste', ['$event'])
  blockPaste(e: KeyboardEvent) {
    console.log('e: ', e.target);
    // e.preventDefault();
  }
}
