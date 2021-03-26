import { Router } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service';
import { TokenService } from './../-utilitario/token.service';
import { UriService } from './../-utilitario/uri.service';
import { Http } from '@angular/http';
import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MarcaProdutoService extends BaseService {
     
     constructor(
          private _http: Http,
          private _uriService: UriService,
          private _tokenService: TokenService,
          private _infoLocalStorageService: InfoLocalstorageService,
          private _rota: Router
     ) { 
          super(_infoLocalStorageService, _rota);
          this._url = this._uriService.obterUrlApi() + "/MarcaProduto";
          this._reqOptions = this._tokenService.obterTokenHeader();
     }
     
     listarPorContrato(){ 
          return this._http.get(this._url + "/ListarPorContrato", this._reqOptions)
          .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
     } 
     
     obterPorId(id: number){ 
          return this._http.get(this._url + "/Obter/" + id, this._reqOptions)
          .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
     } 
     
     cadastrar(model: any){
          return this._http.post(this._url + "/Cadastrar", model, this._reqOptions)
          .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
     }
     
     atualizar(model: any, id: any){
          return this._http.put(this._url + "/Atualizar/" + id, model, this._reqOptions)
          .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
     }
     
     excluir(id: number){
          return this._http.delete(this._url + "/Excluir/" + id, this._reqOptions)
          .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
     }  
}
