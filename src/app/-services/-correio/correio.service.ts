import { Router } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service';
import { TokenService } from './../-utilitario/token.service';
import { UriService } from './../-utilitario/uri.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from './../base.service';

@Injectable()
export class CorreioService extends BaseService{

    constructor(
        private _http: Http,
        private _uriService: UriService,
        private _tokenService: TokenService,
        private _infoLocalStorageService: InfoLocalstorageService,
        private _rota: Router
    ){
        super(_infoLocalStorageService, _rota)
        this._url = _uriService.obterUrlApi() + "/Correio"
        this._reqOptions = _tokenService.obterTokenHeader()
    }

    consultarCEP(cep: string){
        return this._http.get(this._url + "/ConsultarCEP/" + cep, this._reqOptions)
            .map(resp => resp.json())
            .catch(ex => this.tratarErro(ex))
    }

}