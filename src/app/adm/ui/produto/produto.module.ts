import { GrupoProdutoService } from './../../../-services/-grupo-produto/-grupo-produto.service';
import { MarcaProdutoService } from './../../../-services/-marca-produto/-marca-produto.service';
import { DepartamentoProdutoService } from './../../../-services/-departamento-produto/-departamento-produto.service';
import { MarcaProdutoListagemResolver } from './../marca-produto/marca-produto-listagem/marca-produto-listagem.resolver';
import { GrupoProdutoListagemResolver } from './../grupo-produto/grupo-produto-listagem/grupo-produto-listagem.resolver';
import { DepartamentoProdutoListagemResolver } from './../departamento-produto/departamento-produto-listagem/departamento-produto-listagem.resolver';
import { ProdutoService } from './../../../-services/-produto/produto.service';
import { ProdutoComponent } from './produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoListagemResolver } from './produto-listagem/produto-listagem.resolver';
import { ProdutoCadastroResolver } from './produto-cadastro/produto-cadastro.resolver';
import { PipesModule } from './../../../-pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoListagemComponent } from './produto-listagem/produto-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProdutoRoutingModule,
    PipesModule
  ],
  declarations: [
    ProdutoComponent,
    ProdutoCadastroComponent, 
    ProdutoListagemComponent
  ],
  providers: [
    ProdutoCadastroResolver,
    ProdutoListagemResolver,
    ProdutoService,
    DepartamentoProdutoListagemResolver,
    GrupoProdutoListagemResolver,
    MarcaProdutoListagemResolver,
    DepartamentoProdutoService,
    MarcaProdutoService,
    GrupoProdutoService
  ]
})
export class ProdutoModule { }
