import { Component, OnInit, Input } from '@angular/core';
import { VerticesData } from 'src/app/team-event-validation/team-event-validation.interface';

@Component({
  selector: 'app-training-duration',
  templateUrl: './training-duration.component.html',
  styleUrls: ['./training-duration.component.scss']
})
export class TrainingDurationComponent implements OnInit {
	@Input() verticesData: VerticesData = {velInterpMs: 0, timeDtMs: 0, startTimeInterpMs: 0};
	@Input() highlightedRange;
	startTime;
	endTime;

	constructor() { }

	ngOnInit() {
		this.startTime = this.highlightedRange.startTime;
		this.endTime = this.highlightedRange.endTime;
	}

	updateTime(timeStr, prop) {
		const d = new Date(this.highlightedRange[prop]);
		timeStr
			.split(':')
			.map((v, i) => {
				if (i === 0) {
					return d.setHours(v);
				}
				return d.setMinutes(v);
			});

		this.highlightedRange[prop] = d.getTime();
		this[prop] = d.getTime();// HACK: for change detection
	}
}
