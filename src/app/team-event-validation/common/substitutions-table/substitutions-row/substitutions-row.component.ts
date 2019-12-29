import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'substitutions-row',
  templateUrl: './substitutions-row.component.html',
  styleUrls: ['./substitutions-row.component.scss']
})
export class SubstitutionsRowComponent implements OnInit {

  @Input() substitution;
  @Input() rowConfig;
  @Input() rowStyle;
  @Input() rowMode = 'GENERAL';

  @Output() removeRow = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() editRow = new EventEmitter();

  substitutionDraft;

  Object = Object;

  constructor() {
  }

  ngOnInit() {
    this.substitutionDraft = {...this.substitution}
  }

  addRowEmit() {
    if (this.validateRow()) {
      this.addRow.emit(this.substitution);
      this.changeRowMode('GENERAL');
      console.log('addRowEmit');
    }
  }

  removeRowEmit() {
    this.removeRow.emit(this.substitution);
    console.log('removeRowEmit');
  }

  editRowEmit() {
    if (this.validateRow()) {
      this.editRow.emit(this.substitution);
      this.changeRowMode('GENERAL');
      console.log('editRowEmit: ');
    }
  }

  changeRowMode (newMode) {
    this.rowMode = newMode;
    console.log('changeRowMode: ',this.rowMode);
  }

  populateCell(value, cell) {
    this.substitution[cell] = value;
  }

  validateRow() {
    const keysToDisclude = ['id', 'type'];

    for (let key in this.substitution) {
      if (!this.substitution[key]&&!keysToDisclude.includes(key)) { return false };
    }
    return true;
  }

}
