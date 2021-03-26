import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: any): any {
    let valorFinal: string = value;
    if (value){
      valorFinal = value.toString();
      valorFinal = 'R$ ' + valorFinal.replace('.',',');
    }
    return valorFinal;
  }

}
