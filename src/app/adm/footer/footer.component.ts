import { HardCodeService } from './../../-services/-utilitario/hard-code.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  mensagemDireitos: string = "";
  ano: number;

  constructor(
    private _hardCode: HardCodeService
  ) {
    this.mensagemDireitos = _hardCode.mensagemDireitos;
    this.ano = _hardCode.ano;
  }

  ngOnInit() { }
}
