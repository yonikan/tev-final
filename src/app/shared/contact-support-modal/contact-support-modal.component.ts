import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-contact-support-modal',
	templateUrl: './contact-support-modal.component.html',
	styleUrls: ['./contact-support-modal.component.scss']
})
export class ContactSupportModalComponent implements OnInit {
	form: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<ContactSupportModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data, fb: FormBuilder) {

			this.form = fb.group({
				subject: '',
				message: ''
			});
		}

	ngOnInit() {
	}

	cancel() {
		this.dialogRef.close();
	}

	onSubmit() {
		if (this.form.invalid) {
			return false;
		}
		this.dialogRef.close(this.form.value);
	}

}
