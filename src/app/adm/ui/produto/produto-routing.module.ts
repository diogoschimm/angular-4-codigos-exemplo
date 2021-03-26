import { MarcaProdutoListagemResolver } from './../marca-produto/marca-produto-listagem/marca-produto-listagem.resolver';
import { GrupoProdutoListagemResolver } from './../grupo-produto/grupo-produto-listagem/grupo-produto-listagem.resolver';
import { DepartamentoProdutoListagemResolver } from './../departamento-produto/departamento-produto-listagem/departamento-produto-listagem.resolver';
import { ProdutoListagemResolver } from './produto-listagem/produto-listagem.resolver';
import { ProdutoCadastroResolver } from './produto-cadastro/produto-cadastro.resolver';
import { ProdutoListagemComponent } from './produto-listagem/produto-listagem.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoComponent } from './produto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
  
 
const PRODUTO_ROUTES: Routes = [
     {path: '',
      component: ProdutoComponent, 
      children: [{
            path: 'novo', 
            component: ProdutoCadastroComponent, 
            resolve: {
                  inscDepartamento: DepartamentoProdutoListagemResolver, 
                  inscGrupo: GrupoProdutoListagemResolver,
                  inscMarca: MarcaProdutoListagemResolver }
            },
            {path: ':id', redirectTo: ':id/editar'},
            {
                  path: ':id/editar', 
                  component: ProdutoCadastroComponent, 
                  resolve: {
                        insc: ProdutoCadastroResolver,
                        inscDepartamento: DepartamentoProdutoListagemResolver, 
                        inscGrupo: GrupoProdutoListagemResolver,
                        inscMarca: MarcaProdutoListagemResolver }
                  },
            {path: '', component: ProdutoListagemComponent, resolve: {insc: ProdutoListagemResolver}}
      ]}
];

@NgModule({
     imports: [RouterModule.forChild(PRODUTO_ROUTES)],
     exports: [RouterModule]
})
export class ProdutoRoutingModule { }