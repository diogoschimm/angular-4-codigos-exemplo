import { ProdutoDescontoAtacado } from './ProdutoDescontoAtacado';
import { Injectable } from '@angular/core';

@Injectable()
export class ProdutoCadastro{
     idProduto: number;
     nomeProduto: string;
     idGrupoProduto: number;
     idSubGrupoProduto: number;
     idMarcaProduto: number; 
     valorVenda: string;
     qtdEstoque: number;
     idDepartamentoProduto: number;
     ultimoValorCompra: string;     
     codigoBarra: string; 
     statusProduto: string;
     percentualICMS: number;
     percentualIPI: number;
     percentualFrete: number;
     percentualOperacao: number;
     ncm: string;
     percentualAquisicao: string; 
     listaProdutoDescontoAtacado: ProdutoDescontoAtacado[] = [];
}