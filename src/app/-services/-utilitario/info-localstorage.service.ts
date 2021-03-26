import { DateTimeService } from './datetime.service';
import { InfoUsuarioLocalStorage } from './../../-models/-localStorage/InfoUsuarioLocalStorage';
import { TokenUsuarioLocalStorage } from './../../-models/-localStorage/TokenUsuarioLocalStorage';
import { Injectable } from '@angular/core';

@Injectable()
export class InfoLocalstorageService {

  private _nomeTokenUsuario: string ="tokenUsuario";
  private _nomeInfoUsuario: string = "infoUsuario";

  constructor(
    private _dateTimeService: DateTimeService
  ) { }

  obterInformacaoToken(): TokenUsuarioLocalStorage{
    this.verificarExpiracaoToken();
    let tokenUsuario: TokenUsuarioLocalStorage = JSON.parse(localStorage.getItem(this._nomeTokenUsuario));
    if (tokenUsuario){
      tokenUsuario.Found = true;
    }
    return tokenUsuario;
  }
  
  obterInformacaoUsuario(): InfoUsuarioLocalStorage {
    this.verificarExpiracaoToken();
    let infoUsuario: InfoUsuarioLocalStorage = JSON.parse(localStorage.getItem(this._nomeInfoUsuario));
    if (infoUsuario){
      infoUsuario.Found = true;
    }
    return infoUsuario;
  }

  verificarExpiracaoToken(){
    let tokenUsuario: TokenUsuarioLocalStorage = JSON.parse(localStorage.getItem(this._nomeTokenUsuario));
    if (tokenUsuario){
      if (this._dateTimeService.addSeconds(new Date(tokenUsuario.creation_date), tokenUsuario.expires_in) < new Date()){
        this.removerLocalStorage();
      }else{
        tokenUsuario.creation_date = new Date();
        this.setToken(JSON.stringify(tokenUsuario));
      }
    }
  }

  setToken(strToken: string){
    localStorage.setItem(this._nomeTokenUsuario, strToken);
  }
  setInfoUsuario(strInfoUsuario: string){
    localStorage.setItem(this._nomeInfoUsuario, strInfoUsuario);
  }
  removerLocalStorage(){
    localStorage.removeItem(this._nomeTokenUsuario);
    localStorage.removeItem(this._nomeInfoUsuario);
  }

}
