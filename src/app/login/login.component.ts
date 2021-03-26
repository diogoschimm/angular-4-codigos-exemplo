import { HardCodeService } from './../-services/-utilitario/hard-code.service';
import { AutenticacaoService } from './../-services/-acesso/autenticacao.service';
import { AppComponent } from './../app.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var toastr: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @ViewChild('userName') private _userName: ElementRef;

  ano: number;
  mensagemDireitos: string ="";
  nomeProjeto: string ="";
  isLoading: boolean = false;
  model: any = {
    username: '',
    password: ''
  };

  private _urlRetorno: string;

  constructor(
    private _rotaAtiva: ActivatedRoute,
    private _rota: Router, 
    private _autenticacaoService: AutenticacaoService,
    private _hardCode: HardCodeService,
    private _appComponent: AppComponent
  ) {
    this.ano = _hardCode.ano;
    this.mensagemDireitos = _hardCode.mensagemDireitos;
    this.nomeProjeto = _hardCode.nomeProjeto;
    this._appComponent.setClassePadrao();
  }

  ngOnInit() {
    this._autenticacaoService.logout();
    this._urlRetorno = this._rotaAtiva.queryParams["urlRetorno"] || "/adm";
    this._userName.nativeElement.focus();
  }

  efetuarLogin(){
    this.isLoading = true;
    this._autenticacaoService.login(this.model.username, this.model.password).subscribe(
      data =>{ 

        this._autenticacaoService.carregarInformacoesUsuario().subscribe(
          data =>{
            this._rota.navigate([this._urlRetorno]); 
          },
          error => { 
            this.isLoading = false;
            this._autenticacaoService.logout();
          });
      },
      error =>{
        this.isLoading = false;
        this._autenticacaoService.logout();
      })
  }
}
