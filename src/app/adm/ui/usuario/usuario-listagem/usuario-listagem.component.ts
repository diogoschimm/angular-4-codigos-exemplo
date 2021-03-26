import { UsuarioService } from './../../../../-services/-usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UsuarioListagem } from './../../../../-models/-usuario/UsuarioListagem';
import { Component, OnInit, OnDestroy } from '@angular/core'; 

declare var swal: any;
declare var toastr: any;

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html'
})
export class UsuarioListagemComponent implements OnInit, OnDestroy {
 
  lista: UsuarioListagem[];
  isLoading: boolean = false;
  inscricao: Subscription;
  
  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.isLoading = true; 
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) => {  
        this.lista = info.insc.lista.sort(this.ordenacaoListagem); 
        this.isLoading = false;
      }); 
  }

  ordenacaoListagem(a:UsuarioListagem, b: UsuarioListagem){
    if (a.nomeUsuario < b.nomeUsuario) { return -1; }
    if (a.nomeUsuario > b.nomeUsuario) { return 1; }
    return 0;
  }

  excluirRegistro(item: UsuarioListagem){
    let me = this;
    me.isLoading = true;

    if (item.isContrato){
      toastr['warning']("Você não pode remover esse usuário, pois ele é o usuário padrão da empresa!");
      me.isLoading = false;
      
    }else{ 
      swal({
        title: "Confirmar exclusão?",
        text: "Excluir o usuário \n" + item.nomeUsuario + "!",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, Excluir!",
        closeOnConfirm: false
      }, function(){

        me._usuarioService.excluir(item.idUsuario).subscribe(
          data =>{
            if (data.IsSucesso){
              swal({title: "Excluído!", text: "Usuário excluído com sucesso.", type: "success"}, function(){
                me.isLoading = false; 
                me.lista.splice(me.lista.indexOf(item), 1);
              });
            }else{
              toastr['error'](data.MensagemRequisicao);
              me.isLoading = false;
            }
          },
          error =>{
            me.isLoading = false;
          });

      });
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
