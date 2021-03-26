import { Observable } from 'rxjs/Rx';
import { MarcaProdutoService } from './../../../../-services/-marca-produto/-marca-produto.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class MarcaProdutoCadastroResolver implements Resolve<any> {
     
     constructor (private _marcaProdutoService: MarcaProdutoService){}
     
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | Promise<any> | any {
          let id = route.params["id"];
          return this._marcaProdutoService.obterPorId(id);
     }      
}