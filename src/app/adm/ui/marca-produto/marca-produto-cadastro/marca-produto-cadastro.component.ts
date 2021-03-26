import { MarcaProdutoService } from './../../../../-services/-marca-produto/-marca-produto.service';
import { MarcaProduto } from './../../../../-models/-marca-produto/MarcaProduto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-marca-produto-cadastro',
  templateUrl: './marca-produto-cadastro.component.html'
})
export class MarcaProdutoCadastroComponent  implements OnInit {
  
    @ViewChild('nomeMarcaProdutoInput') private _nomeMarcaProdutoInput: ElementRef;
    
    operacao: string;
    model: MarcaProduto = new MarcaProduto(); 
    isLoading: boolean = false;
    inscricao: Subscription;
  
    constructor(
      private _marcaProdutoService: MarcaProdutoService,
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
      this._nomeMarcaProdutoInput.nativeElement.focus();
    }
  
    salvar(f) {
      
          this.isLoading = true; 
      
          if (this.operacao == "E") {
            this._marcaProdutoService.atualizar(this.model, this.model.idMarcaProduto).subscribe(
              data => {
                if (data.isSucesso) {
                  this._rota.navigate(['/marcaProduto']);
                  toastr['success']("Informações atualizadas com sucesso da marca " + this.model.nomeMarcaProduto + "!");
                } else {
                  this.isLoading = false;
                  toastr['error'](data.mensagemRequisicao);
                }
              },
              error => {
                this.isLoading = false;
              });
          } else {
            this._marcaProdutoService.cadastrar(this.model).subscribe(
              data => {
                if (data.isSucesso) {
                  this._rota.navigate(['/marcaProduto']);
                  toastr['success']("Marca cadastrada com sucesso!");
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
  