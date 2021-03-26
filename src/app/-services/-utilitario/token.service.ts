import { TokenUsuarioLocalStorage } from './../../-models/-localStorage/TokenUsuarioLocalStorage';
import { InfoLocalstorageService } from './info-localstorage.service';
import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor(
    private _infoLocalStorageService: InfoLocalstorageService
  ) { }

  obterTokenHeader(){
    
    let tokenUsuario: TokenUsuarioLocalStorage = this._infoLocalStorageService.obterInformacaoToken();
    if (tokenUsuario && tokenUsuario.Found){
      let headers = new Headers({"Authorization":  "bearer " + tokenUsuario.access_token});
      return new RequestOptions({headers: headers});
    }
    return null;
  }  
}
