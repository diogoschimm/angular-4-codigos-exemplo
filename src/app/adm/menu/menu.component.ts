import { InfoUsuarioLocalStorage } from './../../-models/-localStorage/InfoUsuarioLocalStorage';
import { InfoLocalstorageService } from './../../-services/-utilitario/info-localstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  infoUsuario: InfoUsuarioLocalStorage; 
  
  constructor(
    private _infoLocalStorageService: InfoLocalstorageService
  ) { 
    this.infoUsuario = this._infoLocalStorageService.obterInformacaoUsuario();
  }

  ngOnInit() {
  } 

}
