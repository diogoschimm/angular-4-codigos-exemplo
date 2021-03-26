import { DepartamentoProdutoService } from './../../../../-services/-departamento-produto/-departamento-produto.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class DepartamentoProdutoCadastroResolver implements Resolve<any>{
     
     constructor( private _departamentoProdutoService: DepartamentoProdutoService ){ }
     
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | Promise<any> | any {
          let idDepartamentoProduto = route.params['id'];
          return this._departamentoProdutoService.obterPorId(idDepartamentoProduto);
     }
}