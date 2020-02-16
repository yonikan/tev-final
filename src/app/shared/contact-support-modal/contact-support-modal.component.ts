import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServerEnvService } from 'src/app/core/services/server-env.service';

@Component({
	selector: 'app-contact-support-modal',
	templateUrl: './contact-support-modal.component.html',
	styleUrls: ['./contact-support-modal.component.scss']
})
export class ContactSupportModalComponent implements OnInit {
	contactSupportFormGroup: FormGroup;
	subject = null;
	message = null;

	constructor(
		public dialogRef: MatDialogRef<ContactSupportModalComponent>,
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private serverEnvService: ServerEnvService
	){}

	ngOnInit() {
		this.contactSupportFormGroup = this.formBuilder.group({
			subjectText: ['', []],
			messageText: ['', []]
		  });
	}

	onCancel() {
		this.dialogRef.close();
	}

	onSubmit() {
		if (!this.contactSupportFormGroup.valid) {
			return;
		}
		const PATH = this.serverEnvService.getBaseUrl();
		const PAYLOAD = this.contactSupportFormGroup.value;
		this.http.post<any>(`${PATH}/v3/support`, PAYLOAD)
			.subscribe(
				(resp: any) => {
					console.log('the mail has been sent!');
				},
				(error) => {
					console.log('the mail has NOT been sent!');
				}
			);
		this.dialogRef.close(this.contactSupportFormGroup.value);
	}
}
