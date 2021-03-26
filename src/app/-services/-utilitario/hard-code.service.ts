import { Injectable } from '@angular/core';

@Injectable()
export class HardCodeService {

  ano:number = new Date().getFullYear();
  empresa: string = "Empresa Exemplo";
  telefone: string = "(65) 9999-9999";
  mensagemDireitos: string = "Todos os direitos reservados a " + this.empresa + " Fone: " + this.telefone;
  nomeProjeto: string = "Sample";

  constructor() { }
}
