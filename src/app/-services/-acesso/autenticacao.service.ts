import { BaseService } from './../base.service';
import { Router, CanLoad } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service'; 
import { TokenService } from './../-utilitario/token.service';
import { UriService } from './../-utilitario/uri.service';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 

@Injectable()
export class AutenticacaoService extends BaseService { 

  constructor(
    private _http: Http,
    private _uriService: UriService,
    private _tokenService: TokenService,
    private _infoLocalStorageService: InfoLocalstorageService,
    private _rota: Router
  ) {
    super(_infoLocalStorageService, _rota);
  }

  login(p_username: string, p_password: string){
    //let body = new URLSearchParams();
    //body.set("UserName", p_username);
    //body.set("Password", p_password);
    let body = {"UserName": p_username, "Password": p_password};
 
    return this._http.post(this._uriService.obterUrlApi() + '/jwt/token', body)
    .map((response: Response) => {
      
      let usuario = response.json();      
      if (usuario && usuario.access_token){
        usuario.creation_date = new Date(); 
        this._infoLocalStorageService.setToken(JSON.stringify(usuario));
      }
      return usuario;
    }).catch((e) =>  this.tratarErro(e));
  }
  carregarInformacoesUsuario(){
    return this._http.get(this._uriService.obterUrlApi() + '/Usuario/ObterPorToken', this._tokenService.obterTokenHeader())
    .map((response: Response) =>{
      let usuario = response.json();
 
      if (usuario && usuario.isSucesso){
        this._infoLocalStorageService.setInfoUsuario(JSON.stringify(usuario.objeto));
      }
      return usuario;
    }).catch((e) =>  this.tratarErro(e));
  }

  logout(){
    this._infoLocalStorageService.removerLocalStorage();
  } 
}
