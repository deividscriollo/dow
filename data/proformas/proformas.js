$(document).on("ready",inicio);

function guardar_factura(){
    var vect1 = new Array();
    var vect2 = new Array();
    var vect3 = new Array();
    var vect4 = new Array();
    var vect5 = new Array();
    var cont=0;
    $("#detalle_factura tbody tr").each(function (index) {                                                                 
        $(this).children("td").each(function (index) {                               
            switch (index) {                                            
                case 0:
                    vect1[cont] = $(this).text();   
                    break; 
                case 3:
                    vect2[cont] = $(this).text();                                       
                    break; 
                case 6:
                    vect3[cont] = $(this).text();                                       
                    break;
                case 7:
                    vect4[cont] = $(this).text();                                       
                    break;
                case 8:
                    vect5[cont] = $(this).text();                                       
                    break;        
            }                          
        });
        cont++;  
    });
    
    if($("#id_cliente").val() == ""){  
        $('#txt_nro_identificacion').trigger('chosen:open');    
        alert("Seleccione un cliente");
    }else{
        if($("#serie3").val() == ""){
            $("#serie3").focus();
            alert("Ingrese la serie");
        }else{
            if(vect1.length == 0){
                var a = autocompletar($("#serie3").val());
                $("#serie3").val(a + "" + $("#serie3").val());
                alert("Ingrese los productos");  
            }else{
                var a = autocompletar($("#serie3").val());
                $("#serie3").val(a + "" + $("#serie3").val());
                $.ajax({        
                    type: "POST",
                    data: $("#form_facturaVenta").serialize()+"&campo1="+vect1+"&campo2="+vect2+"&campo3="+vect3+"&campo4="+vect4+"&campo5="+vect5+"&hora="+$("#estado").text(),                
                    url: "proformas.php",      
                    success: function(data) { 
                        if( data == 0 ){
                            alert('Datos Agregados Correctamente');     
                            setTimeout(function() {
                                location.reload();
                            }, 1000);
                        }
                    }
                }); 
            }
        }
    }
}

function inicio (){		  
	mostrar("estado");
	fecha_actual("fecha_actual");
 	////////////////validaciones/////////////////
 	$("#cantidad").validCampoFranz("0123456789");
 	$("#serie3").validCampoFranz("0123456789");
 	$("#descuento").validCampoFranz("0123456789");
 	$("#serie3").attr("maxlength", "9");
 	$("#precio").on("keypress",punto);
 	/*----buscador cliente identificacion----*/
	var input_ci = $("#txt_nro_identificacion_chosen").children().next().children();		
	$(input_ci).on("keyup",function(input_ci){
		var text = $(this).children().val();
		if(text != ""){
			$.ajax({        
		        type: "POST",
		        dataType: 'json',        
	    	    url: "../carga_ubicaciones.php?tipo=0&id=0&fun=13&val="+text,        
	        	success: function(data, status) {
	        		$('#txt_nro_identificacion').html("");	        	
			        for (var i = 0; i < data.length; i=i+6) {            				            		            	
			        	appendToChosen_cliente(data[i],data[i+1],text,data[i+2],data[i+3],data[i+4],data[i+5],"txt_nro_identificacion","txt_nro_identificacion_chosen");
			        }		        
		    	    $('#txt_nombre_cliente').html("");
		        	$('#txt_nombre_cliente').append($("<option data-extra='"+data[1]+"' data-direccion='"+data[3]+"' data-telefono='"+data[4]+"' data-email='"+data[5]+"'></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                    
			        $("#id_cliente").val(data[0]);		        
					$('#lbl_client_telefono').html(data[3]);
					$('#lbl_client_correo').html(data[4]);
					$('#lbl_client_direccion').html(data[5]);
			    },
			    error: function (data) {
			        console.log(data)
		    	}	        
		    });
	    }	  
	});
	$("#txt_nro_identificacion").chosen().change(function (event,params){
		if(params == undefined){			
			$('#txt_nro_identificacion').html("");
			$('#txt_nro_identificacion').append($("<option></option>"));    			
			$('#txt_nro_identificacion').trigger('chosen:updated')
			$('#txt_nombre_cliente').html("");
			$('#txt_nombre_cliente').append($("<option></option>"));    			
			$('#txt_nombre_cliente').trigger('chosen:updated')
			$("#id_cliente").val("");		        
			$('#lbl_client_telefono').html("");
			$('#lbl_client_correo').html("");
			$('#lbl_client_direccion').html("");
		}else{
			var a = $("#txt_nro_identificacion option:selected");            
      		$('#txt_nombre_cliente').html("");
      		$('#txt_nombre_cliente').append($("<option data-extra='"+$(a).text()+"' data-direccion='"+$(a).data("direccion")+"' data-telefono='"+$(a).data("telefono")+"' data-email='"+$(a).data("email")+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');      		
      		$("#id_cliente").val($(a).val());		        
			$('#lbl_client_telefono').html($(a).data("telefono"));
			$('#lbl_client_correo').html($(a).data("email"));
			$('#lbl_client_direccion').html($(a).data("direccion"));
		}
	});
	/*----buscador nombre cliente----*/
	var input_ci = $("#txt_nombre_cliente_chosen").children().next().children();		
	$(input_ci).on("keyup",function(input_ci){
		var text = $(this).children().val();
		if(text != ""){
			$.ajax({        
		        type: "POST",
		        dataType: 'json',        
	    	    url: "../carga_ubicaciones.php?tipo=0&id=0&fun=18&val="+text,        
	        	success: function(data, status) {
	        		$('#txt_nombre_cliente').html("");	        	
			        for (var i = 0; i < data.length; i=i+6) {            				            		            	
			        	appendToChosen_cliente(data[i],data[i+2],text,data[i+1],data[i+3],data[i+4],data[i+5],"txt_nombre_cliente","txt_nombre_cliente_chosen");                
			        }		        
		    	    $('#txt_nro_identificacion').html("");
		        	$('#txt_nro_identificacion').append($("<option data-extra='"+data[2]+"' data-direccion='"+data[3]+"' data-telefono='"+data[4]+"' data-email='"+data[5]+"'></option>").val(data[0]).html(data[1])).trigger('chosen:updated');                    
			        $("#id_cliente").val(data[0]);		        
					$('#lbl_client_telefono').html(data[3]);
					$('#lbl_client_correo').html(data[4]);
					$('#lbl_client_direccion').html(data[5]);
			    },
			    error: function (data) {
			        console.log(data)
		    	}	        
		    });
	    }	  
	});
	$("#txt_nombre_cliente").chosen().change(function (event,params){
		if(params == undefined){			
			$('#txt_nro_identificacion').html("");
			$('#txt_nro_identificacion').append($("<option></option>"));    			
			$('#txt_nro_identificacion').trigger('chosen:updated')
			$('#txt_nombre_cliente').html("");
			$('#txt_nombre_cliente').append($("<option></option>"));    			
			$('#txt_nombre_cliente').trigger('chosen:updated')
			$("#id_cliente").val("");		        
			$('#lbl_client_telefono').html("");
			$('#lbl_client_correo').html("");
			$('#lbl_client_direccion').html("");
		}else{
			var a = $("#txt_nombre_cliente option:selected");            
      		$('#txt_nro_identificacion').html("");
      		$('#txt_nro_identificacion').append($("<option data-extra='"+$(a).text()+"' data-direccion='"+$(a).data("direccion")+"' data-telefono='"+$(a).data("telefono")+"' data-email='"+$(a).data("email")+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');      		
      		$("#id_cliente").val($(a).val());		        
    			$('#lbl_client_telefono').html($(a).data("telefono"));
    			$('#lbl_client_correo').html($(a).data("email"));
    			$('#lbl_client_direccion').html($(a).data("direccion"));
		}
	});
	/*buscador del codigo del producto*/
  var input_codigoProducto = $("#codigo_chosen").children().next().children();    
  	$(input_codigoProducto).on("keyup",function(input_ci){
    	var text = $(this).children().val();
      	if(text != ""){
	        $.ajax({        
    	    	type: "POST",
        		dataType: 'json',        
          		url: "../carga_ubicaciones.php?tipo=0&id=0&fun=15&val="+text,        
          		success: function(data, status) {
            		$('#codigo').html("");            
            		for (var i = 0; i < data.length; i=i+8) {                                                 
              			appendToChosenProducto(data[i],data[i+1],data[i+2],data[i+3],data[i+4],data[i+5],data[i+6],data[i+7],text,"codigo","codigo_chosen");
            		}           
            		$('#producto').html("");
            		$('#producto').append($("<option data-barras='"+data[2]+"' data-codigo='"+data[1]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[3])).trigger('chosen:updated');            
	    	        $("#id_productos").val(data[0]);
    		        $('#codigo_barras').html("");
	        	    $('#codigo_barras').append($("<option data-barras='"+data[3]+"' data-codigo='"+data[1]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                        
            		$("#precio").val(data[4]);
            		//$("#cantidad").val(data[5]);
          		},
          		error: function (data) {
            		 console.log(data);
          		}         
        	});     
    	}
  	});
  	$("#codigo_chosen").children().next().children().click(function (){
    	$("#cantidad").focus(); 
  	});
  	$("#codigo").chosen().change(function (event,params){    
    	if(params == undefined){     
    		limpiar_chosen_codigo();          
	    }else{              
    		var a = $("#codigo option:selected");            
    	  	$('#producto').html("");                   
	      	$('#codigo_barras').html("");             
    	  	$('#producto').append($("<option data-barras='"+$(a).data("barras")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("codigo"))).trigger('chosen:updated');                  
	      	$('#codigo_barras').append($("<option data-barras='"+$(a).data("codigo")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("barras"))).trigger('chosen:updated');                  
      		$("#id_productos").val($(a).val());
    	  	$("#precio").val($(a).data("precio"));       
	      	$("#cantidad").focus();
    	}
  	}); 
	/*buscador del nombre del producto*/
	var input_nombreProducto = $("#producto_chosen").children().next().children();    
  	$(input_nombreProducto).on("keyup",function(input_ci){    
    	var text = $(this).children().val();
    	if(text != ""){
      		$.ajax({        
	        	type: "POST",
	    	    dataType: 'json',        
    	    	url: "../carga_ubicaciones.php?tipo=0&id=0&fun=16&val="+text,        
        		success: function(data, status) {
          			$('#producto').html("");            
          			for (var i = 0; i < data.length; i=i+8) {                                                 
	            		appendToChosenProducto(data[i],data[i+3],data[i+2],data[i+1],data[i+4],data[i+5],data[i+6],data[i+7],text,"producto","producto_chosen");
    	      		}           
        	  		$('#codigo').html("");
          			$('#codigo').append($("<option data-barras='"+data[2]+"' data-codigo='"+data[3]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[1])).trigger('chosen:updated');            
          			$("#id_productos").val(data[0]);
	          		$('#codigo_barras').html("");
    	      		$('#codigo_barras').append($("<option data-barras='"+data[3]+"' data-codigo='"+data[1]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                        
        	  		$("#precio").val(data[4]);
          			//$("#cantidad").val(data[5]);
	        	},
    	    	error: function (data) {
        	  		 console.log(data);
        		}          
	      	});
    	}
  	}); 
  	$("#producto_chosen").children().next().children().click(function (){
    	$("#cantidad").focus(); 
  	});  
	$("#producto").chosen().change(function (event,params){    
    	if(params == undefined){         
      		$('#codigo').html("");
	    	$('#codigo').append($("<option></option>"));          
      		$('#codigo').trigger('chosen:updated')
	      	$('#producto').html("");
    	  	$('#producto').append($("<option></option>"));          
      		$('#producto').trigger('chosen:updated');     
	      	$('#codigo_barras').html("");
    	  	$('#codigo_barras').append($("<option></option>"));          
      		$('#codigo_barras').trigger('chosen:updated');     
	      	$("#id_productos").val("");
    	  	$("#precio").val("");       
      		//$("#cantidad").val(0)
    	}else{              
      		var a = $("#producto option:selected");            
	      	$('#codigo').html("");                   
    	  	$('#codigo_barras').html("");             
      		$('#codigo').append($("<option data-barras='"+$(a).data("barras")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("codigo"))).trigger('chosen:updated');                  
	      	$('#codigo_barras').append($("<option data-barras='"+$(a).data("codigo")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("barras"))).trigger('chosen:updated');                  
    	  	$("#id_productos").val($(a).val());
      		$("#precio").val($(a).data("precio"));      
	      	$("#cantidad").focus(); 
    	}
  	});   	
  	/*---agregar a la tabla---*/
  	$("#cantidad").on("keypress",function (e){
    	if(e.keyCode == 13){//tecla del alt para el entrer poner 13
      		$("#precio").focus();  
    	}
  	});
  	$("#precio").on("keypress",function (e){
    	if(e.keyCode == 13){//tecla del alt para el entrer poner 13
      		$("#descuento").focus();  
    	}
  	});
  	$("#descuento").on("keypress",function (e){
    	if(e.keyCode == 13){//tecla del alt para el entrer poner 13      
      		if($("#cantidad").val() != ""){
        		if($("#precio").val() != ""){
          			if($("#id_productos").val() != ""){
            		//agregar_fila(id_tabla,id_productos,codigo_producto,detalle_producto,cantidad_producto,limite,precio_unitario,descuento,total,inventariable);            			
                  var a = $("#producto option:selected");      
                  //console.log($("#cantidad").val() <= $(a).data('stock'))
                  if($(a).data('inventariable') == 'on' && $("#cantidad").val() <= $(a).data('stock'))
                  {
            			 agregar_fila("detalle_factura",$("#id_productos").val(),$(a).data("codigo"),$(a).text(),$("#cantidad").val(),$(a).data("stock"),$("#precio").val(),$("#descuento").val(),$(a).data("iva"),$(a).data("inventariable"));            
                  }else{
                    if($(a).data('inventariable') == 'off'){
                      agregar_fila("detalle_factura",$("#id_productos").val(),$(a).data("codigo"),$(a).text(),$("#cantidad").val(),$(a).data("stock"),$("#precio").val(),$("#descuento").val(),$(a).data("iva"),$(a).data("inventariable"));                                  
                    }else{
                      alert('Fuera de stock el límite del productos es: '+$(a).data('stock'));
                      $("#cantidad").val('');
                      $("#cantidad").focus();
                    }
                  }
          			}else{
            			alert("Seleccione un producto antes de continuar");                        
    	        		$('#codigo_chosen').trigger('mousedown');
        	  		}
        		}else{
	          		alert("Ingrese un precio");
    	      		$("#precio").focus();  
        		}
      		}else{
	        	alert("Ingrese una cantidad");
    	    	$("#cantidad").focus();
      		}
    	}
	});
/*-----guardar factura compra--*/
  $("#btn_0").on("click",guardar_factura);
}






/*---------------------------------*/