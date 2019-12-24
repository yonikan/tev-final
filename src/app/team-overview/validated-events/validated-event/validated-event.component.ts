import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-validated-event',
  templateUrl: './validated-event.component.html',
  styleUrls: ['./validated-event.component.scss']
})
export class ValidatedEventComponent implements OnInit {
  @Input() eventIndex: number;
  @Input() eventData: any;
  @Output() confirmSessionEmitter = new EventEmitter<string>();
  @Output() convertSessionEmitter = new EventEmitter<string>();
  @Output() deleteSessionEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    // console.log(this.eventData);
  }

  confirmSession(eventId) {
    this.confirmSessionEmitter.emit(eventId);
  }

  convertSession(eventId) {
    this.convertSessionEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }
}
