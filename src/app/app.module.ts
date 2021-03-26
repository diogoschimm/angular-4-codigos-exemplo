import { CorreioService } from './-services/-correio/correio.service';
import { CidadeService } from './-services/-cidade/cidade.service';
import { TermoService } from './-services/-termo/termo.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http'; 

import { DateTimeService } from './-services/-utilitario/datetime.service';
import { InfoLocalstorageService } from './-services/-utilitario/info-localstorage.service';
import { RecuperarSenhaService } from './-services/-acesso/recuperar-senha.service';
import { TokenService } from './-services/-utilitario/token.service';
import { HardCodeService } from './-services/-utilitario/hard-code.service';
import { AuthGuard } from './-guards/auth.guard';
import { UriService } from './-services/-utilitario/uri.service';
import { AutenticacaoService } from './-services/-acesso/autenticacao.service';
import { CadastroService } from './-services/-acesso/cadastro.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { EmailEnviadoComponent } from './email-enviado/email-enviado.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TermoViewComponent } from './cadastro/termo/termo-view.component';
import { InputContainerComponent } from './shared/input-container/input-container.component';
import { InputGroupBtnComponent } from './shared/input-group-btn/input-group-btn.component';
import { InputSelectComponent } from './shared/input-select/input-select.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    EmailEnviadoComponent,
    CadastroComponent,
    TermoViewComponent,
    InputContainerComponent,
    InputGroupBtnComponent,
    InputSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule 
  ],
  providers: [
    AutenticacaoService,
    CadastroService,
    UriService,
    AuthGuard,
    HardCodeService,
    TokenService,
    RecuperarSenhaService,
    InfoLocalstorageService,
    DateTimeService,
    TermoService,
    CidadeService,
    CorreioService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
