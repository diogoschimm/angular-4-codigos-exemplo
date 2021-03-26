import { ItemPedidoCadastro } from "./ItemPedidoCadastro";

export class PedidoCadastro{

    isFornecedorCadastrado: Boolean
    idFornecedorCadastrado: number
    nomeFornecedor: string
    dataPedido: Date
    dataChegada: Date
    valorTotalPedido: number
    itens: ItemPedidoCadastro[]

    getQTDProdutos() : number{
        return this.itens.length;
    }

    getQTDItens(){
        
    }

    getValorTotalItens(){
        
    }

    addItem(item: ItemPedidoCadastro){
        this.itens.push(item)
    }

    removeItem(idProdutoCadastrado: number){

    }
    
    updateQTDItem(idProdutoCadastrado: number, qtd: number){
        
    }

}