import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formation-selection',
  templateUrl: './formation-selection.component.html',
  styleUrls: ['./formation-selection.component.scss']
})
export class FormationSelectionComponent implements OnInit {
  @Input() tabs;
  @Input() tactics;
  @Input() definedSubs;

  @Output() onSelectTactic = new EventEmitter();
  @Output() onSelectDefinedSub = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  selectTactic({value}) {
    this.onSelectTactic.emit(value);
  }

  selectSub({value}) {
    this.onSelectDefinedSub.emit(value);
  }

}
