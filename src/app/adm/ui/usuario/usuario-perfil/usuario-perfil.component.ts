import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';

declare function graficosPerfil(): any;

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html'
})
export class UsuarioPerfilComponent implements OnInit {

  model: any;
  isLoading: boolean = false;
  inscricao: Subscription;

  constructor(
    private _rota: Router,
    private _rotaAtiva: ActivatedRoute
  ) { }

  ngOnInit() {
    graficosPerfil();
    this.isLoading = true;
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any}) =>{
        this.model = info.insc;
        this.isLoading = false;
      });
  } 

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
