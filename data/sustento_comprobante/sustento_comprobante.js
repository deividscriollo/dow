$(document).on("ready",inicio);
var tipo = 0;
var temp_fila = 0;
function inicio (){
	$("#btn_0").on("click",guardar_sustCompro);	
	$("#btn_1").on("click",limpiar_form);
	$("#btn_3").on("click",agregar_sust_compro)
	/*-----------*/
	$.ajax({      /*cargar el select sustento*/         
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&fun=33",        
        success: function(response) {         
            for (var i = 0; i < response.length; i=i+2) {               
                $("#txt_1").append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
            }   
            $("#txt_1").trigger("chosen:updated");                              
            $.ajax({   /*cargar el select tipo comprobante*/         
		        type: "POST",
		        dataType: 'json',        
		        url: "../carga_ubicaciones.php?tipo=0&fun=34",        
		        success: function(response) {         
		            for (var i = 0; i < response.length; i=i+2) {               
		                $("#txt_2").append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
		            }   
		            $("#txt_2").trigger("chosen:updated");                              
		            $.ajax({   /*cargar la tabla */
				        type: "POST",
				        dataType: 'json',        
				        url: "../carga_ubicaciones.php?tipo=0&fun=35&id="+$("#txt_1").val(),        
				        success: function(response) {        
				        $("#td_sust_compro tbody").html(''); 
				            for (var i = 0; i < response.length; i=i+6) {				             	 		   
				             	$("#td_sust_compro tbody").append('<tr><td class="hidden">'+response[i]+'</td><td>'+response[i + 1] + " - "+ response[i + 2] +'</td><td class="hidden">'+response[i + 3]+'</td><td>'+response[i + 4] + " - "+ response[i + 5]+'</td></tr>');            		  
				            }   				            
				        }                   
				    });    
		        }                   
		    });    
        }                   
    });     
	/*-----------*/
	$("#txt_1").on("change",function(){
		 $.ajax({   /*cargar la tabla */
	        type: "POST",
	        dataType: 'json',        
	        url: "../carga_ubicaciones.php?tipo=0&fun=35&id="+$("#txt_1").val(),        
	        success: function(response) {        
	        $("#td_sust_compro tbody").html(''); 
	            for (var i = 0; i < response.length; i=i+6) {
	             	$("#td_sust_compro tbody").append('<tr><td class="hidden">'+response[i]+'</td><td>'+response[i + 1] + " - "+ response[i + 2] +'</td><td class="hidden">'+response[i + 3]+'</td><td>'+response[i + 4] + " - "+ response[i + 5]+'</td></tr>');            		   
	            }   				            
	        }                   
	    });    
	});
}
function repetidos_grupos(tabla,id,tipo){			
	var repe = 1;
	if(tipo == 0){		
		$("#"+id+ " tbody tr").each(function (index) {                                                                 
	        $(this).children("td").each(function (index) {                               
	            switch (index) {                                            
	                case 2:
	                    if($(this).text() == tabla[2]){
	                    	repe = 0;
	                    }
	                break;                 
	            }                          
	        });        
	    });	   
	}else{		
	}
	return repe;	
	
}
function eliminar_sust_compro(){    
    $(".elim_grupo").click(function(){
    	$(this).parents("tr").fadeOut("normal", function(){
        	$(this).children("td").each(function (index) {             	 
            });
        	$(this).remove(); 
    	}); 
    });
}

function guardar_sustCompro(){	
	$("#form_sust_compro").on("submit",function (e){				
		var valores = $("#form_sust_compro").serialize();
		var texto=($("#btn_0").text()).trim();				
		if(texto=="Guardar"){					
			if($('#td_sust_compro >tbody >tr').length == 0){
				alert("Ingrese mínimo un comprobante antes de continuar");				
			}else{
				datos_sustCompro(valores,"g",e);						
			}				
		}else{				
			datos_sustCompro(valores,"m",e);					
		}
		e.preventDefault();
		$(this).unbind("submit");
	});	
}
function datos_sustCompro(valores,tipo,p){

	var vect1 = new Array();    
	var vect2 = new Array();    
    var cont=0;
    $("#td_sust_compro tbody tr").each(function (index) {                                                                 
        $(this).children("td").each(function (index) {                               
            switch (index) {                                            
                case 0:
                    vect1[cont] = $(this).text();   
                break; 
                case 2:
                    vect2[cont] = $(this).text();   
                break;                 
            }                          
        });
        cont++;  
    });
	$.ajax({				
		type: "POST",
		data: valores+"&tipo="+tipo+"&vect1="+vect1+"&vect2="+vect2,		
		url: "sustento_comprobante.php",			
	    success: function(data) {		    	
    		if(data == 1){
    			alert('Datos guardados correctamente');			
    			limpiar_form(p);		    		
    		}else{
    			if( data == 0 ){
		    		alert('No se han realizado cambios.. ');			
		    		actualizar_form();	
		    	}else{
		    		
		    	}
    		}	    		    	
		}
	}); 
}
function agregar_sust_compro(){	
	var ret = Array();
	ret[0] = $("#txt_1").val();
	ret[1] = $("#txt_1 option:selected").text();
	ret[2] = $("#txt_2").val();
	ret[3] = $("#txt_2 option:selected").text();
	var repe = repetidos_grupos(ret,"td_sust_compro",tipo);  
	if(repe == 1){
		$("#td_sust_compro tbody").append('<tr><td class="hidden">'+ret[0]+'</td><td>'+ret[1]+'</td><td class="hidden">'+ret[2]+'</td><td>'+ret[3]+'</td><td align="center"><div class="hidden-sm hidden-xs btn-group"><a class="btn btn-xs btn-danger elim_grupo"><i class="ace-icon fa fa-trash-o bigger-120" onclick="return eliminar_sust_compro(event)"></i></a></div></td><td class="hidden"></td></tr>');            		
		$("#txt_1").attr("disabled",true);
		$("#txt_1").trigger("chosen:updated");                      
	}else{
		if(repe == 0){
			alert("Este código ya existe seleccione otro")
		}else{
			
		}            		
	}
}