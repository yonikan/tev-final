import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import moment from "moment-timezone";

@Pipe({
	name: 'convertedDate'
})
export class ConvertedDatePipe extends DatePipe implements PipeTransform {

	transform(value: string | Date, format: string = 'mediumDate', offset: string = ''): string {
		const timezoneOffset = moment(value).utcOffset(+offset).format('Z');
    	return super.transform(value, format, timezoneOffset);
	}

}
