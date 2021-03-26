import { ProdutoDescontoAtacado } from './ProdutoDescontoAtacado';
import { Injectable } from '@angular/core';

@Injectable() 
export class ProdutoListagem {
     idProduto: number;
     nomeProduto: string;
     idGrupoProduto: number;
     idSubGrupoProduto: number;
     idMarcaProduto: number; 
     valorVenda: number;
     qtdEstoque: number;
     idDepartamentoProduto: number;
     dataCriacao:Date;
     nomeStatusProduto: string;
     ultimoValorCompra: number; 

     percentualLucroAquisicao: number;
     listaProdutoDescontoAtacado: ProdutoDescontoAtacado[] = [];
}