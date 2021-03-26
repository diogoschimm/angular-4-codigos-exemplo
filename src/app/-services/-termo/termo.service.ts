import { TokenService } from './../-utilitario/token.service';
import { Router } from '@angular/router';
import { InfoLocalstorageService } from './../-utilitario/info-localstorage.service';
import { UriService } from './../-utilitario/uri.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core'
import { BaseService } from './../base.service'

@Injectable()
export class TermoService extends BaseService{

    constructor(
        private _http: Http,
        private _uriService: UriService,
        private _tokenService: TokenService,
        private _infoLocalStorageService: InfoLocalstorageService,
        private _rota: Router
    ){
        super(_infoLocalStorageService, _rota)
        this._url = this._uriService.obterUrlApi() + "/Termo"
        this._reqOptions = this._tokenService.obterTokenHeader()
    }

    obterAtivo(){
        return this._http.get(this._url + "/ObterAtivo", this._reqOptions)
        .map(resp => resp.json()).catch(ex => this.tratarErro(ex))
    }

}