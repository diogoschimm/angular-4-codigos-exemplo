import { Injectable } from '@angular/core';

@Injectable()
export class UriService {
 
  private url: string = "http://localhost:1911";
  private urlApi: string = this.url + '/api'

  constructor() { }

  obterUrl(){
    return this.url;
  }
  obterUrlApi(){
    return this.urlApi;
  }
}
