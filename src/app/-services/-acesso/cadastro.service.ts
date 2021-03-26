import { ContratoRegistro } from './../../-models/-usuario/ContratoRegistro';
import { UriService } from './../-utilitario/uri.service';
import { Http, Response  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 

@Injectable()
export class CadastroService {

    constructor(
      private _http: Http,
      private _uriService: UriService
    ) { }

    registrarUsuario(model: ContratoRegistro) { 
      return this._http.post(this._uriService.obterUrlApi() + "/Contrato/Cadastrar", model)
        .map(resp => resp.json());
    }
}
