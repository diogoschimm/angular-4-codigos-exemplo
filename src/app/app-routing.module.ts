import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailEnviadoComponent } from './email-enviado/email-enviado.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component'

import { AuthGuard } from './-guards/auth.guard';


const ROTAS: Routes = [
  { path: 'adm', 
    loadChildren: 'app/adm/adm.module#AdmModule' , 
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperarsenha', component: RecuperarSenhaComponent },
  { path: 'emailenviado', component: EmailEnviadoComponent },
  { path: '', redirectTo: 'adm', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(ROTAS)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
