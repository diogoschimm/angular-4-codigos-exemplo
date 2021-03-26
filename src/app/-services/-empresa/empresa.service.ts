import { BaseService } from './../base.service';
import { Router } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service';
import { TokenService } from './../-utilitario/token.service';
import { UriService } from './../-utilitario/uri.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmpresaService extends BaseService {
  
  constructor(
    private _http: Http,
    private _uriService: UriService,
    private _tokenService: TokenService,
    private _infoLocalStorageService: InfoLocalstorageService,
    private _rota: Router
  ) { 
    super(_infoLocalStorageService, _rota);
    this._url = this._uriService.obterUrlApi() + "/Empresa";
    this._reqOptions = this._tokenService.obterTokenHeader();
  }

  listar(){ 
    return this._http.get(this._url + "/Listar", this._reqOptions)
    .map(resp => resp.json()).catch(ex => this.tratarErro(ex));
  }  
}
