import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { enumToString } from 'src/app/core/helpers/helper-functions';
import { teamEvents } from 'src/app/core/enums/team-events.enum';
import * as moment from 'moment';
import { ValidatedEventsService } from '../../validated-events/validated-events.service';
import { offset } from 'highcharts';

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
    this.eventData.startTime = moment(this.eventData.startTime);
    this.eventData.endTime = moment(this.eventData.endTime);
    this.eventData.trimStartTime = moment(this.eventData.trimStartTime);
    this.eventData.trimEndTime = moment(this.eventData.trimEndTime);
    this.eventData.phaseMinStartTime = moment(this.eventData.phaseMinStartTime);
    this.eventData.phaseMaxEndTime = moment(this.eventData.phaseMaxEndTime);

    let offset = 0;
    // if (this.eventData.offset) {
    //   offset = this.eventData.offset;
    // }

    this.eventData.startTime = this.eventData.startTime.add(offset, 'hours');
    this.eventData.endTime = this.eventData.endTime.add(offset, 'hours');
    this.eventData.trimStartTime = this.eventData.trimStartTime.add(offset, 'hours');
    this.eventData.trimEndTime = this.eventData.trimEndTime.add(offset, 'hours');
    this.eventData.phaseMinStartTime = this.eventData.phaseMinStartTime.add(offset, 'hours');
    this.eventData.phaseMaxEndTime = this.eventData.phaseMaxEndTime.add(offset, 'hours');



    // formatted time
    let start;
    let end;
    if(this.eventData.type === 1) {
      if (this.eventData.trimStartTime){
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



    // console.log('this.eventData.startTime - ORIGINAL-EPOCH: ', this.eventData.startTime);
    // this.startTimeHoursFormatted =  this.eventData.startTime;
    // this.startTimeHoursFormatted = moment(start).format('HH:mm');
    // console.log('this.startTimeHoursFormatted: ', this.startTimeHoursFormatted);

    // this.endTimeHoursFormatted =  this.eventData.endTime;
    // this.endTimeHoursFormatted = moment(end).format('HH:mm');
    // console.log('this.endTimeHoursFormatted: ', this.endTimeHoursFormatted);


    // this.startTimeHoursFormatted = new Date(this.eventData.startTime);
    // console.log('this.startTimeHoursFormatted: ', this.startTimeHoursFormatted);
    // this.endTimeHoursFormatted = new Date(this.eventData.endTime);
    // console.log('this.endTimeHoursFormatted: ', this.endTimeHoursFormatted);
    



    // const dateMoment = moment(this.eventData.startTime);
    // const hours = dateMoment.hours();
    // const mins = dateMoment.minutes();
    // const dateObj = dateMoment.toDate();
    // dateObj.setHours(hours);
    // dateObj.setMinutes(mins);
    // console.log('dateObj: ', dateObj);


    // const tmp = moment(this.eventData.startTime).utc(true);
    // const tmp = new Date(this.eventData.startTime);
    // let tmpNew = tmp.toISOString();
    // console.log('tmpNew: ', tmpNew);

    // this.startTimeHoursFormatted = new Date(this.eventData.startTime).toISOString();
    // console.log('this.startTimeHoursFormatted: ', this.startTimeHoursFormatted);
    // this.endTimeHoursFormatted = new Date(this.eventData.endTime).toISOString();
    // console.log('this.endTimeHoursFormatted: ', this.endTimeHoursFormatted);










    // duration
    let duration;
    const startForDuration = moment(this.eventData.startTime);
    const endForDuration = moment(this.eventData.endTime);

    if(this.eventData.duration){
      duration = Math.abs(this.eventData.duration);
    } else {
      duration = Math.abs(startForDuration.diff(endForDuration, 'minutes'));
    }
    this.duration = Math.floor(duration);

    

    // team event date
    // const NOW = moment();
    // this.durationTimeAgo = NOW.format('dddd, MMMM Do YYYY');
    // this.durationTimeAgo = '12-12-12';

    let teamEventDate = moment(this.eventData.startTime);
    this.durationTimeAgo = teamEventDate.format('dddd, MMMM Do YYYY');





    // const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    // let current_datetime = new Date(this.eventData.startTime).toISOString();
    // let date = new Date(current_datetime);
    // let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear() + "-" + date.getHours() + "-" + date.getMinutes();
    // console.log(formatted_date);

    let startHours = new Date(this.eventData.startTime).toISOString().substring(11, 13);
    let startMinutes = new Date(this.eventData.startTime).toISOString().substring(14, 16);
    let endHours = new Date(this.eventData.endTime).toISOString().substring(11, 13);
    let endMinutes = new Date(this.eventData.endTime).toISOString().substring(14, 16);
    this.startTimeHoursFormatted = `${startHours}:${startMinutes}`;
    this.endTimeHoursFormatted = `${endHours}:${endMinutes}`;

    // this.startTimeHoursFormatted = new Date(this.eventData.startTime).toISOString();
    // console.log('this.startTimeHoursFormatted: ', this.startTimeHoursFormatted);
    // console.log(moment(this.startTimeHoursFormatted).format("H:mm:ss"));
    // this.startTimeHoursFormatted =  this.eventData.startTime;
    // this.startTimeHoursFormatted = moment(start).format('HH:mm');
    // this.endTimeHoursFormatted = new Date(this.eventData.endTime).toISOString();
    // this.endTimeHoursFormatted =  this.eventData.endTime;
    // this.endTimeHoursFormatted = moment(end).format('HH:mm');




    // card title
    this.teamEventTypeString = enumToString(teamEvents, this.eventData.type);

    if(this.eventData.isValidated) {
      if(this.eventData.type === 1) {
        if(this.eventData.eventTags) {
          this.cardTitle = this.eventData.eventTags[0];
        } else {
          this.cardTitle = `Training Session`;
        }
      } else if(this.eventData.type === 2) {
        if(this.eventData.opponentName) {
          this.cardTitle = `Vs. ${this.eventData.opponentName}`;
        } else {
          this.cardTitle = `Match`;
        }
      }
    } else {
       this.cardTitle = `new ${this.teamEventTypeString}`;
    }
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
