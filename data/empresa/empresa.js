$(document).on("ready",inicio);

function inicio (){

	// inicializacion de formato txt_ telefono1
	$('#txt_3').mask('(999) 999-999');
	$('#txt_4').mask('(999) 999-999');
	$('#txt_7').mask('(999) 999-9999');
	///////////varias validaciones//////////////}
		//editables on first profile page
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>'+
                                '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';    				
	
	// *** editable avatar *** //
	try {//ie8 throws some harmless exceptions, so let's catch'em

		//first let's add a fake appendChild method for Image element for browsers that have a problem with this
		//because editable plugin calls appendChild, and it causes errors on IE at unpredicted points
		try {
			document.createElement('IMG').appendChild(document.createElement('B'));
		} catch(e) {
			Image.prototype.appendChild = function(el){}
		}

		var last_gritter
		$('#avatar').editable({
			type: 'image',
			name: 'avatar',
			value: null,
			image: {
				//specify ace file input plugin's options here
				btn_choose: 'Cambiar Imagen',
				droppable: true,
				maxSize: 110000,//~100Kb

				//and a few extra ones here
				name: 'avatar',//put the field name here as well, will be used inside the custom plugin
				on_error : function(error_type) {//on_error function will be called when the selected file has a problem
					if(last_gritter) $.gritter.remove(last_gritter);
					if(error_type == 1) {//file format error
						last_gritter = $.gritter.add({
							title: 'El archivo no es una imagen!',
							text: 'Por favor, elija un jpg | jpeg | imagen png!',
							class_name: 'gritter-error gritter-center'
						});
					} else if(error_type == 2) {//file size rror
						last_gritter = $.gritter.add({
							title: 'Archivo muy grande!',
							text: 'Tamaño de la imagen no debe superar los 100Kb!',
							class_name: 'gritter-error gritter-center'
						});
					}
					else {//other error
					}
				},
				on_success : function() {
					$.gritter.removeAll();
				}
			},
		    url: function(params) {
				// ***UPDATE AVATAR HERE*** //
				//for a working upload example you can replace the contents of this function with 
				//examples/profile-avatar-update.js

				var deferred = new $.Deferred

				var value = $('#avatar').next().find('input[type=hidden]:eq(0)').val();
				if(!value || value.length == 0) {
					deferred.resolve();
					return deferred.promise();
				}


				//dummy upload
				setTimeout(function(){
					if("FileReader" in window) {
						//for browsers that have a thumbnail of selected image
						var thumb = $('#avatar').next().find('img').data('thumb');
						if(thumb) $('#avatar').get(0).src = thumb;
					}
					
					deferred.resolve({'status':'OK'});

					if(last_gritter) $.gritter.remove(last_gritter);
					last_gritter = $.gritter.add({
						title: 'Imagen Actualizada!',
						text: 'Carga en servidor puede ser fácilmente implementado . Un ejemplo de trabajo se incluye con la plantilla.',
						class_name: 'gritter-info gritter-center'
					});
					
				 } , parseInt(Math.random() * 800 + 800))

				return deferred.promise();
				
				// ***END OF UPDATE AVATAR HERE*** //
			},
			
			success: function(response, newValue) {
			}
		})
	}catch(e) {}
	
	$('.chosen-select').chosen({allow_single_deselect:true}); 
	$(window)
	.off('resize.chosen')
	.on('resize.chosen', function() {
		$('.chosen-select').each(function() {
			var $this = $(this);			 
			$this.next().css({'width': $this.parent().width()});			 			 				 
			 
		})
	}).trigger('resize.chosen');
	//resize chosen on sidebar collapse/expand
	$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
		if(event_name != 'sidebar_collapsed') return;
		$('.chosen-select').each(function() {
			 var $this = $(this);			 
			 $this.next().css({'width': $this.parent().width()});
		})
	});

	/*-----------------------*/
	$("input").on("keyup click",function (e){//campos requeridos		
		comprobarCamposRequired(e.currentTarget.form.id);
	});		
	$("#txt_1").on("keyup",function (e){//validar ruc		
		if($("#txt_1").val().length == 13){
			ci_ruc_pass("txt_1",$("#txt_1").val(),"RUC");
		}
	});		
	carga_ubicaciones("txt_9","txt_10","txt_11");//pais provincia ciudad
	$("#txt_9").change(function(){
		change_pais("txt_9","txt_10","txt_11");
	});
	$("#txt_10").change(function(){
		change_provincia("txt_9","txt_10","txt_11");
	});	
	/*-----*/
	$("#btn_0").on("click",guardar);
	$("#btn_1").on("click",limpiar_form);
	$("#btn_2").on("click",actualizar_form);	
	$("#btn_4").on("click",function (){		
		var resp = "";		
		resp =atras($("#txt_o").val(),"empresa","secuencia.php");		
		if(resp[0] != false){
			$("#txt_o").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_12").val(resp[0][2]);
			$("#txt_2").val(resp[0][3]);
			$("#txt_13").val(resp[0][4]);
			$("#txt_3").val(resp[0][5]);
			$("#txt_4").val(resp[0][6]);			
			$("#txt_14").val(resp[0][9]);
			$("#txt_5").val(resp[0][10]);
			$("#txt_7").val(resp[0][11]);
			$("#txt_6").val(resp[0][12]);
			$("#txt_17").val(resp[0][13]);
			$("#txt_18").val(resp[0][14]);
			$("#txt_15").val(resp[0][15]);
			$("#txt_8").val(resp[0][16]);
			$("#txt_16").val(resp[0][17]);
			$("#spinner1").val(resp[0][18]);
			$("#spinner2").val(resp[0][19]);
			$("#spinner3").val(resp[0][20]);
			$("#txt_19").val(resp[0][21]);
			$("#txt_20").val(resp[0][22]);		

			$("#txt_21").val(resp[0][25]);		
			$("#txt_22").val(resp[0][26]);		
			$("#txt_23").val(resp[0][27]);		
			$("#txt_24").val(resp[0][28]);		
			$("#txt_25").val(resp[0][29]);		

			
			$("#avatar").attr("src","img/"+resp[0][23]);	
			if(resp[0][24] == "on"){
		    	$("#switch-field-1").prop("checked",true);
		    }else{
		    	$("#switch-field-1").prop("checked",false);
		    }	    		       
		    /**/
	        var prov = 0;
	        var pais = 0;
	        $.ajax({/*obtnengo el id de provincia*/
		        type: "POST",		        
		        url: "../carga_ubicaciones.php?tipo=0&id="+resp[0][7]+"&fun=5",        
		        success: function(response) {         
		        	prov = response;
		        	$.ajax({/*obtnengo el id del pais*/
				        type: "POST",			        
				        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
				        success: function(response) {         
				        	pais = response;						        	
				        	/*cambio los combos*/
						    $.ajax({        
						        type: "POST",
						        dataType: 'json',        
						        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
						        success: function(response) {         			        	
						        	$("#txt_9").html("");
						            for (var i = 0; i < response.length; i=i+2) {            				            	
						            	if(response[i] == pais){
											$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
						            	}
										else{
											$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
										}
						            }   
						            $("#txt_9").trigger("chosen:updated"); 
						            $.ajax({        
								        type: "POST",
								        dataType: 'json',        
								        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
								        success: function(response) {         			        	
								        	$("#txt_10").html("");
								            for (var i = 0; i < response.length; i=i+2) {            				            	
								            	if(response[i] == prov){
													$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
								            	}
												else{
													$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
												}
								            }   
								            $("#txt_10").trigger("chosen:updated"); 
								            $.ajax({        
										        type: "POST",
										        dataType: 'json',        
										        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
										        success: function(response) {         			        	
										        	$("#txt_11").html("");
										            for (var i = 0; i < response.length; i=i+2) {            				            	
										            	if(response[i] == resp[0][7]){
															$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
										            	}
														else{
															$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
														}
										            }   
										            $("#txt_11").trigger("chosen:updated"); 
										                                         
										        }
										    });	      
								                                         
								        }
								    });/**/		                            
						        }
						    });/**/							    
				        }                   
				    });
		        }                   
		    });	
		}else{
			alert("Sin registros anteriores");
		}		
	    comprobarCamposRequired("form_empresa");		    	            
	    $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
        /**/
	});	
	$("#btn_5").on("click",function (){		
		var resp = "";		
		resp =adelante($("#txt_o").val(),"empresa","secuencia.php");		
		if(resp[0] != false){
			$("#txt_o").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_12").val(resp[0][2]);
			$("#txt_2").val(resp[0][3]);
			$("#txt_13").val(resp[0][4]);
			$("#txt_3").val(resp[0][5]);
			$("#txt_4").val(resp[0][6]);			
			$("#txt_14").val(resp[0][9]);
			$("#txt_5").val(resp[0][10]);
			$("#txt_7").val(resp[0][11]);
			$("#txt_6").val(resp[0][12]);
			$("#txt_17").val(resp[0][13]);
			$("#txt_18").val(resp[0][14]);
			$("#txt_15").val(resp[0][15]);
			$("#txt_8").val(resp[0][16]);
			$("#txt_16").val(resp[0][17]);
			$("#spinner1").val(resp[0][18]);
			$("#spinner2").val(resp[0][19]);
			$("#spinner3").val(resp[0][20]);
			$("#txt_19").val(resp[0][21]);
			$("#txt_20").val(resp[0][22]);			
			
			$("#txt_21").val(resp[0][25]);		
			$("#txt_22").val(resp[0][26]);		
			$("#txt_23").val(resp[0][27]);		
			$("#txt_24").val(resp[0][28]);		
			$("#txt_25").val(resp[0][29]);		

			$("#avatar").attr("src","img/"+resp[0][23]);	
			if(resp[0][24] == "on"){
		    	$("#switch-field-1").prop("checked",true);
		    }else{
		    	$("#switch-field-1").prop("checked",false);
		    }	    		       
		    /**/
	        var prov = 0;
	        var pais = 0;
	        $.ajax({/*obtnengo el id de provincia*/
		        type: "POST",		        
		        url: "../carga_ubicaciones.php?tipo=0&id="+resp[0][7]+"&fun=5",        
		        success: function(response) {         
		        	prov = response;
		        	$.ajax({/*obtnengo el id del pais*/
				        type: "POST",			        
				        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
				        success: function(response) {         
				        	pais = response;						        	
				        	/*cambio los combos*/
						    $.ajax({        
						        type: "POST",
						        dataType: 'json',        
						        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
						        success: function(response) {         			        	
						        	$("#txt_9").html("");
						            for (var i = 0; i < response.length; i=i+2) {            				            	
						            	if(response[i] == pais){
											$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
						            	}
										else{
											$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
										}
						            }   
						            $("#txt_9").trigger("chosen:updated"); 
						            $.ajax({        
								        type: "POST",
								        dataType: 'json',        
								        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
								        success: function(response) {         			        	
								        	$("#txt_10").html("");
								            for (var i = 0; i < response.length; i=i+2) {            				            	
								            	if(response[i] == prov){
													$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
								            	}
												else{
													$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
												}
								            }   
								            $("#txt_10").trigger("chosen:updated"); 
								            $.ajax({        
										        type: "POST",
										        dataType: 'json',        
										        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
										        success: function(response) {         			        	
										        	$("#txt_11").html("");
										            for (var i = 0; i < response.length; i=i+2) {            				            	
										            	if(response[i] == resp[0][7]){
															$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
										            	}
														else{
															$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
														}
										            }   
										            $("#txt_11").trigger("chosen:updated"); 
										                                         
										        }
										    });	      
								                                         
								        }
								    });/**/		                            
						        }
						    });/**/							    
				        }                   
				    });
		        }                   
		    });	
		}else{
			alert("Sin registros anteriores");
		}		
	    comprobarCamposRequired("form_empresa");		    	            
	    $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
        /**/
		});	

	/*-----*/    
	
    /*jqgrid*/    
	jQuery(function($) {
	    var grid_selector = "#table";
	    var pager_selector = "#pager";
	    
	    //cambiar el tamaño para ajustarse al tamaño de la página
	    $(window).on('resize.jqGrid', function () {
	        //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());	        
	        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
	        
	    })
	    //cambiar el tamaño de la barra lateral collapse/expand
	    var parent_column = $(grid_selector).closest('[class*="col-"]');
	    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
	        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
	            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
	            setTimeout(function() {
	                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
	            }, 0);
	        }
	    })

	    jQuery(grid_selector).jqGrid({	        
	        datatype: "xml",
	        url: 'xml_empresa.php',        
	        colNames: ['ID','RUC','EMPRESA','PROPIETARIO','SLOGAN','TELEFONO','CELULAR','id_ciudad','CIUDAD','DIRECCION','CORREO','FAX','WEB','CONTADOR','AUTORIZACION SRI','ASCESOR','REPRESENTANTE','CI REPRESENTANTE','NRO FACTURA','ITEM FACTURA','AÑO CONTABLE','COSTEO','COMENTARIO','IMAGEN','ESTADO','RUC CONTADOR','SERIE RETENCIÓN','AUTORIZACIÓN RETENCIÓN','SERIE NOTA DE CRÉDITO','AUTORIZACIÓN NOTA DE CRÉDITO'],
	        colModel:[      
            	{name:'txt_o',index:'id_empresa',frozen:true,align:'left',search:false},
            	{name:'txt_1',index:'ruc_empresa',frozen:true,align:'left',search:false},
            	{name:'txt_12',index:'nombre_empresa',frozen:true,align:'left',search:false},
            	{name:'txt_2',index:'propietario',frozen:true,align:'left',search:false},
            	{name:'txt_13',index:'slogan',frozen:true,align:'left',search:false},
            	{name:'txt_3',index:'telefono1',frozen:true,align:'left',search:false},
            	{name:'txt_4',index:'telefono2',frozen:true,align:'left',search:false},
            	{name:'txt_11',index:'ciudad ',frozen:true,align:'left',search:false},
            	{name:'descripcion',index:'descripcion',frozen:true,align:'left',search:false},
            	{name:'txt_14',index:'direccion',frozen:true,align:'left',search:false},
            	{name:'txt_5',index:'correo',frozen:true,align:'left',search:false},
            	{name:'txt_7',index:'fax',frozen:true,align:'left',search:false},
            	{name:'txt_6',index:'sitio_web',frozen:true,align:'left',search:false},
            	{name:'txt_17',index:'nombre_contador',frozen:true,align:'left',search:false},
            	{name:'txt_18',index:'autorizacion_sri',frozen:true,align:'left',search:false},
            	{name:'txt_15',index:'ascesor_legar',frozen:true,align:'left',search:false},
            	{name:'txt_8',index:'representante_legal',frozen:true,align:'left',search:false},
            	{name:'txt_16',index:'identificacion_repre',frozen:true,align:'left',search:false},
            	{name:'spinner1',index:'inicio_fac_preimpresa',frozen:true,align:'left',search:false},
            	{name:'spinner2',index:'item_factura',frozen:true,align:'left',search:false},
            	{name:'spinner3',index:'anio_contable',frozen:true,align:'left',search:false},
            	{name:'txt_19',index:'modo_costeo',frozen:true,align:'left',search:false},
            	{name:'txt_20',index:'comentario',frozen:true,align:'left',search:false},
            	{name:'avatar',index:'imagen',frozen:true,align:'left',search:false},
            	{name:'estado',index:'estado',frozen:true,align:'left',search:false},
            	{name:'txt_21',index:'ruc_contador',frozen:true,align:'left',search:false},
            	{name:'txt_22',index:'serie_retencion',frozen:true,align:'left',search:false},
            	{name:'txt_23',index:'autorizacion_retencion',frozen:true,align:'left',search:false},
            	{name:'txt_24',index:'serie_nota_credito',frozen:true,align:'left',search:false},
            	{name:'txt_25',index:'autorizacion_nota_credito',frozen:true,align:'left',search:false},

            ],
           	rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:200,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id_empresa',
	        sortorder: 'asc',
	        caption: 'LISTA DE 	EMPRESAS',	        
	        
	        altRows: true,
	        multiselect: false,
	        multiboxonly: true,
	        viewrecords : true,
	        loadComplete : function() {
	            var table = this;
	            setTimeout(function(){
	                styleCheckbox(table);
	                updateActionIcons(table);
	                updatePagerIcons(table);
	                enableTooltips(table);
	            }, 0);
	        },
	        ondblClickRow: function(rowid) {     	            	            
	            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);       	            
	            $("#txt_o").val(ret.txt_o);
	            $("#txt_1").val(ret.txt_1);
	            $("#txt_2").val(ret.txt_2);
	            $("#txt_3").val(ret.txt_3);
	            $("#txt_4").val(ret.txt_4);
	            $("#txt_5").val(ret.txt_5);
	            $("#txt_6").val(ret.txt_6);
	            $("#txt_7").val(ret.txt_7);
	            $("#txt_8").val(ret.txt_8);
	            $("#txt_12").val(ret.txt_12);
	            $("#txt_13").val(ret.txt_13);
	            $("#txt_14").val(ret.txt_14);
	            $("#txt_15").val(ret.txt_15);
	            $("#txt_16").val(ret.txt_16);
	            $("#txt_17").val(ret.txt_17);
	            $("#txt_18").val(ret.txt_18);
	            $("#txt_19").val(ret.txt_19);
	            $("#txt_20").val(ret.txt_20);
	            $("#spinner1").val(ret.spinner1);
	            $("#spinner2").val(ret.spinner2);
	            $("#spinner3").val(ret.spinner3);

	            $("#txt_21").val(ret.txt_21)
				$("#txt_22").val(ret.txt_22)
				$("#txt_23").val(ret.txt_23)
				$("#txt_24").val(ret.txt_24)
				$("#txt_25").val(ret.txt_25)
	            
	            if(ret.estado == "on"){
	            	$("#switch-field-1").prop("checked",true);
	            }else{
	            	$("#switch-field-1").prop("checked",false);
	            }
	            $("#avatar").attr("src","img/"+ret.avatar);	
	            /**/
	            var prov = 0;
	            var pais = 0;
	            $.ajax({/*obtnengo el id de provincia*/
			        type: "POST",			        
			        url: "../carga_ubicaciones.php?tipo=0&id="+ret.txt_11+"&fun=5",        
			        success: function(response) {         
			        	prov = response;
			        	$.ajax({/*obtnengo el id del pais*/
					        type: "POST",			        
					        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=6",        
					        success: function(response) {         
					        	pais = response;						        	
					        	/*cambio los combos*/
							    $.ajax({        
							        type: "POST",
							        dataType: 'json',        
							        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
							        success: function(response) {         			        	
							        	$("#txt_9").html("");
							            for (var i = 0; i < response.length; i=i+2) {            				            	
							            	if(response[i] == pais){
												$("#txt_9").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
							            	}
											else{
												$("#txt_9").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
											}
							            }   
							            $("#txt_9").trigger("chosen:updated"); 
							            $.ajax({        
									        type: "POST",
									        dataType: 'json',        
									        url: "../carga_ubicaciones.php?tipo=0&id="+pais+"&fun=2",        
									        success: function(response) {         			        	
									        	$("#txt_10").html("");
									            for (var i = 0; i < response.length; i=i+2) {            				            	
									            	if(response[i] == prov){
														$("#txt_10").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
									            	}
													else{
														$("#txt_10").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
													}
									            }   
									            $("#txt_10").trigger("chosen:updated"); 
									            $.ajax({        
											        type: "POST",
											        dataType: 'json',        
											        url: "../carga_ubicaciones.php?tipo=0&id="+prov+"&fun=3",        
											        success: function(response) {         			        	
											        	$("#txt_11").html("");
											            for (var i = 0; i < response.length; i=i+2) {            				            	
											            	if(response[i] == ret.txt_11){
																$("#txt_11").append("<option value ="+response[i]+" selected>"+response[i+1]+"</option>");            																																
											            	}
															else{
																$("#txt_11").append("<option value ="+response[i]+">"+response[i+1]+"</option>");            																																
															}
											            }   
											            $("#txt_11").trigger("chosen:updated"); 
											                                         
											        }
											    });	      
									                                         
									        }
									    });/**/		                            
							        }
							    });/**/							    
					        }                   
					    });
			        }                   
			    });			    	            
	            /**/
	            $('#myModal').modal('hide');
	            comprobarCamposRequired("form_empresa");  
	            $("#btn_0").text("");
	            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
	        },
	        
	        caption: "LISTA DE USUARIOS"
	    });
		jQuery(grid_selector).jqGrid('hideCol', "txt_o");
		jQuery(grid_selector).jqGrid('hideCol', "txt_11");
		jQuery(grid_selector).jqGrid('hideCol', "txt_4");
		jQuery(grid_selector).jqGrid('hideCol', "estado");
		jQuery(grid_selector).jqGrid('hideCol', "avatar");
		jQuery(grid_selector).jqGrid('hideCol', "extranjero");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_5");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_21");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_22");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_23");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_24");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_25");		
		
		jQuery(grid_selector).jqGrid('hideCol', "spinner1");
		jQuery(grid_selector).jqGrid('hideCol', "spinner2");
		jQuery(grid_selector).jqGrid('hideCol', "spinner3");
		jQuery(grid_selector).jqGrid('hideCol', "txt_19");
		jQuery(grid_selector).jqGrid('hideCol', "txt_20");
	    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

	    function aceSwitch( cellvalue, options, cell ) {
	        setTimeout(function(){
	            $(cell) .find('input[type=checkbox]')
	            .addClass('ace ace-switch ace-switch-5')
	            .after('<span class="lbl"></span>');
	        }, 0);
	    }	    	   
	    //navButtons
	    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
	    {   //navbar options
	        edit: false,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: false,
	        addicon : 'ace-icon fa fa-plus-circle purple',
	        del: false,
	        delicon : 'ace-icon fa fa-trash-o red',
	        search: true,
	        searchicon : 'ace-icon fa fa-search orange',
	        refresh: true,
	        refreshicon : 'ace-icon fa fa-refresh green',
	        view: true,
	        viewicon : 'ace-icon fa fa-search-plus grey'
	    },
	    {	        
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        //new record form
	        //width: 700,
	        closeAfterAdd: true,
	        recreateForm: true,
	        viewPagerButtons: false,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);
	        }
	    },
	    {
	        //delete record form
	        recreateForm: true,
	        beforeShowForm : function(e) {
	            var form = $(e[0]);
	            if(form.data('styled')) return false;
	                
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	            style_delete_form(form);
	                
	            form.data('styled', true);
	        },
	        onClick : function(e) {
	            //alert(1);
	        }
	    },
	    {
	          recreateForm: true,
	        afterShowSearch: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	            style_search_form(form);
	        },
	        afterRedraw: function(){
	            style_search_filters($(this));
	        }
	        ,
	        //multipleSearch: true
	        overlay: false,
	        sopt: ['eq', 'cn'],
            defaultSearch: 'eq',            	       
	      },
	    {
	        //view record form
	        recreateForm: true,
	        beforeShowForm: function(e){
	            var form = $(e[0]);
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
	        }
	    })	    
	    function style_edit_form(form) {
	        //enable datepicker on "sdate" field and switches for "stock" field
	        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
	        
	        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
	        //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
	        //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

	                
	        //update buttons classes
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
	        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
	        
	        buttons = form.next().find('.navButton a');
	        buttons.find('.ui-icon').hide();
	        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
	        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
	    }

	    function style_delete_form(form) {
	        var buttons = form.next().find('.EditButton .fm-button');
	        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
	        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
	        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
	    }
	    
	    function style_search_filters(form) {
	        form.find('.delete-rule').val('X');
	        form.find('.add-rule').addClass('btn btn-xs btn-primary');
	        form.find('.add-group').addClass('btn btn-xs btn-success');
	        form.find('.delete-group').addClass('btn btn-xs btn-danger');
	    }
	    function style_search_form(form) {
	        var dialog = form.closest('.ui-jqdialog');
	        var buttons = dialog.find('.EditTable')
	        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
	        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
	        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
	    }
	    
	    function beforeDeleteCallback(e) {
	        var form = $(e[0]);
	        if(form.data('styled')) return false;
	        
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_delete_form(form);
	        
	        form.data('styled', true);
	    }
	    
	    function beforeEditCallback(e) {
	        var form = $(e[0]);
	        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
	        style_edit_form(form);
	    }



	    //it causes some flicker when reloading or navigating grid
	    //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
	    //or go back to default browser checkbox styles for the grid
	    function styleCheckbox(table) {
	        /**
	                    $(table).find('input:checkbox').addClass('ace')
	                    .wrap('<label />')
	                    .after('<span class="lbl align-top" />')


	                    $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
	                    .find('input.cbox[type=checkbox]').addClass('ace')
	                    .wrap('<label />').after('<span class="lbl align-top" />');
	         */
	    }
	    

	    //unlike navButtons icons, action icons in rows seem to be hard-coded
	    //you can change them like this in here if you want
	    function updateActionIcons(table) {
	        /**
	                    var replacement = 
	                    {
	                            'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
	                            'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
	                            'ui-icon-disk' : 'ace-icon fa fa-check green',
	                            'ui-icon-cancel' : 'ace-icon fa fa-times red'
	                    };
	                    $(table).find('.ui-pg-div span.ui-icon').each(function(){
	                            var icon = $(this);
	                            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	                            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	                    })
	         */
	    }
	    
	    //replace icons with FontAwesome icons like above
	    function updatePagerIcons(table) {
	        var replacement = 
	            {
	            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
	            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
	            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
	            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
	        };
	        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
	            var icon = $(this);
	            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	            
	            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	        })
	    }

	    function enableTooltips(table) {
	        $('.navtable .ui-pg-button').tooltip({container:'body'});
	        $(table).find('.ui-pg-div').tooltip({container:'body'});
	    }

	    //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

	    $(document).one('ajaxloadstart.page', function(e) {
	        $(grid_selector).jqGrid('GridUnload');
	        $('.ui-jqdialog').remove();
	    });
	});
    /**/    
}
function guardar(){///funcion para guardar datos
	var resp=comprobarCamposRequired("form_empresa");	    
	if(resp==true){    		
		$("#form_empresa").on("submit",function (e){				
			var texto=($("#btn_0").text()).trim();															
			var valores = $("#form_empresa").serialize();
			if(texto=="Guardar"){ 
				if($("#txt_11").val() != null){					
					guardar_datos(valores,"g",e);											
				}else{
					alert("Indique una ciudad antes de continuar");
				}     					                	
	        }else{
	            if($("#txt_11").val() != null){					
					guardar_datos(valores,"m",e);											
				}else{
					alert("Indique una ciudad antes de continuar");
				}     		 					                	
	        }	
	        e.preventDefault();
    		$(this).unbind("submit")		    			            			
		});			
	}				 
}
function guardar_datos(valores,tipo,p){		
	$.ajax({
	    url: "empresa.php", 	    				    	    
	    data:  valores + "&img="+$("#avatar")[0].src + "&tipo="+tipo, 	    	    
	    type: "POST",				
	    success: function(data){				    
	    	if( data == 0 ){
	    		alert('Datos Agregados Correctamente');	
	    		limpiar_form(p);	
	    		$('#table').trigger('reloadGrid');					
	    	}else{
	    		alert('Error al momento de guardar. Intente nuevamente');	
	    		actualizar_form();
	    	}
		},		
	}); 
}