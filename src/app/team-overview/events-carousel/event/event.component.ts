import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() eventIndex: number;
  @Input() eventData: any;
  @Output() confirmSessionEmitter = new EventEmitter<any>();
  @Output() convertSessionEmitter = new EventEmitter<string>();
  @Output() deleteSessionEmitter = new EventEmitter<string>();
  isValidated = false;

  constructor() { }

  ngOnInit() {

  }

  confirmSession() {
    const event = {
      teamEventId: this.eventData.id,
      teamEventType: this.eventData.type
    };
    this.confirmSessionEmitter.emit(event);
  }

  convertSession(eventId) {
    this.convertSessionEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }
}
