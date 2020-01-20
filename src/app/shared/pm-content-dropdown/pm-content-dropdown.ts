import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, HostListener, ViewChild, ElementRef, HostBinding, Host, Renderer2 } from '@angular/core';
// import { FasterSlideTop } from '../../../external-report/animations';

@Component({
  selector: 'pm-content-dropdown',
  templateUrl: './pm-content-dropdown.component.html',
  styleUrls: ['./pm-content-dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: FasterSlideTop
})
export class PmContentDropdownComponent {

  optionsOpen = false;

  @Input() optionsMode = 'GENERAL';
  @Input() dropdownStyle;
  @Input() pointy = true;
  @Input() showOptions = false; // for debugging
  @Output() optionClicked = new EventEmitter;

  constructor(private el: ElementRef, renderer: Renderer2) {
  }

  ngOnInit() {
  }

  @HostListener('focus') onFocus = () => {
      this.show();
  }

  @HostListener('blur', ['$event.relatedTarget']) onBlur = (targetElement) => {
    if (!this.el.nativeElement.contains(targetElement)) {
      // this.isFocused = false;
      this.hide();
    }
  }

  @HostListener('document:click', ['$event.target'])
  closeOnDocumentClick = (targetElement) => {
    if (this.optionsOpen) {
      const isInsideClick = this.el.nativeElement.contains(targetElement);
      if (!isInsideClick) {
        this.hide();
      }
    }
  }

  @HostListener('keydown.esc') onEscapePress = () => {
    this.hide();
  }

  @HostListener('keydown', ['$event']) onKeyPress = (event) => {
    if (!/[^a-zA-Z]/.test(event.key)) {
      let options = document.querySelectorAll('.option')
      options.forEach((option:any) => {
        if (option.innerText[0].toLowerCase() === event.key.toLowerCase()){
          option.scrollIntoView({block: "center", inline: "center"});
          return;
        }
      })
    }
  }

  toggle = () => {
    this.optionsOpen ? this.hide() : this.show();
  }

  show = () => {
    this.optionsOpen = true;
  }

  hide = () => {
    this.optionsOpen = false;
    // this.isFocused = false;
  }



  onOptionSelect = (option, index, event) => {
    if (option.isDisabled) { return };
    const value = option; //this.getTitleToShow(option)
    this.optionClicked.emit({ value, idx: index, event });
    this.hide();
  }

  // getTitleToShow(option) {
  //   let titleToShow = option;

  //   this.path.forEach(key => {
  //     titleToShow = titleToShow[key];
  //   });

  //   const textLength = this.textLength;
  //   if (textLength && (titleToShow.length > textLength)) {
  //     titleToShow = `${titleToShow.slice(0,textLength)}...`
  // }

  //   return titleToShow;
  // }

}
