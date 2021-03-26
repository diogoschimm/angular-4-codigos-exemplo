import { UsuarioPerfilComponent } from './../adm/ui/usuario/usuario-perfil/usuario-perfil.component';
import { CorreioService } from './../-services/-correio/correio.service';
import { Cidade } from './../-models/-cidade/Cidade';
import { CidadeService } from './../-services/-cidade/cidade.service';
import { FormatSelect } from './../-services/-utilitario/format-select';
import { Mascaras } from './../-services/-utilitario/mascaras';
import { FormatCheckBox } from './../-services/-utilitario/format-checkbox';
import { TermoService } from './../-services/-termo/termo.service';
import { ContratoRegistro } from './../-models/-usuario/ContratoRegistro';
import { CadastroService } from './../-services/-acesso/cadastro.service';
import { HardCodeService } from './../-services/-utilitario/hard-code.service';
import { Router } from '@angular/router';  
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  
  @ViewChild('email') private _email: ElementRef;
  @ViewChild('cep') private _cep: ElementRef;
  @ViewChild('endereco') private _endereco: ElementRef;
  @ViewChild('numeroEnd') private _numeroEndereco: ElementRef;
  @ViewChild('complemento') private _complemento: ElementRef;
  @ViewChild('bairroEndereco') private _bairro: ElementRef;
  @ViewChild('uf') private _uf: ElementRef;
  @ViewChild('idCidade') private _idCidade: ElementRef;
  
  ano: number;
  mensagemDireitos: string ="";
  isLoading: boolean = false;
  nomeProjeto: string = "";
  termoPolitica: string = ""
  model: ContratoRegistro;
  ufs: string[]
  cidades: Cidade[]
  
  constructor(
    private _hardCode: HardCodeService,
    private _registrarService: CadastroService,
    private _termoService: TermoService,
    private _cidadeService: CidadeService,
    private _correioService: CorreioService,
    private _rota: Router
  ){
    this.model = new ContratoRegistro()
  }
  
  ngOnInit() {
    this.ano = this._hardCode.ano
    this.mensagemDireitos = this._hardCode.mensagemDireitos
    this.nomeProjeto = this._hardCode.nomeProjeto
    
    FormatCheckBox.formatarCheckBox()
    FormatSelect.formatar()
    Mascaras.aplicar()
    
    this._email.nativeElement.focus();
    this.carregarUFs()
    
    this.model.uf = ''
    this.model.idCidade = 0
    
  }
  
  registrar(){
    this.isLoading = true;
    this.tratarInformacao();
    this._registrarService.registrarUsuario(this.model).subscribe(
      data => {
        if (data.isSucesso) {
          this._rota.navigate(['/login']);
          toastr['success']("Conta de acesso cadastrada com sucesso!");
        } else {
          this.isLoading = false;
          toastr['error'](data.mensagemRequisicao);
        }
      },
      error => {  
        this.isLoading = false;
      }
    );
  }
  private removerMascaras(campo: string): string{
    return campo
    .replace('.','').replace('.','').replace('.','').replace('.','').replace('.','')
    .replace(',','').replace(',','').replace(',','').replace(',','').replace(',','')
    .replace('/','').replace('/','').replace('/','').replace('/','').replace('/','')
    .replace('-','').replace('-','').replace('-','').replace('-','').replace('-','');
  }
  private tratarInformacao(){
    this.model.cpfResponsavel = this.removerMascaras(this.model.cpfResponsavel);
    this.model.cnpj = this.removerMascaras(this.model.cnpj);
    this.model.cep = this.removerMascaras(this.model.cep);
  }
  
  preencherTermoPolitica(){
    this._termoService.obterAtivo().subscribe(
      data => {
        if (data && data.isSucesso){
          this.termoPolitica = data.objeto;
        }
      }
    )
  }
  
  carregarUFs(){
    this._cidadeService.listaUFs().subscribe(
      data => {
        if(data && data.isSucesso){
          this.ufs = data.lista;
        }
      }
    )
  }
  
  carregarCidades(uf: string){
    this._cidadeService.listaPorUF(uf).subscribe(
      data => {
        if(data && data.isSucesso){
          this.cidades = data.lista;
        }
      }
    )
  }
  
  buscarCEP(){
    this.isLoading = true;

    let cep = this.removerMascaras(this._cep.nativeElement.value);
    this._correioService.consultarCEP(cep).subscribe(
      data => {
        this.isLoading = false;
        if(data && data.isSucesso){
                    
          if (data.objeto.complemento){
            this.setValue(this._complemento, data.objeto.complemento)
            this.model.complementoEndereco = data.objeto.complemento
          }
          
          this.setValue(this._endereco, data.objeto.endereco)
          this.setValue(this._bairro, data.objeto.bairro)
          this.setValue(this._uf, data.objeto.uf)
          this.carregarCidades(data.objeto.uf)
          this.setValue(this._idCidade, data.objeto.idCidade)

          this.model.endereco = data.objeto.endereco
          this.model.bairro = data.objeto.bairro
          this.model.uf = data.objeto.uf
          this.model.idCidade = data.objeto.idCidade

          let escopo = this
          setTimeout(function() { escopo._endereco.nativeElement.focus()
            setTimeout(function() { if(data.objeto.complemento){escopo._complemento.nativeElement.focus()}
              setTimeout(function() { escopo._bairro.nativeElement.focus() 
                setTimeout(function() { escopo._uf.nativeElement.focus() 
                  setTimeout(function() { escopo._idCidade.nativeElement.focus() 
                    setTimeout(function() { escopo._numeroEndereco.nativeElement.focus() }, 50)
                  }, 50)
                }, 50)
              }, 50)
            }, 50)
           }, 50)

        } else {
          this.isLoading = false;
          toastr['warning'](data.mensagemRequisicao);
        }
      },
      error => {  
        this.isLoading = false;
      }
    )
  }

  setValue(elemento: ElementRef, valor: any ){
    elemento.nativeElement.value = valor
    elemento.nativeElement.dirty = true
    elemento.nativeElement.touched = true
  }
}
