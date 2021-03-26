function CriarDataTable(p_nomeSingular, p_nomePlural, p_dados, p_colunas){

	$('.dataTables-listagem').DataTable({
		"oLanguage": {
		  "sZeroRecords": "Não há registros que correspondam ao seu critério de pesquisa",
		  "sLengthMenu": "_MENU_ Registros por página",
		  "sInfo": "Exibindo _END_ de _TOTAL_ Registros",
		  "sInfoEmpty": "Mostrando 0 registros",
		  "sInfoFiltered": "(filtrando de _MAX_ registros)",
		  "sSearch": "Filtrar:"
		}, 
		data: p_dados,
		columns: p_colunas,
		dom: '<"html5buttons"B>lTfgitp', 
		buttons: [
		  { extend: 'copy', text: 'Copiar'},
		  {extend: 'csv'},
		  {extend: 'excel', title: 'ExportacaoListagem' + p_nomePlural},
		  {extend: 'pdf', title: 'ImpressaoListagem' + p_nomePlural},
		  
		  {extend: 'print',
		  customize: function (win){
		    $(win.document.body).addClass('white-bg');
		    $(win.document.body).css('font-size', '10px');
		    
		    $(win.document.body).find('table')
		    .addClass('compact')
		    .css('font-size', 'inherit');
		  }
		}], 
	   }); 
}