import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tratamentoNome'})
export class TratamentoNomePipe implements PipeTransform{        
     transform(value: string){
          let nomeFinal = value;
          let nomes: string[]  = value.split(" ");
          if (nomes.length > 2){
               nomeFinal = nomes[0] + " " + nomes[1];
               if (nomes[1].length <= 3){
                    nomeFinal += " " + nomes[2];
               }
          }
          return nomeFinal;
     }
}    