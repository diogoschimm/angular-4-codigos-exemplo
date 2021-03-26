import { DepartamentoProdutoListagemComponent } from './../../departamento-produto/departamento-produto-listagem/departamento-produto-listagem.component';
import { PedidoService } from './../../../../-services/-pedido/pedido.service';
import { Component, OnInit } from '@angular/core';
import { PedidoListagem } from '../../../../-models/-pedido/PedidoListagem';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pedido-listagem',
  templateUrl: './pedido-listagem.component.html',
  styleUrls: ['./pedido-listagem.component.css']
})
export class PedidoListagemComponent implements OnInit {

  lista: PedidoListagem[]
  isLoading: boolean = false
  inscricao: Subscription

  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute,
    private _pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) => {
        console.log(info.insc.Lista);
        this.lista = []; // info.insc.lista.sort(this.ordenacaoListagem)
        this.isLoading = false
      }
    )
  }

  ordenacaoListagem(a: PedidoListagem, b:PedidoListagem){
    if (a.fornecedor < b.fornecedor) { return -1; }
    if (a.fornecedor > b.fornecedor) { return 1; }
    return 0;
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
