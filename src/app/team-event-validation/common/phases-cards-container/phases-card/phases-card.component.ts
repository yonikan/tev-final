import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-phases-card',
  templateUrl: './phases-card.component.html',
  styleUrls: ['./phases-card.component.scss']
})
export class PhasesCardComponent implements OnInit {

  @Input() phase;
  @Output() deleteCard = new EventEmitter();

  mode = 'MATCH';

  elapsisOptions = [
    // { name: 'Duplicate', icon: 'account_circle' },
    { name: 'Delete', icon: 'account_circle', action: 'onDeleteCard' }
  ];


  constructor() { }

  ngOnInit() {
  }

  getTimeByFormat(startTime, endTime) {
    // const diff = startTime.diff(endTime, 'minutes');
    return `${startTime} - ${endTime} (${'20 min'}) - phase ${'1'}/${'3'}`
  }

  hundleElapsisAction(elapsisOption) {
    this[elapsisOption.action]();
  }

  onDeleteCard() {
    this.deleteCard.emit();
  }

}
