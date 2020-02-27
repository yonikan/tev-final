import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
	name: 'getTime'
})
export class GetTimePipe implements PipeTransform {
	transform(value: any, roundUp: any = true): any {
		let d = moment(value);
		if (roundUp) {
			d = d.startOf('minute').add(1, 'minute');
		}
		return `${(`${d.hours()}`).padStart(2, '0')}:${(`${d.minutes()}`).padStart(2, '0')}`;
	}

}
