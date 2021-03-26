import { DepartamentoProdutoService } from './../../../../-services/-departamento-produto/-departamento-produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DepartamentoProduto } from './../../../../-models/-departamento-produto/DepartamentoProduto';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare var swal: any;
declare var toastr: any;

@Component({
  selector: 'app-departamento-produto-listagem',
  templateUrl: './departamento-produto-listagem.component.html'
})
export class DepartamentoProdutoListagemComponent  implements OnInit, OnDestroy {
  
  lista: DepartamentoProduto[];
  isLoading: boolean = false;
  inscricao: Subscription;
  
  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute,
    private _departamentoProdutoService: DepartamentoProdutoService
  ) { }
  
  ngOnInit() {
    this.isLoading = true; 
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) => { 
        this.lista = info.insc.lista.sort(this.ordenacaoListagem);
        this.isLoading = false; 
      }); 
    } 
    ordenacaoListagem(a:DepartamentoProduto, b: DepartamentoProduto){
      if (a.nomeDepartamentoProduto < b.nomeDepartamentoProduto) { return -1; }
      if (a.nomeDepartamentoProduto > b.nomeDepartamentoProduto) { return 1; }
      return 0;
    }
    
    excluirRegistro(item: DepartamentoProduto){
      let me = this;
      me.isLoading = true;
      
      swal({
        title: "Confirmar exclusão?",
        text: "Excluir o departamento: \n" + item.nomeDepartamentoProduto + "!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, Excluir!",
        closeOnConfirm: false
      }, function(){
        
        me._departamentoProdutoService.excluir(item.idDepartamentoProduto).subscribe(
          data =>{
            if (data.isSucesso){
              swal({title: "Excluído!", text: "Departamento excluído com sucesso.", type: "success"}, function(){
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
    