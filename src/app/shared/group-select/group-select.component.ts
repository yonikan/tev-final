import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss']
})
export class GroupSelectComponent implements OnInit {
  @Input() players;
  @Input() currentPlayer;
  @Output() onChangeSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange({value}) {
    this.onChangeSelection.emit(value);
  }

}
