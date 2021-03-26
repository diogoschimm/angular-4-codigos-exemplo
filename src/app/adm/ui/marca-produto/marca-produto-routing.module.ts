import { MarcaProdutoListagemResolver } from './marca-produto-listagem/marca-produto-listagem.resolver';
import { MarcaProdutoCadastroResolver } from './marca-produto-cadastro/marca-produto-cadastro.resolver';
import { MarcaProdutoListagemComponent } from './marca-produto-listagem/marca-produto-listagem.component';
import { MarcaProdutoCadastroComponent } from './marca-produto-cadastro/marca-produto-cadastro.component';
import { MarcaProdutoComponent } from './marca-produto.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const MARCA_PRODUTO_ROUTES: Routes = [
     {path: '',
     component: MarcaProdutoComponent,
     children:[
          {path: 'novo', component: MarcaProdutoCadastroComponent},
          {path: ':id', redirectTo: ':id/editar'},
          {path: ':id/editar', component: MarcaProdutoCadastroComponent, resolve: {insc: MarcaProdutoCadastroResolver }},
          {path: '', component: MarcaProdutoListagemComponent, resolve: {insc: MarcaProdutoListagemResolver}}

     ]}
];

@NgModule({
     imports: [RouterModule.forChild(MARCA_PRODUTO_ROUTES)],
     exports: [RouterModule]
})
export class MarcaProdutoRoutingModule{}