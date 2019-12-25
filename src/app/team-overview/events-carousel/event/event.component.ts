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
  @Output() convertSessionEmitter = new EventEmitter<string>();
  @Output() deleteSessionEmitter = new EventEmitter<string>();
  isValidated = false;
  isLoading = false;

  constructor() { }

  ngOnInit() {
    // console.log(this.eventData);
  }

  confirmSession(eventId) {
    this.onRefresh();
    this.confirmSessionEmitter.emit(eventId);
  }

  convertSession(eventId) {
    this.convertSessionEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }

  onRefresh() {
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 2000);
  }
}
