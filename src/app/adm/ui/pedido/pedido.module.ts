import { PedidoListagemResolver } from './pedido-listagem/pedido-listagem.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { PedidoComponent } from './pedido.component';
import { PedidoListagemComponent } from './pedido-listagem/pedido-listagem.component';
import { PedidoService } from '../../../-services/-pedido/pedido.service';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';
import { ItemCadastroComponent } from './pedido-cadastro/item-cadastro/item-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    PedidoRoutingModule
  ],
  declarations: [PedidoComponent, PedidoListagemComponent, PedidoCadastroComponent, ItemCadastroComponent],
  providers: [
    PedidoService,
    PedidoListagemResolver
  ]
})
export class PedidoModule { }
