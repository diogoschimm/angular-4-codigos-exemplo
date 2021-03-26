import { DepartamentoProdutoCadastroResolver } from './departamento-produto-cadastro/departamento-produto-cadastro.resolver';
import { DepartamentoProdutoListagemResolver } from './departamento-produto-listagem/departamento-produto-listagem.resolver';
import { DepartamentoProdutoListagemComponent } from './departamento-produto-listagem/departamento-produto-listagem.component';
import { DepartamentoProdutoCadastroComponent } from './departamento-produto-cadastro/departamento-produto-cadastro.component';
import { DepartamentoProdutoComponent } from './departamento-produto.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const DEPARTAMENTO_PRODUTO_ROUTES: Routes = [
     {
          path: '',
          component: DepartamentoProdutoComponent,
          children:[
               {path: 'novo', component: DepartamentoProdutoCadastroComponent}, 
               {path: ':id/editar', component: DepartamentoProdutoCadastroComponent, resolve: {insc: DepartamentoProdutoCadastroResolver}},
               {path: '', component: DepartamentoProdutoListagemComponent, resolve: {insc: DepartamentoProdutoListagemResolver}}
          ]
     }
];

@NgModule({
     imports: [RouterModule.forChild(DEPARTAMENTO_PRODUTO_ROUTES)],
     exports: [RouterModule]
})
export class DepartamentoProdutoRoutingModule { }