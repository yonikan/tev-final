import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-warmup-modal',
  templateUrl: './warmup-modal.component.html',
  styleUrls: ['./warmup-modal.component.scss']
})
export class WarmupModalComponent implements OnInit {

  @Input() phase;
  @Input() selectedLineup = {};
  @Output() updateField = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changePhaseName(value) {
    this.updateField.emit({ value, filedPathToUpdate: ['phaseName'] });
  }
}
