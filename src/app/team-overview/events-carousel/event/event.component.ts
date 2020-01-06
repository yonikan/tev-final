import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { enumToString } from 'src/app/core/helpers/helper-functions';
import { teamEvents } from 'src/app/core/enums/team-events.enum';
import * as moment from 'moment';
import { ValidatedEventsService } from '../../validated-events/validated-events.service';

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
  @Output() editSessionEmitter = new EventEmitter<any>();
  @Output() deleteSessionEmitter = new EventEmitter<string>();
  @Output() downloadPdfReportEmitter = new EventEmitter<any>();

  isValidated = false;
  teamEventTypeString;
  startTimeHoursFormatted;
  endTimeHoursFormatted;
  durationTimeAgo;
  duration;

  isPdfReportLoading = false;

  constructor(private validatedEventsService: ValidatedEventsService) { }

  ngOnInit() {
    // console.log(this.eventData);
    this.teamEventTypeString = enumToString(teamEvents, this.eventData.type);
    this.startTimeHoursFormatted = moment(this.eventData.startTime).format('hh:mm');
    this.endTimeHoursFormatted = moment(this.eventData.endTime).format('hh:mm');
    this.durationTimeAgo = moment(new Date()).from(moment(this.eventData.startTime));
    const start = moment(this.eventData.startTime);
    const end = moment(this.eventData.endTime);
    this.duration = Math.abs(start.diff(end, 'minutes'));
    // console.log('this.duration: ', this.duration);
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

  editSession() {
    const event = {
      teamEventId: this.eventData.id,
      teamEventType: this.eventData.type
    };
    this.editSessionEmitter.emit(event);
  }

  deleteSession(eventId) {
    this.deleteSessionEmitter.emit(eventId);
  }

  downloadPdfReport(reportType) {
    // this.isPdfReportLoading = true;
    // const report = {
    //   teamEventId: this.eventData.id,
    //   teamEventType: reportType
    // };
    // this.downloadPdfReportEmitter.emit(report);

    this.validatedEventsService.getTeamEventPdfReport(this.eventData.id, reportType);

  }
}
