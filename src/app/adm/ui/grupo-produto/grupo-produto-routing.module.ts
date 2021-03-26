import { GrupoProdutoListagemResolver } from './grupo-produto-listagem/grupo-produto-listagem.resolver';
import { GrupoProdutoCadastroResolver } from './grupo-produto-cadastro/grupo-produto-cadastro.resolver';
import { GrupoProdutoListagemComponent } from './grupo-produto-listagem/grupo-produto-listagem.component';
import { GrupoProdutoCadastroComponent } from './grupo-produto-cadastro/grupo-produto-cadastro.component';
import { GrupoProdutoComponent } from './grupo-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const GRUPO_PRODUTO_ROUTES : Routes =[
     {path: '',
     component: GrupoProdutoComponent,
     children: [ 
          {path: 'novo', component: GrupoProdutoCadastroComponent},
          {path: ':id', redirectTo: ':id/editar'},
          {path: ':id/editar', component: GrupoProdutoCadastroComponent, resolve: {insc: GrupoProdutoCadastroResolver }},
          {path: '', component: GrupoProdutoListagemComponent, resolve: {insc: GrupoProdutoListagemResolver}}
     ]}
];

@NgModule({
     imports: [RouterModule.forChild(GRUPO_PRODUTO_ROUTES)],
     exports: [RouterModule]
})
export class GrupoProdutoRoutingModule{}