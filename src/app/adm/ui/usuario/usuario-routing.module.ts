import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';

import { UsuarioCadastroResolver } from './usuario-cadastro/usuario-cadastro.resolver';
import { UsuarioListagemResolver } from './usuario-listagem/usuario-listagem.resolver';
import { UsuarioComponent } from './usuario.component';
import { EmpresaListagemResolver } from './../../../-guards/empresa-listagem.resolver';
 
const USUARIO_ROUTES: Routes = [
     {path: '',
      component: UsuarioComponent, 
      children: [
            {path: 'novo', component: UsuarioCadastroComponent},
            {path: ':id', component: UsuarioPerfilComponent, resolve: {insc: UsuarioCadastroResolver, inscEmpresa: EmpresaListagemResolver }},
            {path: ':id/editar', component: UsuarioCadastroComponent, resolve: {insc: UsuarioCadastroResolver, inscEmpresa: EmpresaListagemResolver }},
            {path: '', component: UsuarioListagemComponent, resolve: {insc: UsuarioListagemResolver}}
      ]}
];

@NgModule({
     imports: [RouterModule.forChild(USUARIO_ROUTES)],
     exports: [RouterModule]
})
export class UsuarioRoutingModule { }