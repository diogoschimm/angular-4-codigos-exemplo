import { PedidoService } from './../../../../-services/-pedido/pedido.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable() 
export class PedidoCadastroResolver implements Resolve<any> {
     
     constructor (private _pedidoService: PedidoService){}
     
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | Promise<any> | any {
          let id = route.params["id"];
          return this._pedidoService.obterPorId(id);
     }      
}