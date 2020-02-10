import { Component, OnInit, Input, Inject } from '@angular/core';
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

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: string, PhasesCount: number, index: number, phase: any }) {
  }

  ngOnInit() {
    this.phaseToEdit = JSON.parse(JSON.stringify(this.data.phase));
    this.setModalOptions();
  }

  setModalOptions() {
    switch (this.data.eventType) {
      case 'MATCH':
        this.modalOptions = [{ name: 'Match Phase', icon: 'account_circle', id: 2 }, { name: 'Warmup', icon: 'account_circle', id: 4 }] // match
        break;

      case 'TRAINING':
        this.modalOptions = [{ name: 'Technical', icon: 'account_circle', id: 3 }, { name: 'Physical', icon: 'account_circle', id: 1 }] // training
        break;
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

	this.phaseToEdit[prop] = d.getTime();
	this[prop] = d.getTime();// HACK: for change detection
}

}
