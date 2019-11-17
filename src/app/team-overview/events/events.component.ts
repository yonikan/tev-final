import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UIService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @Input() eventIndex: number;
  @Input() eventData: any;
  @Output() teamEventEmitter = new EventEmitter<string>();
  isLoading = false;
  isConfirmed = false;

  constructor(private uiService: UIService) { }

  ngOnInit() {
    // console.log('this.eventIndex: ', this.eventIndex);
    // console.log('this.eventData: ', this.eventData);
  }

  confirmSession(eventId) {
    // this.isConfirmed = true;
    // this.teamEventEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    console.log('eventId: ', eventId);
    this.teamEventEmitter.emit(eventId);
  }
}
