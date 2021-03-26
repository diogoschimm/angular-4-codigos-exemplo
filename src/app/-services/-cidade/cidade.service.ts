import { Router } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service';
import { TokenService } from './../-utilitario/token.service';
import { UriService } from './../-utilitario/uri.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from './../base.service';

@Injectable()
export class CidadeService extends BaseService{

    constructor(
        private _http: Http,
        private _uriService: UriService,
        private _tokenService: TokenService,
        private _infoLocalStorageService: InfoLocalstorageService,
        _rota: Router
    ){
        super(_infoLocalStorageService, _rota)
        this._url = _uriService.obterUrlApi() + "/Cidade"
        this._reqOptions = _tokenService.obterTokenHeader()
    }

    listaUFs(){
        return this._http.get(this._url + "/ListarUFs", this._reqOptions)
            .map(resp => resp.json())
            .catch(ex => this.tratarErro(ex))
    }

    listaPorUF(uf: string){
        return this._http.get(this._url + "/ListarPorUF/" + uf, this._reqOptions)
            .map(resp => resp.json())
            .catch(ex => this.tratarErro(ex))
    }

}