import { Router } from '@angular/router';
import { InfoLocalstorageService } from './-utilitario/info-localstorage.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

declare var toastr: any;

@Injectable() 
export class BaseService{ 

    protected _url: string = "";
    protected _reqOptions: RequestOptions;
    
     constructor(
         private _infoLocalStorageServiceBase: InfoLocalstorageService,
         private _rotaBase: Router
     ){}

     protected tratarErro(e: Response | any){
          let erros: string[] = [];
          console.log(e);
          switch(e.status){
               case 400: 
                    toastr['error'](JSON.parse(e._body).error_description);
                    break; 
               case 401:  
                    console.log(e);
                    toastr['error'](e.statusText + ": É necessário logar novamente"); 
                    this._infoLocalStorageServiceBase.removerLocalStorage();
                    this._rotaBase.navigate(['/login']);
                    break;
          }
          return Observable.throw(new Error(e.status));
     }
}