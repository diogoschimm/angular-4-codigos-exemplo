import { MarcaProdutoListagemResolver } from './marca-produto-listagem/marca-produto-listagem.resolver';
import { MarcaProdutoCadastroResolver } from './marca-produto-cadastro/marca-produto-cadastro.resolver';
import { MarcaProdutoService } from './../../../-services/-marca-produto/-marca-produto.service';
import { MarcaProdutoComponent } from './marca-produto.component';
import { PipesModule } from './../../../-pipes/pipes.module';
import { MarcaProdutoRoutingModule } from './marca-produto-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaProdutoCadastroComponent } from './marca-produto-cadastro/marca-produto-cadastro.component';
import { MarcaProdutoListagemComponent } from './marca-produto-listagem/marca-produto-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarcaProdutoRoutingModule,
    PipesModule
  ],
  declarations: [
    MarcaProdutoComponent,
    MarcaProdutoCadastroComponent,
    MarcaProdutoListagemComponent
  ],
  providers: [
    MarcaProdutoCadastroResolver,
    MarcaProdutoListagemResolver,
    MarcaProdutoService
  ]
})
export class MarcaProdutoModule { }
