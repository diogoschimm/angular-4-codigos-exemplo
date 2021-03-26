import { Observable } from 'rxjs/Rx';
import { UsuarioService } from './../../../../-services/-usuario/usuario.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioCadastroResolver implements Resolve<any> {
     
     constructor(
          private _usuarioService: UsuarioService
     ){}

     resolve(
          route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot
     ): Observable<any> | Promise<any> | any {
          let idUsuario = route.params['id'];
          return this._usuarioService.obterPorId(idUsuario);
     }
}