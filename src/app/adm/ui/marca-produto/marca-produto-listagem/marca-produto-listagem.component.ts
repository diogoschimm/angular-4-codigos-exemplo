import { MarcaProdutoService } from './../../../../-services/-marca-produto/-marca-produto.service';
import { MarcaProduto } from './../../../../-models/-marca-produto/MarcaProduto';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Subscription } from 'rxjs/Subscription';
  import { Component, OnInit, OnDestroy } from '@angular/core';
  
  declare var swal: any;
  declare var toastr: any;
  
@Component({
  selector: 'app-marca-produto-listagem',
  templateUrl: './marca-produto-listagem.component.html'
})
  export class MarcaProdutoListagemComponent  implements OnInit, OnDestroy {
    
    lista: MarcaProduto[];
    isLoading: boolean = false;
    inscricao: Subscription;
  
    constructor(
      private _rota: Router,
      private _rotaAtiva: ActivatedRoute,
      private _marcaProdutoService: MarcaProdutoService
    ) { }
    
    ngOnInit() {
      this.isLoading = true; 
      this.inscricao = this._rotaAtiva.data.subscribe(
        (info: {insc: any}) => {  
          this.lista = info.insc.lista.sort(this.ordenacaoListagem);
          this.isLoading = false; 
        }); 
    } 
    ordenacaoListagem(a:MarcaProduto, b: MarcaProduto){
      if (a.nomeMarcaProduto < b.nomeMarcaProduto) { return -1; }
      if (a.nomeMarcaProduto > b.nomeMarcaProduto) { return 1; }
      return 0;
    }
  
    excluirRegistro(item: MarcaProduto){
      let me = this;
      me.isLoading = true;
      
      swal({
        title: "Confirmar exclusão?",
        text: "Excluir a marca: \n" + item.nomeMarcaProduto + "!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, Excluir!",
        closeOnConfirm: false
      }, function(){
        
        me._marcaProdutoService.excluir(item.idMarcaProduto).subscribe(
          data =>{
            if (data.isSucesso){
              swal({title: "Excluído!", text: "Marca excluída com sucesso.", type: "success"}, function(){
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
    