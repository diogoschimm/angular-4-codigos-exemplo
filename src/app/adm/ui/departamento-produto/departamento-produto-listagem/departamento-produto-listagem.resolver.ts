import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DepartamentoProdutoService } from './../../../../-services/-departamento-produto/-departamento-produto.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DepartamentoProdutoListagemResolver implements Resolve<any>{
     
     constructor(
          private _departamentoProdutoService: DepartamentoProdutoService
     ){}
     
     resolve(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
     ): Observable<any> | Promise<any> | any{ 
          return this._departamentoProdutoService.listarPorContrato(); 
     }
}