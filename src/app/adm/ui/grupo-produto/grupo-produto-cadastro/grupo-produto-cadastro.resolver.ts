import { Observable } from 'rxjs/Rx';
import { GrupoProdutoService } from './../../../../-services/-grupo-produto/-grupo-produto.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class GrupoProdutoCadastroResolver implements Resolve<any> {
     
     constructor (
          private _grupoProdutoService: GrupoProdutoService 
     ){}
     
     resolve(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
     ) : Observable<any> | Promise<any> | any {
          let id = route.params["id"];
          return this._grupoProdutoService.obterPorId(id);
     }      
}