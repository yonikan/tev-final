import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() eventIndex: number;
  @Input() eventData: any;
  @Output() confirmSessionEmitter = new EventEmitter<string>();
  @Output() deleteSessionEmitter = new EventEmitter<string>();
  isConfirmed = false;

  constructor() { }

  ngOnInit() {

  }

  confirmSession(eventId) {
    // this.isConfirmed = true;
    this.confirmSessionEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }
}
