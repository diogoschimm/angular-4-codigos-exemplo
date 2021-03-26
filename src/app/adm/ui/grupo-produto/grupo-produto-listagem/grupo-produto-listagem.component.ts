import { GrupoProdutoService } from './../../../../-services/-grupo-produto/-grupo-produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GrupoProduto } from './../../../../-models/-grupo-produto/GrupoProduto';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare var swal: any;
declare var toastr: any;

@Component({
  selector: 'app-grupo-produto-listagem',
  templateUrl: './grupo-produto-listagem.component.html' 
})
export class GrupoProdutoListagemComponent  implements OnInit, OnDestroy {
  
  lista: GrupoProduto[];
  isLoading: boolean = false;
  inscricao: Subscription;

  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute,
    private _grupoProdutoService: GrupoProdutoService
  ) { }
  
  ngOnInit() {
    this.isLoading = true; 
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) => {  
        this.lista = info.insc.lista.sort(this.ordenacaoListagem);
        this.isLoading = false; 
      }); 
  } 
  ordenacaoListagem(a:GrupoProduto, b: GrupoProduto){
    if (a.nomeGrupoProduto < b.nomeGrupoProduto) { return -1; }
    if (a.nomeGrupoProduto > b.nomeGrupoProduto) { return 1; }
    return 0;
  }

  excluirRegistro(item: GrupoProduto){
    let me = this;
    me.isLoading = true;
    
    swal({
      title: "Confirmar exclusão?",
      text: "Excluir o grupo: \n" + item.nomeGrupoProduto + "!",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, Excluir!",
      closeOnConfirm: false
    }, function(){
      
      me._grupoProdutoService.excluir(item.idGrupoProduto).subscribe(
        data =>{
          if (data.isSucesso){
            swal({title: "Excluído!", text: "Grupo excluído com sucesso.", type: "success"}, function(){
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
  