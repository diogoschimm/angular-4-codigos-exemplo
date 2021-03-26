import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { EmpresaService } from './../-services/-empresa/empresa.service';

@Injectable()
export class EmpresaListagemResolver implements Resolve<any> {

     constructor(
          private _empresaService: EmpresaService
     ){}

     resolve(
          route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot
     ): Observable<any> | Promise<any> | any { 
          return this._empresaService.listar();
     }

}