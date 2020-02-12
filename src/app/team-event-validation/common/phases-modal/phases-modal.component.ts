import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'phases-modal',
  templateUrl: './phases-modal.component.html',
  styleUrls: ['./phases-modal.component.scss']
})
export class PhasesModalComponent implements OnInit {

  modalOptions;
  phaseDurationTotal;
  phaseToEdit;

  startTimeError;
  endTimeError;

  constructor(private teamEventValidationService: TeamEventValidationService, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: number, phasesCount: number, index: number, phase: any }) {
  }

  ngOnInit() {
    this.phaseToEdit = JSON.parse(JSON.stringify(this.data.phase));
    this.setModalOptions();
  }

  setModalOptions() {
    if (this.data.eventType === 1) {
      this.modalOptions = [{ name: 'Technical', icon: 'account_circle', id: 3 }, { name: 'Physical', icon: 'account_circle', id: 1 }] // training
    } else if (this.data.eventType === 2) {
      this.modalOptions = [{ name: 'Match Phase', icon: 'account_circle', id: 5 }, { name: 'Warmup', icon: 'account_circle', id: 6 }] // match
    }
  }

  setPhaseDurationTotal() {
    const diff = moment(this.phaseToEdit.endTime).diff(this.phaseToEdit.startTime, 'minutes');
    this.phaseDurationTotal = `Total: ${diff} MIN`;
    return this.phaseDurationTotal;
  }

  onUpdateField({ value, filedPathToUpdate }) {
    console.log(value, filedPathToUpdate);
    this.phaseToEdit[filedPathToUpdate[0]] = value; //TODO: add generic array logic;
    // let fieldToUpdate = this.phaseToEdit;
    // filedPathToUpdate.forEach((pathItem, index) => {
    //   fieldToUpdate = fieldToUpdate[pathItem];
    // });
    // fieldToUpdate = value;
    console.log(this.phaseToEdit);
  }

  savePhase() {
    // TODO: check restrictions before saving
    // TODO: replce phaseToEdit with original phase
    console.log('saving phase', this.phaseToEdit);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  updateTime(timeStr, prop) {
    const d = new Date(this.phaseToEdit[prop]);
    timeStr
      .split(':')
      .map((v, i) => {
        if (i === 0) {
          return d.setHours(v);
        }
        return d.setMinutes(v);
      });

    if (this.isValidTime(d.getTime())) {
      this.startTimeError = 'warmup phase can be only first or last phase'
      return;
    }

    this.phaseToEdit[prop] = d.getTime();
    this[prop] = d.getTime();// HACK: for change detection

    this.startTimeError = '';
    this.endTimeError = '';
  }

  isValidTime(time) {
    const phases = this.teamEventValidationService.getAllPhases()
    return time < phases[0].startTime || time > phases[phases.length - 1].endTime
  }

}
