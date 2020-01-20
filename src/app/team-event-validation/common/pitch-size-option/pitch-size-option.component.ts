import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pitch-size-option',
  templateUrl: './pitch-size-option.component.html',
  styleUrls: ['./pitch-size-option.component.scss']
})
export class PitchSizeOptionComponent implements OnInit {

  @Input() option;
  @Input() mode = 'GENERAL';
  @Input() checked;
  @Output() optionClicked = new EventEmitter();

  customWidth;
  customLength;

  constructor() { }

  ngOnInit() {
    console.log(this.mode, this.option)
  }

  OnOptionClicked(value?, lengthOrWidth?) {
    // this.checked = !this.checked;
    if (this.mode === 'GENERAL') { this.optionClicked.emit(this.option); }
    if (this.mode === 'CUSTOM') {
      this[lengthOrWidth] = value;
      if (!this.customWidth || !this.customLength) { return }
      // tslint:disable-next-line: max-line-length
      this.optionClicked.emit({ name: 'custom', iconName: 'account_circle', type: 'CUSTOM', size: `${this.customWidth}/${this.customLength}` })
    };
  }
}
