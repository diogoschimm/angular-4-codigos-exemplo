import { ProdutoService } from './../../../../-services/-produto/produto.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable() 
export class ProdutoListagemResolver implements Resolve<any> {
     
     constructor (
          private _produtoService: ProdutoService 
     ){}
     
     resolve(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
     ) : Observable<any> | Promise<any> | any { 
          return this._produtoService.listarPorContrato();
     } 
}