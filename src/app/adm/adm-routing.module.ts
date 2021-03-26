import { AdmComponent } from './adm.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './../-guards/auth.guard'; 
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const ADM_ROUTES: Routes = [
  { 
    path: '', 
    component: AdmComponent,
    children:[  
      { path: 'usuario',
      loadChildren: 'app/adm/ui/usuario/usuario.module#UsuarioModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: 'produto',
      loadChildren: 'app/adm/ui/produto/produto.module#ProdutoModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: 'departamentoProduto',
      loadChildren: 'app/adm/ui/departamento-produto/departamento-produto.module#DepartamentoProdutoModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: 'grupoProduto',
      loadChildren: 'app/adm/ui/grupo-produto/grupo-produto.module#GrupoProdutoModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: 'marcaProduto',
      loadChildren: 'app/adm/ui/marca-produto/marca-produto.module#MarcaProdutoModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: 'pedido',
      loadChildren: 'app/adm/ui/pedido/pedido.module#PedidoModule',
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]},
      { path: '', component: HomeComponent, canActivate: [AuthGuard]}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ADM_ROUTES)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }