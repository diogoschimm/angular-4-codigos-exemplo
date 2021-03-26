import { ItemPedidoCadastro } from './../../../../-models/-pedido/ItemPedidoCadastro';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PedidoCadastro } from '../../../../-models/-pedido/PedidoCadastro';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.component.html',
  styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {

  pedido: PedidoCadastro

  @ViewChild('nomeFornecedor') private _nomeFornecedor: ElementRef

  constructor() { }

  ngOnInit() {
    this._nomeFornecedor.nativeElement.focus()
  }

  getQTDProdutos() : number{
    return this.pedido.itens.length;
  }

  getQTDItens(): number{
    return this.pedido.itens
      .map(item => item.quantidade)
      .reduce((prev, value) => prev + value, 0)
  }

  getValorTotalItens(){
    this.pedido.valorTotalPedido = this.pedido.itens
      .map(item => item.quantidade)
      .reduce((prev, value) => prev + value, 0)
    return this.pedido.valorTotalPedido
  }

  addItem(item: ItemPedidoCadastro){
      this.pedido.itens.push(item)
  }

  removeItem(item: ItemPedidoCadastro){
    this.pedido.itens.splice(this.pedido.itens.indexOf(item))
  }

  updateQTDItem(idProdutoCadastrado: number, qtd: number, nomeProduto: string){
      this.pedido.itens.forEach(item => {
        let encontrou: boolean = false
        if(item.idProdutoCadastrado = idProdutoCadastrado){
          encontrou = true
        }else if(item.nomeProduto == nomeProduto){
          encontrou = true
        }
        if(encontrou){
          item.quantidade = qtd;
        }
      });
  }
}
