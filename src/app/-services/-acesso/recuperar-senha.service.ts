import { UriService } from './../-utilitario/uri.service';
import { Http, Response  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class RecuperarSenhaService {

  constructor(
    private _http: Http,
    private _uriService: UriService 
  ) { }

  recuperarSenha(p_email:string) { 
    let model = {EmailUsuario: p_email };
    return this._http.put(this._uriService.obterUrlApi() + "/Password/RecuperarSenha", model)
      .map(resp => resp.json());
  }

}
