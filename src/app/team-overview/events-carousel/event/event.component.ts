import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UiComponentsService } from 'src/app/core/services/ui-components.service';

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
  // isLoading = false;
  // private isLoadingListener = new BehaviorSubject<boolean>(false);


  constructor(private uiComponentsService: UiComponentsService) { }

  ngOnInit() {
    // console.log(this.eventData);
  }

  confirmSession(eventId) {
    console.log('eventId: ', eventId);

    this.uiComponentsService.getIsLoadingListener().next(true);
    setTimeout(() => { 
      this.uiComponentsService.getIsLoadingListener().next(false);
     }, 2000);

    // this.isLoadingListener.next(true);
    // setTimeout(() => { 
    //   this.isLoadingListener.next(false);
    //  }, 2000);

    this.confirmSessionEmitter.emit(eventId);
  }

  convertSession(eventId) {
    this.convertSessionEmitter.emit(eventId);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }
}
