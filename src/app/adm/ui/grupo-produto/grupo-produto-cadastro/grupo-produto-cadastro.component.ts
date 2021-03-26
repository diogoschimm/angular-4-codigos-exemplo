import { ActivatedRoute, Router } from '@angular/router';
import { GrupoProdutoService } from './../../../../-services/-grupo-produto/-grupo-produto.service';
import { Subscription } from 'rxjs/Subscription';
import { GrupoProduto } from './../../../../-models/-grupo-produto/GrupoProduto';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-grupo-produto-cadastro',
  templateUrl: './grupo-produto-cadastro.component.html' 
})
export class GrupoProdutoCadastroComponent  implements OnInit {
  
    @ViewChild('nomeGrupoProdutoInput') private _nomeGrupoProdutoInput: ElementRef;
    
    operacao: string;
    model: GrupoProduto = new GrupoProduto(); 
    isLoading: boolean = false;
    inscricao: Subscription;
  
    constructor(
      private _grupoProdutoService: GrupoProdutoService,
      private _rotaAtiva: ActivatedRoute,
      private _rota: Router
    ) { }
  
    ngOnInit() {
      
      this.operacao = "I";
      
      this.inscricao = this._rotaAtiva.data.subscribe(
        (info: { insc: any }) => {
          if (info.insc) {
            this.model = info.insc.objeto;
            this.operacao = "E"; 
          }  
        });
    }
    
    ngAfterViewInit() {
      this._nomeGrupoProdutoInput.nativeElement.focus();
    }
  
    salvar(f) {
      
          this.isLoading = true; 
      
          if (this.operacao == "E") {
            this._grupoProdutoService.atualizar(this.model, this.model.idGrupoProduto).subscribe(
              data => {
                if (data.isSucesso) {
                  this._rota.navigate(['/grupoProduto']);
                  toastr['success']("Informações atualizadas com sucesso do grupo " + this.model.nomeGrupoProduto + "!");
                } else {
                  this.isLoading = false;
                  toastr['error'](data.mensagemRequisicao);
                }
              },
              error => {
                this.isLoading = false;
              });
          } else {
            this._grupoProdutoService.cadastrar(this.model).subscribe(
              data => {
                if (data.isSucesso) {
                  this._rota.navigate(['/grupoProduto']);
                  toastr['success']("Grupo cadastrado com sucesso!");
                } else {
                  this.isLoading = false;
                  toastr['error'](data.mensagemRequisicao);
                }
              },
              error => {
                this.isLoading = false;
              });
          }
        } 
  }
  