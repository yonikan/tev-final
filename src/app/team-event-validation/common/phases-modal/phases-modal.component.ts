import { TeamEventValidationService } from 'src/app/team-event-validation/team-event-validation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'phases-modal',
  templateUrl: './phases-modal.component.html',
  styleUrls: ['./phases-modal.component.scss'],
})
export class PhasesModalComponent implements OnInit {
  modalOptions;
  phaseDurationTotal;
  phaseToEdit;

  durationError;

  constructor(private teamEventValidationService: TeamEventValidationService, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: number, phasesCount: number, index: number, phase: any }) {
  }

  ngOnInit() {
    this.phaseToEdit = JSON.parse(JSON.stringify(this.data.phase));
    this.phaseToEdit['originalSubType'] = this.phaseToEdit.subType;
    this.setModalOptions();
    console.log(this.modalOptions, this.phaseToEdit)
  }

  setModalOptions() {
    if (this.data.eventType === 1) { // training
      this.modalOptions = [
        { name: 'Technical', icon: 'account_circle', type: 3 },
        { name: 'Physical', icon: 'account_circle', type: 1 },
      ]
    } else if (this.data.eventType === 2) { // match
      this.modalOptions = [
        { name: 'Match Phase', icon: 'account_circle', type: 5, subType: null },
        { name: 'Warmup', icon: 'account_circle', type: 5 , subType: 7},
      ]
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
    console.log('saving phase', this.phaseToEdit)
    this.close(this.phaseToEdit);
  }

  close(updatedPhase?) {
    this.dialogRef.close(updatedPhase);
  }

  updateTime(timeStr, prop) {
    const d = new Date(this.phaseToEdit[prop]);
    timeStr.split(':').map((v, i) => {
      if (i === 0) {
        return d.setHours(v)
      }
      return d.setMinutes(v)
    })

    // console.log(!this.isValidTime(d.getTime()) , this.phaseToEdit.type === 6 , prop === 'startTime');
    if (!this.isValidTime(d.getTime()) && this.phaseToEdit.type === 6 && prop === 'startTime') {
      this.durationError = 'warmup phase can be only first or last phase';
      return;
    }

    this.onUpdateField({ value: d.getTime(), filedPathToUpdate: [prop] });
    this[prop] = d.getTime() // HACK: for change detection

    this.durationError = '';
  }

  isValidTime(time) {
    const phases = this.teamEventValidationService.getAllPhases();
    console.log((time < phases[0].startTime || time > phases[phases.length - 1].endTime));
    return (time < phases[0].startTime || time > phases[phases.length - 1].endTime);
  }
}
