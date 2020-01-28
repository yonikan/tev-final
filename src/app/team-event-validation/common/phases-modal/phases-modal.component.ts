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
  selectedModalOption;
  phaseDurationTotal;
  phaseToEdit;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { eventType: string, PhasesCount: number, idx: number, phase: any }) {
  }

  ngOnInit() {
    this.phaseToEdit = JSON.parse(JSON.stringify(this.data.phase));
    this.setModalOptions();
  }

  setModalOptions() {
    switch (this.data.eventType) {
      case 'MATCH':
        this.modalOptions = [{ name: 'Match Phase', icon: 'account_circle' }, { name: 'Warmup', icon: 'account_circle' }] // match
        break;

      case 'TRAINING':
        this.modalOptions = [{ name: 'Technical', icon: 'account_circle' }, { name: 'Physical', icon: 'account_circle' }] // training
        break;
    }

    this.selectedModalOption = this.modalOptions[0];
  }

  onPitchSizeSelect(pitchSize): void {
    this.phaseToEdit.pitchLength = pitchSize.pitchLength;
    this.phaseToEdit.pitchWidth = pitchSize.pitchWidth;
  }

  setPhaseDurationTotal() {
    const diff = moment(this.data.phase.endTime).diff(this.data.phase.startTime, 'minutes');
    this.phaseDurationTotal = `Total: ${diff} MIN`;
    return this.phaseDurationTotal;
  }

  onModalOptionSelect(event) {
    this.selectedModalOption = event.value;
    // console.log(event)
  }

  savePhase() {

    console.log('saving phase')
  }

  close() {
    this.dialogRef.close();
  }

}
