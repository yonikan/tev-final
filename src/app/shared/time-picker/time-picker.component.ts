import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  timeForDisplay;

  @Input() seconds = 0;
  @Input() minutes = 0;
  @Input() range;
  @Input() difference = '1 seconds';

  @Output() timeChanged = new EventEmitter();

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor() { }

  ngOnInit() {
    this.setTimeForDisplay();
  }

  setTimeForDisplay() {
    this.timeForDisplay = null;
    const zero = '0';
    const secondsForDisplay = this.seconds < 10 ? zero + this.seconds : this.seconds;
    const minutesForDisplay = this.minutes < 10 ? zero + this.minutes : this.minutes;
    this.timeForDisplay = `${minutesForDisplay} : ${secondsForDisplay}`;
    if (this.input) { this.input.nativeElement.value = this.timeForDisplay };
    this.emitTime();
  }

  useDifference(actionType) {
    if (!this.minutes && !this.seconds && actionType === 'MINUS') { return };

    let time = +this.difference.split(' ')[0];
    let timeUnit = this.difference.split(' ')[1];

    switch (actionType) {
      case 'PLUS':
        if (timeUnit === 'seconds' && this.seconds === 59) { this.minutes++; this.seconds = 0; }
        else { this[timeUnit] = this[timeUnit] + time; }
        break;

      case 'MINUS':
        if (timeUnit === 'seconds' && this.seconds === 0) { this.minutes--; this.seconds = 59; }
        else { this[timeUnit] = this[timeUnit] - time; }
        break;
    }

    this.setTimeForDisplay();
  }

  handleUserInput(event) {
    const userInput = event.target.value.split(':');

    if (userInput.length === 2) {
      if (Number.isInteger(+userInput[0]) && Number.isInteger(+userInput[1])) {
        this.minutes = +userInput[0] < 60 ? +userInput[0] : this.minutes;
        this.seconds = +userInput[1] < 60 ? +userInput[1] : this.seconds;
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
      seconds: this.seconds,
      minutes: this.minutes,
      timeString: this.timeForDisplay
    })
  }

}
