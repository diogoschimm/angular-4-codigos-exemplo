import { HardCodeService } from './../../-services/-utilitario/hard-code.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  nomeProjeto: string = "";

  constructor(
    private _hardCode: HardCodeService
  ) {
    this.nomeProjeto = _hardCode.nomeProjeto;
  }

  ngOnInit() {
  }

}
