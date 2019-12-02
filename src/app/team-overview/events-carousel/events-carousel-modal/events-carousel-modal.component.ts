import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-events-carousel-modal',
  templateUrl: './events-carousel-modal.component.html',
  styleUrls: ['./events-carousel-modal.component.scss']
})
export class EventsCarouselModalComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string, modalData?: any }
  ){}

  onCancel() {
    this.dialogRef.close();
  }
}
