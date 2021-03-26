import { EmpresaService } from './../../../-services/-empresa/empresa.service';
import { EmpresaListagemResolver } from './../../../-guards/empresa-listagem.resolver';
import { UsuarioService } from './../../../-services/-usuario/usuario.service';
import { UsuarioCadastroResolver } from './usuario-cadastro/usuario-cadastro.resolver';
import { UsuarioListagemResolver } from './usuario-listagem/usuario-listagem.resolver';

import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { PipesModule } from './../../../-pipes/pipes.module';
import { UsuarioComponent } from './usuario.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsuarioRoutingModule,
    PipesModule
  ],
  declarations: [
    UsuarioComponent,
    UsuarioCadastroComponent,
    UsuarioPerfilComponent,
    UsuarioListagemComponent
  ],
  providers: [
    UsuarioListagemResolver,
    UsuarioCadastroResolver,
    UsuarioService,
    EmpresaListagemResolver,
    EmpresaService
  ]
})
export class UsuarioModule { }
