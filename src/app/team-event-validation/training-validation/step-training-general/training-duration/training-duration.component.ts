import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-duration',
  templateUrl: './training-duration.component.html',
  styleUrls: ['./training-duration.component.scss']
})
export class TrainingDurationComponent implements OnInit {
	@Input() verticesData: { vel_interp_ms, time_dt_ms, start_time_interp_ms };
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

	getTimeStr(time) {
		const d = new Date(time);
		return `${`${d.getHours()}`.padStart(2, '0')}:${`${d.getMinutes()}`.padStart(2, '0')}`
	}
}
