import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment-timezone";

@Pipe({
  name: 'timeDiff'
})
export class TimeDiffPipe implements PipeTransform {

  transform(value: any, endTime?: any, suffix?: string): any {
    return `${moment(value).diff(moment(endTime), "minutes")}${suffix}`;
  }

}
