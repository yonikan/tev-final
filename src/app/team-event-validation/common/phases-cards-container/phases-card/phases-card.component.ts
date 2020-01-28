import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AreYouSureModalComponent } from '../../../common/are-you-sure-modal/are-you-sure-modal.component';
import { MatDialog } from '@angular/material';
import { PhasesModalComponent } from '../../../common/phases-modal/phases-modal.component';
// import moment = require('moment');
import * as moment from 'moment';
import { enumToString } from '../../../../core/helpers/helper-functions';
import { TrainingDrills } from '../../../../core/enums/training-drills.enum'

@Component({
  selector: 'app-phases-card',
  templateUrl: './phases-card.component.html',
  styleUrls: ['./phases-card.component.scss']
})
export class PhasesCardComponent implements OnInit {

  @Input() phase;
  @Input() PhasesCount;
  @Input() idx;
  @Output() deleteCard = new EventEmitter();

  mode = 'MATCH';

  enumToString = enumToString;
  TrainingDrills = TrainingDrills;

  elapsisOptions = [
    // { name: 'Duplicate', icon: 'account_circle' },
    { name: 'Delete', icon: 'account_circle', action: 'onDeleteCard' }
  ];


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.phase)
  }

  translateEnumNumber(enumNumber) {
    return enumNumber;
    // console.log(TrainingDrills, enumNumber);
    return enumToString(TrainingDrills, enumNumber);
  }

  getTimeByFormat(startTime, endTime, offset?) {
    const diff = moment(endTime).diff(startTime, 'minutes');
    startTime = moment(startTime).add(offset, 'hours').format('hh:mm');
    endTime = moment(endTime).add(offset, 'hours').format('hh:mm');
    return `${startTime} - ${endTime} (${diff} min) - phase ${this.idx + 1}/${this.PhasesCount}`
  }

  hundleElapsisAction(elapsisOption) {
    this[elapsisOption.action]();
  }

  onDeleteCard() {
    const modalTitle = 'Delete Phase';
    const modalMessage = `Are you sure you want to delete ${this.phase.name} phase?`;
    const dialogRef = this.dialog.open(AreYouSureModalComponent, {
      width: '500px',
      height: '200px',
      data: {
        title: modalTitle,
        message: modalMessage,
        modalData: this.phase.name
      }
    });

    dialogRef.afterClosed()
      .subscribe(modalData => {
        if (modalData) {
          this.deleteCard.emit();
        }
      });
  }

  phaseClicked() {

    const dialogRef = this.dialog.open(PhasesModalComponent, {
      width: '870px',
      // height: '200px',
      data: {
        eventType: 'TRAINING',
        PhasesCount: this.PhasesCount,
        idx: this.idx,
        phase: this.phase
      }
    });

    dialogRef.afterClosed()
      .subscribe(modalData => {
        if (modalData) {
        }
      });
  }

}
