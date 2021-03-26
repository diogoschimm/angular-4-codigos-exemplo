import { DepartamentoProdutoListagemResolver } from './departamento-produto-listagem/departamento-produto-listagem.resolver';
import { DepartamentoProdutoCadastroResolver } from './departamento-produto-cadastro/departamento-produto-cadastro.resolver';
import { DepartamentoProdutoService } from './../../../-services/-departamento-produto/-departamento-produto.service';
import { DepartamentoProdutoComponent } from './departamento-produto.component';
import { PipesModule } from './../../../-pipes/pipes.module';
import { DepartamentoProdutoRoutingModule } from './departamento-produto-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoProdutoCadastroComponent } from './departamento-produto-cadastro/departamento-produto-cadastro.component';
import { DepartamentoProdutoListagemComponent } from './departamento-produto-listagem/departamento-produto-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DepartamentoProdutoRoutingModule,
    PipesModule
  ],
  declarations: [
    DepartamentoProdutoComponent,
    DepartamentoProdutoCadastroComponent,
    DepartamentoProdutoListagemComponent
  ],
  providers:[
    DepartamentoProdutoService,
    DepartamentoProdutoCadastroResolver,
    DepartamentoProdutoListagemResolver
  ]
})
export class DepartamentoProdutoModule { }
