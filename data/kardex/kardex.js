$(document).on("ready",inicio);	
function inicio(){
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
                
            		for (var i = 0; i < data.length; i=i+13) {                                                              
              			appendToChosenProducto(data[i],data[i+1],data[i+2],data[i+3],data[i+4],data[i+5],data[i+6],data[i+7],data[i+8],data[i+9],text,"codigo","codigo_chosen");
            		}           
            		$('#producto').html("");
            		$('#producto').append($("<option data-barras='"+data[2]+"' data-codigo='"+data[1]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[3])).trigger('chosen:updated');            
            		$("#id_producto").val(data[0]);	          		
          		},
          		error: function (data) {
            		 console.log(data);
          		}         
        	});     
    	}
  	});
  	
  	$("#codigo").chosen().change(function (event,params){    
    	if(params == undefined){     
    		limpiar_chosen_codigo();          
	    }else{              
    		var a = $("#codigo option:selected");            
    	  	$('#producto').html("");                   	      	
    	  	$('#producto').append($("<option data-barras='"+$(a).data("barras")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("codigo"))).trigger('chosen:updated');                  
      		$("#id_producto").val($(a).val());    	  	
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
          			for (var i = 0; i < data.length; i=i+13) {                                                 
	            	  appendToChosenProducto(data[i],data[i+3],data[i+2],data[i+1],data[i+4],data[i+5],data[i+6],data[i+7],data[i+8],data[i+9],text,"producto","producto_chosen");
    	      		}           
        	  		$('#codigo').html("");
          			$('#codigo').append($("<option data-barras='"+data[2]+"' data-codigo='"+data[3]+"' data-precio='"+data[4]+"' data-stock='"+data[5]+"' data-iva='"+data[6]+"' data-inventariable='"+data[7]+"' ></option>").val(data[0]).html(data[1])).trigger('chosen:updated');            
          			$("#id_producto").val(data[0]);	          		
	        	},
    	    	error: function (data) {
        	  		 console.log(data);
        		}          
	      	});
    	}
  	});   	  
    $("#producto").chosen().change(function (event,params){    
      if(params == undefined){         
        $('#codigo').html("");
	   	$('#codigo').append($("<option></option>"));          
      $('#codigo').trigger('chosen:updated')
	    $('#producto').html("");
    	$('#producto').append($("<option></option>"));          
      $('#producto').trigger('chosen:updated');     
	   $("#id_producto").val("");    	  	      		
    	}else{              
      var a = $("#producto option:selected");            
      $('#codigo').html("");                       	  	
    	$('#codigo').append($("<option data-barras='"+$(a).data("barras")+"' data-codigo='"+$(a).text()+"' data-precio='"+$(a).data("precio")+"' data-stock='"+$(a).data("stock")+"' data-iva='"+$(a).data("iva")+"' data-inventariable='"+$(a).data("inventariable")+"' ></option>").val($(a).val()).html($(a).data("codigo"))).trigger('chosen:updated');                  
    	$("#id_producto").val($(a).val());          
      }
  	});
  
  $('#btn_buscar').click(function(){
    $('#td_kardex').dataTable().fnClearTable();
    $.ajax({
        type: "POST",
        url: "kardex.php",  
        data:{id:$('#id_producto').val(),fecha:$('#rango_fecha').val()},
        dataType: 'json',
        success: function(response) {         
          for (var i = 0; i < response.length; i=i+12) {            
              $('#td_kardex').dataTable().fnAddData([
                response[i+0],
                response[i+1],
                response[i+2],
                response[i+3],
                response[i+4],
                response[i+5],                                           
                response[i+6],
                response[i+7],
                response[i+8],
                response[i+9],
                response[i+10],
                response[i+11],
              ]);                                
          }
          //$("#dynamic-table tbody").html(acu);
         }                    
      });       
      
  })
  $('#btn_kardex').click(function(){
    window.open("../reportes/kardex.php?fecha="+$('#rango_fecha').val()+"&id="+$("#id_producto").val());
  });
               	
}