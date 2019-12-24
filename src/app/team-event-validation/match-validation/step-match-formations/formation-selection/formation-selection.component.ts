import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';

@Component({
  selector: 'app-formation-selection',
  templateUrl: './formation-selection.component.html',
  styleUrls: ['./formation-selection.component.scss']
})
export class FormationSelectionComponent implements OnInit, OnChanges {
  @Input() tabs;
  @Input() tactics;
  @Input() definedSubs;

  @Output() onSelectTactic = new EventEmitter();
  @Output() onSelectDefinedSub = new EventEmitter();

  selectedTactic = null;

  constructor() {

  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.tactics && this.tactics.length) {
      this.selectedTactic = this.tactics[0];
      this.selectTactic({value: this.selectedTactic});
    }
  }

  selectTactic({value}) {
    this.onSelectTactic.emit(value);
  }

  selectSub({value}) {
    this.onSelectDefinedSub.emit(value);
  }

}
