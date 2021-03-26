import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoComponent } from './pedido.component';
import { PedidoListagemComponent } from './pedido-listagem/pedido-listagem.component';
import { PedidoListagemResolver } from './pedido-listagem/pedido-listagem.resolver';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';

const PEDIDO_ROUTES: Routes = [{
    path:'',
    component: PedidoComponent,
    children: [
      {path: 'novo', component: PedidoCadastroComponent},
      {path: '', component: PedidoListagemComponent, resolve: {insc: PedidoListagemResolver}}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(PEDIDO_ROUTES)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
