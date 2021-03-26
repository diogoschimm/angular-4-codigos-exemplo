declare var $: any;

export class Mascaras{

    public static aplicar(){
        $('.cpfMask').mask('000.000.000-00');
        $('.cnpjMask').mask('00.000.000/0000-00');
        $('.cepMask').mask('00000-000');
    }

}