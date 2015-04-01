$(document).on("ready",inicio);
function inicio (){					
	$("#btn_guardar").attr("disabled",true);
   /**/
	$('#tree1').ace_tree({
		dataSource: function(options, callback){			
			var tree_data = {
				'inicio' : {text: 'Inicio', type: 'item',dataAttributes: {id:'n1_1'}},
				'ingresos' : {text: 'Ingresos', type: 'folder',dataAttributes: {id:'n1_2'}}	,
				'procesos' : {text: 'Procesos', type: 'folder',dataAttributes: {id:'n1_3'}}	,
				'reportes' : {text: 'Reportes', type: 'folder',dataAttributes: {id:'n1_4'}}	,
				'administracion' : {text: 'Administración', type: 'folder',dataAttributes: {id:'n1_5'}}	,			
			}		
			tree_data['ingresos']['additionalParameters'] = {
				'children' : {
					'generales' : {text: 'Generales', type: 'folder',dataAttributes: {id:'n2_1'}},
					'empresa' : {text: 'Empresa', type: 'item',dataAttributes: {id:'n2_2'}},
					'usuario' : {text: 'Usuario', type: 'item',dataAttributes: {id:'n2_3'}},
					'clientes' : {text: 'Clientes', type: 'item',dataAttributes: {id:'n2_4'}},
					'proveedores' : {text: 'Proveedores', type: 'item',dataAttributes: {id:'n2_5'}},
					'productos' : {text: 'Productos', type: 'item',dataAttributes: {id:'n2_6'}},
				},'itemSelected':false,
			}
			tree_data['ingresos']['additionalParameters']['children']['generales']['additionalParameters'] = {
				'children' : {
					'bodegas' : {text: 'Bodegas', type: 'item',dataAttributes: {id:'n3_1'}},
					'categorias' : {text: 'Categorías', type: 'item',dataAttributes: {id:'n3_2'}},
					'marcas' : {text: 'Marcas', type: 'item',dataAttributes: {id:'n3_3'}},
					'unidades_meidad' : {text: 'Unidades Medida', type: 'item',dataAttributes: {id:'n3_4'}},
					'tipo_producto' : {text: 'Tipo Producto', type: 'item',dataAttributes: {id:'n3_5'}},				
				}
			}
			tree_data['procesos']['additionalParameters'] = {
				'children' : {
					'inventario' : {text: 'Inventario', type: 'item',dataAttributes: {id:'n2_7'}},
					'compras' : {text: 'Compras', type: 'folder',dataAttributes: {id:'n2_8'}},
					'ventas' : {text: 'Ventas', type: 'folder',dataAttributes: {id:'n2_9'}},
					'kardex' : {text: 'Kardex', type: 'item',dataAttributes: {id:'n2_10'}},
				}
			}
			tree_data['procesos']['additionalParameters']['children']['compras']['additionalParameters'] = {
				'children' : {
					'productos_bodega' : {text: 'Productos bodega', type: 'item',dataAttributes: {id:'n3_6'}},
					'devolucion_compra' : {text: 'Ddevolución Compra', type: 'item',dataAttributes: {id:'n3_7'}},								
					
				}
			}
			tree_data['procesos']['additionalParameters']['children']['ventas']['additionalParameters'] = {
				'children' : {
					'facturacion_venta' : {text: 'Facturación Venta', type: 'item',dataAttributes: {id:'n3_8'}},				
					
				}
			}
			tree_data['reportes']['additionalParameters'] = {
				'children' : {
					'estadisticos' : {text: 'Estadísticos', type: 'item',dataAttributes: {id:'n2_11'}},
					'simples' : {text: 'Simples', type: 'item',dataAttributes: {id:'n2_12'}},				
				}
			}
			tree_data['administracion']['additionalParameters'] = {
				'children' : {
					'privilegios' : {text: 'Privilegios', type: 'item',dataAttributes: {id:'n2_13'}},				
				}
			}						
			var $data = null;		
			if(!("text" in options) && !("type" in options)){			
				$data = tree_data;//the root tree													
				callback({ data: $data });
				return;
			}
			else if("type" in options && options.type == "folder") {									
				if("additionalParameters" in options && "children" in options.additionalParameters)
					$data = options.additionalParameters.children || {};
				else $data = {}//no data
			}		
			if($data != null)//this setTimeout is only for mimicking some random delay									
				setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);										
	            
		},
		multiSelect: true,
		cacheItems: true,
		'open-icon' : 'ace-icon tree-minus',		
		'close-icon' : 'ace-icon tree-plus',				
		'selected-icon' : 'ace-icon fa fa-check',
		'unselected-icon' : 'ace-icon fa fa-times',
		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>',						

	 });		  
    
   /**/
	
	$('.chosen-select').chosen({allow_single_deselect:true}); 	
	
	$("#btn_agregar").click(function(){										
		if($("#txt_0").val()!= ''){
			$.ajax({        
		        type: "POST",
		        dataType: 'json',        
		        url: "carga_permisos.php?id="+$("#txt_0").val(),        	        
		        success: function(data, status) {	 			        						
			        $("#tree1").tree('openFolder', $('#n1_3'));
					setTimeout(function (){									
						$("#tree1").tree('openFolder', $('#n1_2'));		
						$("#tree1").tree('openFolder', $('#n1_4'));		
						$("#tree1").tree('openFolder', $('#n1_5'));		
					},1000);								
					setTimeout(function (){									
						$("#tree1").tree('openFolder', $('#n2_8'));		
						$("#tree1").tree('openFolder', $('#n2_9'));								
						$("#tree1").tree('openFolder', $('#n2_1'));							
					},2000);		        	
					setTimeout(function (){
						if(data.nivel1[0][0] == 1)
			    			$("#n1_1").trigger("click");
			    		if(data.nivel1[0][1] == 1)
			    			$("#n1_2").trigger("click");
			    		if(data.nivel1[0][2] == 1)
			    			$("#n1_3").trigger("click");
			    		if(data.nivel1[0][3] == 1)
			    			$("#n1_4").trigger("click");
			    		if(data.nivel1[0][4] == 1)
			    			$("#n1_5").trigger("click");
			    		if(data.nivel2[0][0] == 1)
			    			$("#n2_1").trigger("click");
			    		if(data.nivel2[0][1] == 1)
			    			$("#n2_2").trigger("click");
			    		if(data.nivel2[0][2] == 1)
			    			$("#n2_3").trigger("click");
			    		if(data.nivel2[0][3] == 1)
			    			$("#n2_4").trigger("click");
			    		if(data.nivel2[0][4] == 1)
			    			$("#n2_5").trigger("click");
			    		if(data.nivel2[0][5] == 1)
			    			$("#n2_6").trigger("click");
			    		if(data.nivel2[0][6] == 1)
			    			$("#n2_7").trigger("click");
			    		if(data.nivel2[0][7] == 1)
			    			$("#n2_8").trigger("click");
			    		if(data.nivel2[0][8] == 1)
			    			$("#n2_9").trigger("click");
			    		if(data.nivel2[0][9] == 1)
			    			$("#n2_10").trigger("click");
			    		if(data.nivel2[0][10] == 1)
			    			$("#n2_11").trigger("click");
			    		if(data.nivel2[0][11] == 1)
			    			$("#n2_12").trigger("click");
			    		if(data.nivel2[0][12] == 1)
			    			$("#n2_13").trigger("click");
			    		if(data.nivel3[0][0] == 1)
			    			$("#n3_1").trigger("click");
			    		if(data.nivel3[0][1] == 1)
			    			$("#n3_2").trigger("click");
			    		if(data.nivel3[0][2] == 1)
			    			$("#n3_3").trigger("click");
			    		if(data.nivel3[0][3] == 1)
			    			$("#n3_4").trigger("click");
			    		if(data.nivel3[0][4] == 1)
			    			$("#n3_5").trigger("click");
			    		if(data.nivel3[0][5] == 1)
			    			$("#n3_6").trigger("click");
			    		if(data.nivel3[0][6] == 1)
			    			$("#n3_7").trigger("click");
			    		if(data.nivel3[0][7] == 1)
			    			$("#n3_8").trigger("click");
					},3000)		    
				}			        							
	       	});
			$("#btn_agregar").attr("disabled",true)
			$("#btn_guardar").attr("disabled",false)
		}else{
			alert("Seleccione un usuario")
		}		
	});
	$("#btn_limpiar").click(function(){
		actualizar_form();
	});
	$("#btn_guardar").click(function(){
		if($("#txt_0").val()== ""){
			alert("Seleccione un usuario y carge sus permisos para continuar");
		}else{
			var vector_1 = new Array();
			var vector_2 = new Array();
			var vector_3 = new Array();
			var cont_n2 = 0;									
			var cont_n2_1 = 0;	
			var cont_n2_2 = 0;	
			var cont_n3_1 = 0;						
			var cont_n3_2 = 0;
			var cont_n3_3 = 0;
			var cont_n3 = 0;									
			var cont_n4 = 0;									
			/*nivel 1 Inicio*/
			if($("#n1_1").hasClass("tree-selected")){
				vector_1[0] = 1;
			}else{
				vector_1[0] = 0;
			}		
			/*--------------*/
			/*nivel 2 Ingresos*/
				/*nivel 3_1 Generales*/
				if($("#n3_1").hasClass("tree-selected")){
					vector_3[0] = 1;
					cont_n3_1++;
				}else{
					vector_3[0] = 0;
				}
				if($("#n3_2").hasClass("tree-selected")){
					vector_3[1] = 1;
					cont_n3_1++;
				}else{
					vector_3[1] = 0;
				}
				if($("#n3_3").hasClass("tree-selected")){
					vector_3[2] = 1;
					cont_n3_1++;
				}else{
					vector_3[2] = 0;
				}			
				if($("#n3_4").hasClass("tree-selected")){
					vector_3[3] = 1;
					cont_n3_1++;
				}else{
					vector_3[3] = 0;
				}
				if($("#n3_5").hasClass("tree-selected")){
					vector_3[4] = 1;
					cont_n3_1++;
				}else{
					vector_3[4] = 0;
				}							
				/*--------*/			
			if(cont_n3_1 > 0){
				vector_2[0] = 1;
				cont_n2++;
			}else{
				vector_2[0] = 0;
			}
			if($("#n2_2").hasClass("tree-selected")){
				vector_2[1] = 1;
				cont_n2++;
			}else{
				vector_2[1] = 0;
			}
			if($("#n2_3").hasClass("tree-selected")){
				vector_2[2] = 1;
				cont_n2++;
			}else{
				vector_2[2] = 0;
			}
			if($("#n2_4").hasClass("tree-selected")){
				vector_2[3] = 1;
				cont_n2++;
			}else{
				vector_2[3] = 0;
			}
			if($("#n2_5").hasClass("tree-selected")){
				vector_2[4] = 1;
				cont_n2++;
			}else{
				vector_2[4] = 0;
			}
			if($("#n2_6").hasClass("tree-selected")){
				vector_2[5] = 1;
				cont_n2++;
			}else{
				vector_2[5] = 0;
			}	
			if(cont_n2 > 0){
				vector_1[1] = 1;
			}else{
				vector_1[1] = 0;
			}
			/*---------*/			
			/*nivel 2 Procesos*/
			if($("#n2_7").hasClass("tree-selected")){
				vector_2[6] = 1;
				cont_n2_2++;
			}else{
				vector_2[6] = 0;
			}
				/*nivel 3_2 Compras*/
				if($("#n3_6").hasClass("tree-selected")){
					vector_3[5] = 1;
					cont_n3_2++;
				}else{
					vector_3[5] = 0;
				}
				if($("#n3_7").hasClass("tree-selected")){
					vector_3[6] = 1;
					cont_n3_2++;
				}else{
					vector_3[6] = 0;
				}
				/*------*/
				/*nivel 3_3 Ventas*/
				if($("#n3_8").hasClass("tree-selected")){
					vector_3[7] = 1;
					cont_n3_3++;
				}else{
					vector_3[7] = 0;
				}
				/*---------*/									
			if(cont_n3_2 > 0){
				vector_2[7] = 1;
				cont_n2_2++;
			}else{
				vector_2[7] = 0;
			}
			if(cont_n3_3 > 0){
				vector_2[8] = 1;
				cont_n2_2++;
			}else{
				vector_2[8] = 0;
			}
			if($("#n2_10").hasClass("tree-selected")){
				vector_2[9] = 1;
				cont_n2_2++;
			}else{
				vector_2[9] = 0;
			}		
			if(cont_n2_2 > 0){
				vector_1[2] = 1;
			}else{
				vector_1[2] = 0;
			}
			/*-------------*/
			/*nivel 3 Reportes*/
			if($("#n2_11").hasClass("tree-selected")){
				vector_2[10] = 1;
				cont_n3++;
			}else{
				vector_2[1] = 0;
			}
			if($("#n2_12").hasClass("tree-selected")){
				vector_2[11] = 1;
				cont_n3++;
			}else{
				vector_2[1] = 0;
			}
			if(cont_n3 > 0){
				vector_1[3] = 1;
			}else{
				vector_1[3] = 0;
			}
			/*-------------*/	
			/*nivel 4 Permisos*/
			if($("#n2_13").hasClass("tree-selected")){
				vector_2[12] = 1;
				cont_n4++;
			}else{
				vector_2[12] = 0;
			}			
			if(cont_n4 > 0){
				vector_1[4] = 1;
			}else{
				vector_1[4] = 0;
			}
			/*---------------*/				

			$.ajax({				
				type: "POST",
				data: "vector_1="+vector_1+"&vector_2="+vector_2+"&vector_3="+vector_3+"&id="+$("#txt_0").val(),		
				url: "privilegios.php",			
			    success: function(data) {		    	
		    		if(data == 0){		    			
		    			alert('Datos guardados correctamente');					    			
		    			actualizar_form();

		    		}else{		    							    			    			
		    			alert('Error al momento de modificar los permisos');					    			
		    			actualizar_form();
		    		}	    				    	
				}
			});
		}
	});
	/*--buscadores--*/
	var input_ci = $("#txt_1_chosen").children().next().children();			
	$(input_ci).on("keyup",function(input_ci){		
		var text = $(this).children().val();
		if(text != ""){			
			$.ajax({        
		        type: "POST",
		        dataType: 'json',        
	    	    url: "../carga_ubicaciones.php?tipo=0&id=0&fun=26&val="+text,        
	        	success: function(data, status) {
	        		$('#txt_1').html("");	        	
	        		for (var i = 0; i < data.length; i=i+3) {            				            		            	
			            appendToChosen(data[i],data[i+1],text,data[i+2],"txt_1","txt_1_chosen");
			          }		        
			        $('#txt_2').html("");
			        $('#txt_2').append($("<option data-extra='"+data[1]+"'></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                    
			        $("#txt_0").val(data[0])            			        
			    },
			    error: function (data) {
			        console.log(data)
		    	}	        
		    });
	    }	  
	});
	$("#txt_1").chosen().change(function (event,params){
		if(params == undefined){			
			$('#txt_1').html("");
			$('#txt_1').append($("<option></option>"));    			
			$('#txt_1').trigger('chosen:updated')
			$('#txt_2').html("");
			$('#txt_2').append($("<option></option>"));    			
			$('#txt_2').trigger('chosen:updated');			
      		$("#txt_0").val("");            
		}else{        
      var a = $("#txt_1 option:selected");            
      $('#txt_2').html("");
      $('#txt_2').append($("<option data-extra='"+$(a).text()+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');
      $("#txt_0").val($(a).val());
    }
	});	
	var input_nombre = $("#txt_2_chosen").children().next().children();			
	$(input_nombre).on("keyup",function(input_nombre){				
		var text = $(this).children().val();
		if(text != ""){
			$.ajax({        
		        type: "POST",
		        dataType: 'json',        
	    	    url: "../carga_ubicaciones.php?tipo=0&id=0&fun=27&val="+text,        
	        	success: function(data, status) {
	        		$('#txt_2').html("");	        	
	        		for (var i = 0; i < data.length; i=i+3) {            		        			
			            appendToChosen(data[i],data[i+2],text,data[i+1],"txt_2","txt_2_chosen");
			          }		        
			        $('#txt_1').html("");
			        $('#txt_1').append($("<option data-extra='"+data[2]+"'></option>").val(data[0]).html(data[1])).trigger('chosen:updated');                    
			        $("#txt_0").val(data[0])            			        
			    },
			    error: function (data) {
			        console.log(data)
		    	}	        
		    });
	    }	  
	});
	$("#txt_2").chosen().change(function (event,params){
		if(params == undefined){			
			$('#txt_2').html("");
			$('#txt_2').append($("<option></option>"));    			
			$('#txt_2').trigger('chosen:updated')
			$('#txt_1').html("");
			$('#txt_1').append($("<option></option>"));    			
			$('#txt_1').trigger('chosen:updated');			
      		$("#txt_0").val("");            
		}else{        
      var a = $("#txt_2 option:selected");            
      $('#txt_1').html("");
      $('#txt_1').append($("<option data-extra='"+$(a).text()+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');
      $("#txt_0").val($(a).val());
    }
	});	
	/*-------------*/
}
