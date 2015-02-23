$(document).on("ready",inicio);
function inicio (){
	$("#mas_vendido").click(function(){
		window.open('../reportes/producto_mas_vendido.php','_blank');      				

	});
	$("#mas_compra").click(function(){
		window.open('../reportes/cliente_mas_compra.php','_blank');      				

	});
}
