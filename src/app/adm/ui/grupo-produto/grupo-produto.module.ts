import { GrupoProdutoService } from './../../../-services/-grupo-produto/-grupo-produto.service';
import { GrupoProdutoListagemResolver } from './grupo-produto-listagem/grupo-produto-listagem.resolver';
import { GrupoProdutoCadastroResolver } from './grupo-produto-cadastro/grupo-produto-cadastro.resolver';
import { GrupoProdutoListagemComponent } from './grupo-produto-listagem/grupo-produto-listagem.component';
import { GrupoProdutoCadastroComponent } from './grupo-produto-cadastro/grupo-produto-cadastro.component';
import { GrupoProdutoComponent } from './grupo-produto.component';
import { PipesModule } from './../../../-pipes/pipes.module';
import { GrupoProdutoRoutingModule } from './grupo-produto-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
     imports: [
          CommonModule,
          FormsModule,
          GrupoProdutoRoutingModule,
          PipesModule
     ],
     declarations: [
          GrupoProdutoComponent,
          GrupoProdutoCadastroComponent,
          GrupoProdutoListagemComponent
     ],
     providers: [
          GrupoProdutoCadastroResolver,
          GrupoProdutoListagemResolver,
          GrupoProdutoService
     ]
})
export class GrupoProdutoModule {}