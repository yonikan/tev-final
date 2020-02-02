import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  timeForDisplay;

  @Input() defaultTime;
  @Input() minutes = 0;
  @Input() hours = 0;
  @Input() range;
  @Input() difference = '1 minutes';

  @Output() timeChanged = new EventEmitter();

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor() { }

  ngOnInit() {
    if (this.defaultTime) {
      const defaultTime = moment(this.defaultTime).format('hh:mm'); // todo: add offset
      this.handleUserInput(defaultTime)
    } else {
      this.setTimeForDisplay();
    }
  }

  setTimeForDisplay() {
    this.timeForDisplay = null;
    const zero = '0';
    const minutesForDisplay = this.minutes < 10 ? zero + this.minutes : this.minutes;
    const hoursForDisplay = this.hours < 10 ? zero + this.hours : this.hours;
    this.timeForDisplay = `${hoursForDisplay} : ${minutesForDisplay}`;
    if (this.input) { this.input.nativeElement.value = this.timeForDisplay };
    this.emitTime();
  }

  useDifference(actionType) {
    if (!this.hours && !this.minutes && actionType === 'MINUS') { return };

    let time = +this.difference.split(' ')[0];
    let timeUnit = this.difference.split(' ')[1];

    switch (actionType) {
      case 'PLUS':
        if (timeUnit === 'minutes' && this.minutes === 59) { this.hours++; this.minutes = 0; }
        else { this[timeUnit] = this[timeUnit] + time; }
        break;

      case 'MINUS':
        if (timeUnit === 'minutes' && this.minutes === 0) { this.hours--; this.minutes = 59; }
        else { this[timeUnit] = this[timeUnit] - time; }
        break;
    }

    this.setTimeForDisplay();
  }

  handleUserInput(value) {
    const userInput = value.split(':');

    if (userInput.length === 2) {
      if (Number.isInteger(+userInput[0]) && Number.isInteger(+userInput[1])) {
        this.hours = +userInput[0] < 60 ? +userInput[0] : this.hours;
        this.minutes = +userInput[1] < 60 ? +userInput[1] : this.minutes;
      }
    }
    this.setTimeForDisplay();

    // console.log(typeof +userInput[0]);
  }

  isInRange(time) {
    time = time.split(':');
    const range = this.range.split(':');
    return ((time[0] < range[0]) || (time[0] === range[0] && time[1] <= range[1]));
  }

  emitTime() {
    this.timeChanged.emit({
      timeUnix: +moment(this.timeForDisplay, 'HH:mm').format('x'),
      minutes: this.minutes,
      hours: this.hours,
      timeString: this.timeForDisplay
    });
  }

}
