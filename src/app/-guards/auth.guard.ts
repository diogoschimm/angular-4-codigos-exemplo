import { InfoLocalstorageService } from './../-services/-utilitario/info-localstorage.service';
import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(
        private _rota: Router, 
        private _infoLocalStorageService: InfoLocalstorageService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.verificarAcesso();
    }
    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean{
        return this.verificarAcesso();
    }

    private verificarAcesso(){ 
        let tokenUsuario = this._infoLocalStorageService.obterInformacaoToken();
        if (tokenUsuario && tokenUsuario.Found){
            return true;
        }  
        this._rota.navigate(['/login']);
        return false;
    } 

}