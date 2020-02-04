import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[restrictionContainer]'
})
export class RestrictionContainerDirective {

  @Input() showError;
  @Input() errorMassage;

  child;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


  ngOnInit() {
    this.child = document.createElement('div');
    this.child.innerHTML = `<div class="restriction-container" id="error">
    <div class="errorMassage">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" style="margin-right: 5px;S">
        <path fill="#C07E7E" fill-rule="evenodd" d="M15 13H2c-1.326 0-1.121-.899-.776-1.558L7.17 1.33c.43-.595 2.3-.577 2.642 0l5.946 10.112c.381.604.586 1.558-.758 1.558zM9 2H8L2 12c1.001.015 13 0 13 0L9 2zm0 3.802v2.364c0 1.079-1 1.079-1 0V5.802c0-1.098 1-1.098 1 0zM9 11H8v-1h1v1z"/>
      </svg>

      ${this.errorMassage}
    </div>
  </div>`
  }

  ngOnChanges(change) {
    if (change.showError && this.showError) {
      this.showError ? this.addError() : this.removeError();
    }
  }

  addError() {
    // this.renderer.appendChild(this.elementRef.nativeElement, this.child);
  }

  removeError() {
    this.renderer.removeChild(this.elementRef.nativeElement, this.child)
    // this.renderer.removeChild(this.elementRef.nativeElement, '#error');
  }
}

//  <h3 restrictionContainer [showError]="true" errorMassage="errorrrr">match overview</h3>
