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
  @Output() convertSessionEmitter = new EventEmitter<any>();
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
  cardTitle: string;

  constructor(private validatedEventsService: ValidatedEventsService) { }

  ngOnInit() {
    // console.log(this.eventData);

    this.teamEventTypeString = enumToString(teamEvents, this.eventData.type);

    let start;
    let end;

    // formatted time
    if(this.eventData.type === 1) {
      if (this.eventData.phaseMinStartTime){
        start = moment(this.eventData.trimStartTime);
        end = moment(this.eventData.trimEndTime);
      } else {
        start = moment(this.eventData.startTime);
        end = moment(this.eventData.endTime);
      }
    } else if(this.eventData.type === 2) {
      if (this.eventData.phaseMinStartTime){
        start = moment(this.eventData.phaseMinStartTime);
        end = moment(this.eventData.phaseMaxEndTime);
      } else {
        start = moment(this.eventData.startTime);
        end = moment(this.eventData.endTime);
      }
    } else {
      start = moment(this.eventData.startTime);
      end = moment(this.eventData.endTime);
    }

    this.startTimeHoursFormatted = moment(start).format('HH:mm');
    this.endTimeHoursFormatted = moment(end).format('HH:mm');
    


    // duration
    let duration;
    const startForDuration = moment(this.eventData.startTime);
    const endForDuration = moment(this.eventData.endTime);
    if(this.eventData.type === 2) {
      if(this.eventData.duration){
        duration = Math.abs(this.eventData.duration);
      } else {
        duration = Math.abs(startForDuration.diff(endForDuration, 'minutes'));
      }
    } else {
      duration = Math.abs(startForDuration.diff(endForDuration, 'minutes'));
    }
    this.duration = Math.floor(duration);



    if(this.eventData.isValidated) {
      if(this.eventData.type === 1) {
        if(this.eventData.tags) {
          this.cardTitle = this.eventData.tags[0];
        } else {
          this.cardTitle = `Training Session`;
        }
      } else if(this.eventData.type === 2) {
        if(this.eventData.opponent) {
          this.cardTitle = `Vs. ${this.eventData.opponent}`;
        } else {
          this.cardTitle = `Match`;
        }
      }
    } else {
       // const teamEventEnumString = enumToString(teamEvents, this.eventData.type);
       this.cardTitle = `new ${this.teamEventTypeString}`;
    }


    const NOW = moment();
    // const TODAY = NOW.clone().startOf('day');
    // const YESTERDAY = NOW.clone().subtract(1, 'days').startOf('day');

    // if(NOW.isSame(TODAY, 'd')) {
    //   this.durationTimeAgo = 'Today';
    // } else if (NOW.isSame(YESTERDAY, 'd')) {
    //   this.durationTimeAgo = 'Yesterday';
    // } else {
    //   this.durationTimeAgo = NOW.format('dddd, MMMM Do YYYY');
    // }
    this.durationTimeAgo = NOW.format('dddd, MMMM Do YYYY');


    // ==============================
    // const now = moment();
    // const yesterday = moment().add(-1, 'day');

    // if(start.diff(now, 'days') === 0) {
    //   // console.log('today');
    //   this.durationTimeAgo = 'today';
    // } else if (start.diff(yesterday, 'days') === 1) {
    //   // console.log('yesterday');
    //   this.durationTimeAgo = 'yesterday';
    // } else {
    //   // console.log(now.format('dddd, MMMM Do YYYY'));
    //   this.durationTimeAgo = now.format('dddd, MMMM Do YYYY');
    // }


    // const startNew = start.endOf('day');
    // const nowNew = moment().endOf('day');
    // const yesterdayNew = moment().add(-1, 'day').endOf('day');

    // if(startNew.diff(nowNew, 'days') === 0) {
    //   // console.log('today');
    //   this.durationTimeAgo = 'today';
    // } else if (startNew.diff(yesterdayNew, 'days') === 1) {
    //   // console.log('yesterday');
    //   this.durationTimeAgo = 'yesterday';
    // } else {
    //   // console.log(now.format('dddd, MMMM Do YYYY'));
    //   this.durationTimeAgo = nowNew.format('dddd, MMMM Do YYYY');
    // }
  }

  confirmSession() {
    const event = {
      teamEventId: this.eventData.id,
      teamEventType: this.eventData.type
    };
    this.confirmSessionEmitter.emit(event);
  }

  convertSession(eventId) {
    const event = {
      teamEventId: this.eventData.id,
      teamEventType: this.eventData.type
    };
    this.convertSessionEmitter.emit(event);
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

    // const event = {
    //   teamEventId: this.eventData.id,
    //   teamEventType: this.eventData.type
    // };

    // this.deleteSessionEmitter.emit(event);
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
