import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PedidoService } from '../../../../-services/-pedido/pedido.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PedidoListagemResolver implements Resolve<any> {

    constructor(
        private _pedidoService: PedidoService        
    ){}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._pedidoService.listarPorContrato()
    }

}