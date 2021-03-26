import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPercent'
})
export class FormatPercentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.toString() +" %";
  }

}
