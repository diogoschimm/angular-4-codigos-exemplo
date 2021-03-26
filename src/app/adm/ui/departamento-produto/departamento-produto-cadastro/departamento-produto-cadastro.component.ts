import { DepartamentoProdutoService } from './../../../../-services/-departamento-produto/-departamento-produto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DepartamentoProduto } from './../../../../-models/-departamento-produto/DepartamentoProduto';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-departamento-produto-cadastro',
  templateUrl: './departamento-produto-cadastro.component.html' 
})
export class DepartamentoProdutoCadastroComponent implements OnInit {

  @ViewChild('nomeDepartamentoProdutoInput') private _nomeDepartamentoProdutoInput: ElementRef;
  
  operacao: string;
  model: DepartamentoProduto = new DepartamentoProduto(); 
  isLoading: boolean = false;
  inscricao: Subscription;

  constructor(
    private _departamentoProdutoService: DepartamentoProdutoService,
    private _rotaAtiva: ActivatedRoute,
    private _rota: Router
  ) { }

  ngOnInit() {
    
    this.operacao = "I";
    
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: { insc: any, inscEmpresa: any }) => {
        if (info.insc) {
          this.model = info.insc.objeto;
          this.operacao = "E"; 
        }  
      });
  }
  
  ngAfterViewInit() {
    this._nomeDepartamentoProdutoInput.nativeElement.focus();
  }

  salvar(f) {
    
        this.isLoading = true; 
    
        if (this.operacao == "E") {
          this._departamentoProdutoService.atualizar(this.model, this.model.idDepartamentoProduto).subscribe(
            data => {
              if (data.isSucesso) {
                this._rota.navigate(['/departamentoProduto']);
                toastr['success']("Informações atualizadas com sucesso do departamento " + this.model.nomeDepartamentoProduto + "!");
              } else {
                this.isLoading = false;
                toastr['error'](data.mensagemRequisicao);
              }
            },
            error => {
              this.isLoading = false;
            });
        } else {
          this._departamentoProdutoService.cadastrar(this.model).subscribe(
            data => {
              if (data.isSucesso) {
                this._rota.navigate(['/departamentoProduto']);
                toastr['success']("Departamento cadastrado com sucesso!");
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
