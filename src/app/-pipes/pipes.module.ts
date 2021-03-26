import { TratamentoNomePipe } from './tratamento-nome.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPercentPipe } from './format-percent.pipe';
import { FormatCurrencyPipe } from './format-currency.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TratamentoNomePipe,
    FormatPercentPipe,
    FormatCurrencyPipe
  ],
  exports:[
    TratamentoNomePipe,
    FormatPercentPipe,
    FormatCurrencyPipe
  ]
})
export class PipesModule { }
