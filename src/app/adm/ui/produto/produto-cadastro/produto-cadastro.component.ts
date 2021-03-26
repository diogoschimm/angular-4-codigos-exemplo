import { ProdutoDescontoAtacado } from './../../../../-models/-produto/ProdutoDescontoAtacado';
import { FormatTooltip } from './../../../../-services/-utilitario/format-tooltip';
import { MarcaProduto } from './../../../../-models/-marca-produto/MarcaProduto';
import { DepartamentoProduto } from './../../../../-models/-departamento-produto/DepartamentoProduto';
import { GrupoProduto } from './../../../../-models/-grupo-produto/GrupoProduto';
import { ProdutoService } from './../../../../-services/-produto/produto.service';
import { ProdutoCadastro } from './../../../../-models/-produto/ProdutoCadastro';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html'
})
export class ProdutoCadastroComponent implements OnInit {
  
  @ViewChild('codigoBarraInput') private _codigoBarraInput: ElementRef;
  @ViewChild('percentualAquisicaoInput') private _percentualAquisicaoInput: ElementRef;
  @ViewChild('valorVendaInput') private _valorVendaInput: ElementRef;
  
  operacao: string;
  model: ProdutoCadastro = new ProdutoCadastro();
  isLoading: boolean = false;
  inscricao: Subscription;
  
  listaDepartamentoProduto: DepartamentoProduto[] = [];
  listaGrupoProduto: GrupoProduto[] = [];
  listaSubGrupoProduto = [];
  listaMarcaProduto: MarcaProduto[] = [];
  
  constructor( 
    private _produtoService: ProdutoService,
    private _rotaAtiva: ActivatedRoute,
    private _rota: Router
  ) { }
  
  ngOnInit() {
    this.operacao = "I"; 
    this.limparCampos();
    this.inscricao = this._rotaAtiva.data.subscribe(
      (info: {insc: any, inscDepartamento: any, inscGrupo: any, inscMarca: any}) =>{
        if (info.insc){
          this.model = info.insc.objeto;
          this.operacao = 'E';
          
          console.log(this.model);
          
          if (!this.model.listaProdutoDescontoAtacado || this.model.listaProdutoDescontoAtacado == null){
            this.model.listaProdutoDescontoAtacado = [];
          }
          
          if (!this.model.idDepartamentoProduto){
            this.model.idDepartamentoProduto = 0;
          }
          
          this.model.ultimoValorCompra = this.formatarDecimal( this.model.ultimoValorCompra.toString().replace('.',','));
          this.model.valorVenda = this.formatarDecimal( this.model.valorVenda.toString().replace('.',','));
          
          this.model.listaProdutoDescontoAtacado.forEach(function(el){
            el.qtdProduto = el.qtdProduto.toString();
            el.descontoProduto = el.descontoProduto.toString();
          });
          
          this.preencherPercentualAquisicao(); 
        }
        
        this.listaDepartamentoProduto = info.inscDepartamento.lista.sort(this.ordenacaoListagemDepartamento);
        this.listaGrupoProduto = info.inscGrupo.lista.sort(this.ordenacaoListagemGrupoProduto);
        this.listaSubGrupoProduto = [];
        this.listaMarcaProduto = info.inscMarca.lista.sort(this.ordenacaoListagemMarcaProduto);
        
      });
      
      FormatTooltip.formatar();
    }
    
    private formatarDecimal(valor: string): string{
      let valores = valor.split(',');
      let r: string = "";
      
      if (valor.indexOf(",") == -1){
        r = valor + ",00";
        return r;
      }
      if (valores[1].length == 0){
        r = valor + '00';
        return r;
      }
      if (valores[1].length == 1){
        r = valor + '0';
        return r;
      }
      return valor;
    }
    
    ordenacaoListagemDepartamento(a:DepartamentoProduto, b: DepartamentoProduto){
      if (a.nomeDepartamentoProduto < b.nomeDepartamentoProduto) { return -1; }
      if (a.nomeDepartamentoProduto > b.nomeDepartamentoProduto) { return 1; }
      return 0;
    }
    ordenacaoListagemGrupoProduto(a:GrupoProduto, b: GrupoProduto){
      if (a.nomeGrupoProduto < b.nomeGrupoProduto) { return -1; }
      if (a.nomeGrupoProduto > b.nomeGrupoProduto) { return 1; }
      return 0;
    }
    ordenacaoListagemMarcaProduto(a:MarcaProduto, b: MarcaProduto){
      if (a.nomeMarcaProduto < b.nomeMarcaProduto) { return -1; }
      if (a.nomeMarcaProduto > b.nomeMarcaProduto) { return 1; }
      return 0;
    }
    
    limparCampos(){
      this.model.codigoBarra = "";
      this.model.nomeProduto ="";
      this.model.statusProduto = "A";
      this.model.ultimoValorCompra = "0";
      this.model.valorVenda = "0";
      this.model.qtdEstoque = 0;
      this.model.percentualICMS = 0;
      this.model.percentualIPI = 0;
      this.model.percentualFrete = 0;
      this.model.percentualOperacao = 0;
      this.model.percentualAquisicao = "0"; 
      this.tratarDDL();
    }
    tratarDDL(){
      if (this.model.idDepartamentoProduto == null){
        this.model.idDepartamentoProduto = 0;
      }
      if (this.model.idGrupoProduto == null){
        this.model.idGrupoProduto = 0;
      }
      if (this.model.idSubGrupoProduto == null){
        this.model.idSubGrupoProduto = 0;
      }
      if (this.model.idMarcaProduto ==null){
        this.model.idMarcaProduto = 0;
      }
    }
    tv(n:number): number {
      let v:number = n;
      return (v || 0);
    }
    obterPrecoCusto(): number{ 
      return this.tv(parseFloat(this.model.ultimoValorCompra.replace(',', '.')));
    }
    obterICMS(): number{ 
      return parseFloat((this.obterPrecoCusto() * (this.tv(this.model.percentualICMS) / 100.00)).toString());
    }
    obterIPI():number{ 
      return parseFloat((this.obterPrecoCusto() * (this.tv(this.model.percentualIPI) / 100.00)).toString());
    }
    obterFrete(){ 
      return parseFloat((this.obterPrecoCusto() * (this.tv(this.model.percentualFrete) / 100.00)).toString());
    }
    obterOperacao(){ 
      return parseFloat((this.obterPrecoCusto() * (this.tv(this.model.percentualOperacao) / 100.00)).toString());
    }
    obterPrecoCustoFinal(){ 
      
      let v =  this.obterPrecoCusto();
      let icms = this.obterICMS();
      let ipi = this.obterIPI();
      let frete = this.obterFrete();
      let ope = this.obterOperacao();
      return parseFloat((v + icms + ipi + frete + ope).toFixed(2));
    }
    obterTotalPercentual(): number{ 
      let icms:number = parseFloat(this.model.percentualICMS.toString());
      let ipi:number = parseFloat(this.model.percentualIPI.toString());
      let frete:number = parseFloat( this.model.percentualFrete.toString());
      let ope:number = parseFloat(this.model.percentualOperacao.toString()); 
      
      let total:number = (icms + ipi + frete + ope);
      
      return total;
    }
    obterTotalValor(): number{
      return parseFloat((this.obterPrecoCusto() * (this.obterTotalPercentual() / 100.00)).toString());
    }
    obterPercentualVenda(): number{
      let valorCustoTotal:number = this.obterPrecoCustoFinal();
      let valorFinalVenda:number = parseFloat( this.model.valorVenda.replace(',','.'));
      
      return (valorFinalVenda / valorCustoTotal) * 100.00;
    }
    naoPossuiLucroAquisicao(){
      let valorCustoTotal = this.obterPrecoCustoFinal();
      if (valorCustoTotal <= 0){
        this.model.percentualAquisicao = ""; 
      }
      return valorCustoTotal <= 0;
    }
    
    strCampoHabilitado: string = 'V';
    habilitar(campo){
      this.strCampoHabilitado = campo;
      if (campo == 'V'){
        this._valorVendaInput.nativeElement.focus();
      }else{
        this._percentualAquisicaoInput.nativeElement.focus();
      }
    }
    
    obterPrecoVendaFinalTela(){
      return parseFloat(this.model.valorVenda.replace(',','.'));
    }
    obterPrecoVendaFinal(){
      let valorCustoTotal = this.obterPrecoCustoFinal();
      
      let percentualAquisicao = this.tv(parseFloat(this.model.percentualAquisicao.replace(',','.')));
      
      let valorFinalVenda: number = 0;
      valorFinalVenda = (valorCustoTotal * (1 + (percentualAquisicao / 100.00))) || 0;
      
      return valorFinalVenda;
    }
    
    calcularPrecoFinalVenda(){
      let precoFinalVenda: number = this.obterPrecoVendaFinal();
      this.model.valorVenda = precoFinalVenda.toFixed(2).replace('.',',');
      if (!this.model.percentualAquisicao){
        this.model.percentualAquisicao = "0";
      }
    }
    verificarCalculoPrecoVenda(){
      if (this.strCampoHabilitado == 'V'){ 
        this.preencherPercentualAquisicao();
      }else{ 
        this.calcularPrecoFinalVenda();
      }
    }
    preencherPercentualAquisicao(){ 
      let percentual: number = this.obterPercentualVenda() || 0;
      if (percentual > 0){
        percentual = percentual - 100;
      }
      this.model.percentualAquisicao = (percentual).toFixed(2).replace('.',',');
    }
    
    obterMargemLucroPercentual(){
      let valorCusto: number = this.obterPrecoCustoFinal();
      let valorVenda: number = parseFloat(this.model.valorVenda.replace(',','.'));
      if (valorCusto.toFixed(2) == valorVenda.toFixed(2)){
        return 0;
      }
      
      return ((1 - (valorCusto / valorVenda)) * 100) || 0;
    }
    obterMargemLucroValor(){
      let valorCusto: number = this.obterPrecoCustoFinal();
      let valorVenda: number = parseFloat(this.model.valorVenda.replace(',','.'));
      
      if (valorCusto.toFixed(2) == valorVenda.toFixed(2)){
        return 0;
      }
      return (parseFloat(valorVenda.toFixed(2)) - parseFloat(valorCusto.toFixed(2))) || 0;
    }
    
    
    ultimoPrecoCompra_inputed(valor){  
      this.verificarCalculoPrecoVenda();
    }
    percentualICMS_inputed(valor){
      this.verificarCalculoPrecoVenda();
    }
    percentualIPI_inputed(valor){
      this.verificarCalculoPrecoVenda();
    }
    percentualFrete_inputed(valor){
      this.verificarCalculoPrecoVenda();
    }
    percentualOperacao_inputed(valor){
      this.verificarCalculoPrecoVenda();
    }
    percentualAquisicao_inputed(valor){
      this.calcularPrecoFinalVenda();
    }
    valorVenda_inputed(valor){
      this.preencherPercentualAquisicao();
    }
    
    //////// INICIO PREÇOS ATACADO ///////////////////////////////////////
    
    precosAtacado = {
      qtdProdutoAtac : '',
      descontoProdutoAtac : '' 
    }; 
    
    obterPrecoVendaAtacado(){
      let v = 0;
      if (this.precosAtacado.descontoProdutoAtac != ''){
        let pDesconto = parseFloat(this.precosAtacado.descontoProdutoAtac.replace(',','.')) / 100;
        v = parseFloat(this.model.valorVenda.replace(',','.')) * (1 - pDesconto);
      }
      return v;
    }
    
    obterLucroAquisicaoAtacado(){
      let v = 0;
      let vCustoTotal = this.obterPrecoCustoFinal();
      let vAtacado = this.obterPrecoVendaAtacado();
      if (vCustoTotal && vAtacado) {
        v = ((vAtacado / vCustoTotal) - 1) * 100;
      }
      return v;
    }
    isConfiguracaoValidaPrecoAtacado(){ 
      if (isNaN(parseFloat(this.precosAtacado.qtdProdutoAtac))){
        return false;
      }
      if (isNaN(parseFloat(this.precosAtacado.descontoProdutoAtac))){
        return false;
      }
      return true;
    }
    
    adicionarDescontoAtacado(){
      if (this.isConfiguracaoValidaPrecoAtacado()){
        
        let pAtac = new ProdutoDescontoAtacado(); 
        pAtac.idDescontoAtacado = 0;
        pAtac.qtdProduto = this.precosAtacado.qtdProdutoAtac;
        pAtac.descontoProduto =  this.precosAtacado.descontoProdutoAtac;
        pAtac.isEmEdicao = false;
        
        this.model.listaProdutoDescontoAtacado.push(pAtac);
        
        this.precosAtacado.qtdProdutoAtac = '';
        this.precosAtacado.descontoProdutoAtac = '';
      }
    }
    obterPrecoVendaAtacadoGrid(item: ProdutoDescontoAtacado){
      let v = 0;
      if (item.descontoProduto != ''){
        let pDesconto = parseFloat(item.descontoProduto.replace(',','.')) / 100;
        v = parseFloat(this.model.valorVenda.replace(',','.')) * (1 - pDesconto);
      }
      return v;
    }
    obterLucroAquisicaoAtacadoGrid(item: ProdutoDescontoAtacado){
      let v = 0;
      let vCustoTotal = this.obterPrecoCustoFinal();
      let vAtacado = this.obterPrecoVendaAtacadoGrid(item);
      if (vCustoTotal && vAtacado) {
        v = ((vAtacado / vCustoTotal) - 1) * 100;
      }
      return v;
    }
    editarProdutoDescontoAtacado(item: ProdutoDescontoAtacado){
      item.isEmEdicao = true;
    }
    
    excluirProdutoDescontoAtacado(item:ProdutoDescontoAtacado){
      let index = this.model.listaProdutoDescontoAtacado.indexOf(item);
      this.model.listaProdutoDescontoAtacado.splice(index, 1);
    }
    obterVendaAtacadoGrid(item: ProdutoDescontoAtacado){
      let pVenda:number = this.obterPrecoVendaAtacadoGrid(item);
      return pVenda * parseFloat(item.qtdProduto);
    }
    obterVendaVarejoGrid(item: ProdutoDescontoAtacado){
      let valorVenda: number = parseFloat(this.model.valorVenda.replace(',','.'));
      return valorVenda * parseFloat(item.qtdProduto);
    }
    
    /////// FIM PRECOS ATACADO //////////////////////////////////////////
    
    
    ngAfterViewInit() {
      this._codigoBarraInput.nativeElement.focus();
    }  
    
    salvarFicar(){
      this.salvar(true);
    }
    salvarFechar(f){
      this.salvar(false);
    }
    
    salvar(isContinuar: boolean) {
      
      this.isLoading = true; 
      this.tratarDados();
      
      var modelEnviar: any = {
        idProduto: this.model.idProduto,
        nomeProduto: this.model.nomeProduto,
        idGrupoProduto: this.model.idGrupoProduto,
        idSubGrupoProduto: this.model.idSubGrupoProduto,
        idMarcaProduto: this.model.idMarcaProduto,
        valorVenda: this.model.valorVenda.replace(',','.'),
        qtdEstoque: this.model.qtdEstoque,
        idDepartamentoProduto: this.model.idDepartamentoProduto,
        ultimoValorCompra: this.model.ultimoValorCompra.toString().replace(',','.'),
        codigoBarra: this.model.codigoBarra,
        statusProduto: this.model.statusProduto,
        percentualICMS: this.model.percentualICMS.toString().replace(',','.'),
        percentualIPI: this.model.percentualIPI.toString().replace(',','.'),
        percentualFrete: this.model.percentualFrete.toString().replace(',','.'),
        percentualOperacao: this.model.percentualOperacao.toString().replace(',','.'),
        ncm: this.model.ncm,
        percentualAquisicao:this.model.percentualAquisicao.toString().replace(',','.'),
        listaProdutoDescontoAtacado: this.model.listaProdutoDescontoAtacado
      };
      if (this.operacao == "E") {
        this._produtoService.atualizar(modelEnviar, this.model.idProduto).subscribe(
          data => {
            if (data.isSucesso) {
              if (!isContinuar){
                this._rota.navigate(['/produto']);
              }
              toastr['success']("Informações atualizadas com sucesso do produto " + this.model.nomeProduto + "!");
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.tratarDados();
              toastr['error'](data.mensagemRequisicao);
            }
          },
          error => {
            this.isLoading = false;
          });
        } else {
          this._produtoService.cadastrar(modelEnviar).subscribe(
            data => {
              if (data.isSucesso) {
                if (!isContinuar){
                  this._rota.navigate(['/produto']);
                }
                toastr['success']("Produto cadastrado com sucesso!");
                this.isLoading = false;
              } else {
                this.isLoading = false;
                this.tratarDados();
                toastr['error'](data.mensagemRequisicao);
              }
            },
            error => {
              this.isLoading = false;
            });
          }
        } 
        
        private tratarDados(){
          if (this.model.idDepartamentoProduto == 0){
            this.model.idDepartamentoProduto = null;
          }
          if (this.model.idMarcaProduto == 0){
            this.model.idMarcaProduto = null;
          }
          if (this.model.idGrupoProduto == 0){
            this.model.idGrupoProduto = null;
          }
          if (this.model.idSubGrupoProduto == 0){
            this.model.idSubGrupoProduto = null;
          }
          if (this.model.qtdEstoque == null){
            this.model.qtdEstoque = 0;
          }
        }
      }
      