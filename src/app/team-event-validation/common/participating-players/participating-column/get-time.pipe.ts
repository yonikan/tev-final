import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTime'
})
export class GetTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
	const d = new Date(value);
	return `${(`${d.getHours()}`).padStart(2, '0')}:${(`${d.getMinutes()}`).padStart(2, '0')}`;
  }

}
