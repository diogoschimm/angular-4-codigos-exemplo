import { ProdutoService } from './../../../../-services/-produto/produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProdutoListagem } from './../../../../-models/-produto/ProdutoListagem';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare var swal: any;
declare var toastr: any;

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html'
  
})
export class ProdutoListagemComponent implements OnInit, OnDestroy {
  
  lista: ProdutoListagem[];
  isLoading: boolean = false;
  inscricao: Subscription;

  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute,
    private _produtoService: ProdutoService
  ) { }
  
  ngOnInit() {
    this.isLoading = true; 
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) => { 
        this.lista = info.insc.lista.sort(this.ordenacaoListagem); 
        this.isLoading = false; 
      }); 
  } 
  ordenacaoListagem(a:ProdutoListagem, b: ProdutoListagem){
    if (a.nomeProduto < b.nomeProduto) { return -1; }
    if (a.nomeProduto > b.nomeProduto) { return 1; }
    return 0;
  }
  obterMargem(item: ProdutoListagem){
    if (item.ultimoValorCompra == 0 || !item.ultimoValorCompra ){
      return 100.00;
    }else{
      return ((item.valorVenda / item.ultimoValorCompra) - 1) * 100;
    }
  }

  excluirRegistro(item: ProdutoListagem){
    let me = this;
    me.isLoading = true;
    
    swal({
      title: "Confirmar exclusão?",
      text: "Excluir o produto: \n" + item.nomeProduto + "!",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, Excluir!",
      closeOnConfirm: false
    }, function(){
      
      me._produtoService.excluir(item.idProduto).subscribe(
        data =>{
          if (data.isSucesso){
            swal({title: "Excluído!", text: "Produto excluído com sucesso.", type: "success"}, function(){
              me.isLoading = false; 
              me.lista.splice(me.lista.indexOf(item), 1);
            });
          }else{
            toastr['error'](data.mensagemRequisicao);
            me.isLoading = false;
          }
        }, error =>{
          me.isLoading = false;
        }); 
      }); 
    }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
