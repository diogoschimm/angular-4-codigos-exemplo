import { UsuarioService } from './../../../../-services/-usuario/usuario.service';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UsuarioListagemResolver implements Resolve<any>{

     constructor(
          private _usuarioService: UsuarioService
     ){}

     resolve(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
     ): Observable<any> | Promise<any> | any{ 
          return this._usuarioService.listarPorContrato(); 
     }

}