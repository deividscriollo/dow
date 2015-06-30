$(document).on("ready",inicio);
//resize chosen on sidebar collapse/expand
$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
	if(event_name != 'sidebar_collapsed') return;
	$('.chosen-select').each(function() {
		 var $this = $(this);
		 $this.next().css({'width': $this.parent().width()});
	})
});	
function inicio (){						
	cargar_comprobante();
	/*----*/
	$("#btn_0").on('click',guardar_comprobante);	
	/*------------*/	
	$("#form_tipo_comprobante input").on("keyup click",function (e){//campos requeridos		
		comprobarCamposRequired(e.currentTarget.form.id)
	});	
	/*--------*/
	$('#td_comprobante tbody').on( 'dblclick', 'tr', function () {  		             	    	
        var data=$("#td_comprobante").dataTable().fnGetData($(this));
        //console.log(data);        
        $("#txt_0").val(data[0]);       
        $("#txt_1").val(data[1]);
        $("#txt_2").val(data[2]);                
        $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     
        comprobarCamposRequired("form_tipo_comprobante");
	});
	/*----------*/
	$("#btn_1").on("click",limpiar_form);
}
function guardar_comprobante(){
	var resp=comprobarCamposRequired("form_tipo_comprobante");
	if(resp==true){
		$("#form_tipo_comprobante").on("submit",function (e){				
			var valores = $("#form_tipo_comprobante").serialize();
			var texto=($("#btn_0").text()).trim();	
			if(texto=="Guardar"){						
				datos_comprobante(valores,"g",e);					
			}else{
				datos_comprobante(valores,"m",e);					
			}
			e.preventDefault();
    		$(this).unbind("submit")
		});
	}
}
function datos_comprobante(valores,tipo,p){	
	$.ajax({				
		type: "POST",
		data: valores+"&tipo="+tipo,		
		url: "tipo_comprobante.php",			
	    success: function(data) {	
	    	if( data == 0 ){
	    		alert('Datos Agregados Correctamente');			
	    		limpiar_form(p);
	    		cargar_comprobante();	    		
	    	}else{
	    		if( data == 1 ){
	    			alert('El ' +$("#txt_1").val()+  ' ya existe ingrese otro');	
	    			$("#txt_1").val("")	    			
	    			$("#txt_1").focus();
	    		}else{
	    			if( data == 2 ){
	    				alert('El ' +$("#txt_2").val()+  ' ya existe ingrese otro');	
	    				$("#txt_2").val("")	    			
	    				$("#txt_2").focus();
	    			}else{
	    				alert("Error al momento de enviar los datos la página se recargara");	    			
	    				actualizar_form();
	    			}	    			
	    		}
	    	}
		}
	}); 
}
function cargar_comprobante(){		
	var dataTable = $('#td_comprobante').dataTable();
    $("#dynamic-table tbody").empty(); 
    $.ajax({
        type: "POST",
        url: "comprobante.php",          
        dataType: 'json',
        success: function(response) {   
        	dataTable.fnClearTable();
			for(var i = 0; i < response.length; i++) {
				dataTable.fnAddData([
					response[i][0],
					response[i][1],
					response[i][2],	
				]);
			} // End For
		},
		error: function(e){
			console.log(e.responseText);
		}              	
                                
   	});      
}
