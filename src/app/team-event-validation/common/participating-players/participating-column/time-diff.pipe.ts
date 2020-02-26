import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
	name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {

	transform(value: any, endTime?: any, suffix?: string, roundUp: boolean = true): any {
		if (roundUp) {
			const startTime = moment(value).startOf('minute');
			endTime = moment(endTime).startOf('minute').add(1, 'minute');
			return `${startTime.diff(endTime, 'minutes')}${suffix}`
		}
		return `${moment(value).diff(moment(endTime), "minutes")}${suffix}`;
	}

}
