import { UsuarioCadastro } from './../../../../-models/-usuario/UsuarioCadastro';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../../../../-services/-usuario/usuario.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html'
})
export class UsuarioCadastroComponent implements OnInit {

  @ViewChild('nomeUsuarioInput') private _nomeUsuarioInput: ElementRef;

  operacao: string;
  model: UsuarioCadastro = new UsuarioCadastro();
  empresas: any[] = [];
  isLoading: boolean = false;
  inscricao: Subscription;

  constructor(
    private _usuarioService: UsuarioService,
    private _rotaAtiva: ActivatedRoute,
    private _rota: Router
  ) { }

  ngOnInit() {

    this.operacao = "I";
    this.model.idEmpresa = 0;

    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: { insc: any, inscEmpresa: any }) => {
        if (info.insc) {
          this.model = info.insc.objeto;
          this.operacao = "E";

          if (!this.model.idEmpresa) {
            this.model.idEmpresa = 0;
          }
        } 
        this.empresas = info.inscEmpresa.lista;
      });
  }

  ngAfterViewInit() {
    this._nomeUsuarioInput.nativeElement.focus();
  }

  salvar(f) {

    this.isLoading = true;
    this.tratarInformacoes();

    if (this.operacao == "E") {
      this._usuarioService.atualizar(this.model, this.model.idUsuario).subscribe(
        data => {
          if (data.isSucesso) {
            this._rota.navigate(['/usuario']);
            toastr['success']("Informações atualizadas com sucesso do usuário " + this.model.nomeUsuario + "!");
          } else {
            this.isLoading = false;
            toastr['error'](data.mensagemRequisicao);
          }
        },
        error => {
          this.isLoading = false;
        });
    } else {
      this._usuarioService.cadastrar(this.model).subscribe(
        data => {
          if (data.isSucesso) {
            this._rota.navigate(['/usuario']);
            toastr['success']("Usuário cadastrado com sucesso!");
          } else {
            this.isLoading = false;
            toastr['error'](data.mensagemRequisicao);
          }
        },
        error => {
          this.isLoading = false;
        });
    }
  }

  private tratarInformacoes() {
    if (this.model.idEmpresa == 0) {
      this.model.idEmpresa = null;
    }
  }

}
