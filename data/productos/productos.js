$(document).on("ready",inicio);
    
function inicio (){
	///////////varias validaciones//////////////}					
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
				maxSize: 1110000,//~100Kb

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
	}catch(e) {

	}		
	////////////////////////////////////////////			
	/*funcion inicial de la imagen y  buscadores del select no topar plz*/	
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
	        url: 'xml_producto.php',        
	        colNames: ['id_producto','CÓDIGO','CÓDIGO BARRAS','NOMBRE PRODUCTO','PRECIO','UTILIDAD MINORISTA','UTILIDAD MAYORISTA','PRECIO MINORISTA','PRECIO MAYORISTA','id_tipo','STOCK','id_categoria','id_marca','id_bodega','id_unidad','CANTIDAD','FACTURAR EXITENCIA','CANITDAD MINIMA','CANTIDAD MAXIMA','id_series_venta','EXPIRACION','COMENTARIO','IMAGEN','ESTADO','CREACIÓN','id_porcentaje_iva','id_usuario','INCLUYE IVA','DESCUENTO','GRUPO'],
	        colModel:[      
	            {name:'txt_0',index:'txt_0',frozen:true,align:'left',search:false},
	            {name:'txt_1',index:'codigo',frozen : true,align:'left',search:true},
	            {name:'txt_8',index:'codigo_barras',frozen : true,align:'left',search:true},
	            {name:'txt_2',index:'descripcion',frozen : true,align:'left',search:true},
	            {name:'txt_9',index:'precio',frozen : true,align:'left',search:false},
	            {name:'txt_3',index:'utilidad_minorista',frozen : true,align:'left',search:false},
	            {name:'txt_10',index:'utilidad_mayorista',frozen : true,align:'left',search:false},
	            {name:'txt_4',index:'precio_minorista',frozen : true,align:'left',search:false},
	            {name:'txt_11',index:'precio_mayorista',frozen : true,align:'left',search:false},
	            {name:'txt_5',index:'id_tipo',frozen : true,align:'left',search:false},	            
	            {name:'txt_12',index:'stock',frozen : true,align:'left',search:false},
	            {name:'txt_6',index:'id_categoria',frozen : true,align:'left',search:false},	            
	            {name:'txt_13',index:'id_marca',frozen : true,align:'left',search:false},
	            {name:'txt_7',index:'id_bodega',frozen : true,align:'left',search:false},
	            {name:'txt_14',index:'id_unidad',frozen : true,align:'left',search:false},
	            {name:'txt_15',index:'cantidad',frozen : true,align:'left',search:false},
	            {name:'sin_existencia',index:'facturar_existencia',frozen : true,align:'left',search:false},	            
	            {name:'txt_16',index:'cantidad_minima',frozen : true,align:'left',search:false},
	            {name:'txt_17',index:'cantidad_maxima',frozen : true,align:'left',search:false},
	            {name:'producto_series',index:'id_series_venta',frozen : true,align:'left',search:false},
	            {name:'expiracion_producto',index:'expiracion',frozen : true,align:'left',search:false},	            
	            {name:'txt_18',index:'comentario',frozen : true,align:'left',search:false},	            
	            {name:'avatar',index:'imagen',frozen : true,align:'left',search:false},	            
	            {name:'producto_activo',index:'estado',frozen : true,align:'left',search:false},
	            {name:'fecha_creacion',index:'fecha_creacion',frozen : true,align:'left',search:false},
	            {name:'iva_producto',index:'id_porcentaje_iva',frozen : true,align:'left',search:false},	            	            
	            {name:'id_usuario',index:'id_usuario',frozen : true,align:'left',search:false},	            	            
	            {name:'incluye_iva',index:'incluye_iva',frozen : true,align:'left',search:false},	            	            
	            {name:'descuento',index:'descuento',frozen : true,align:'left',search:false},	            	            
	            {name:'grupo_contable',index:'grupo_contable',frozen : true,align:'left',search:false},	            	            

	        ],          
	        rowNum: 10,       
	        width:600,
	        shrinkToFit: false,
	        height:200,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id_productos',
	        sortorder: 'asc',
	        caption: 'LISTA DE PRODUCTOS',	        
	        
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
            	//console.log(ret)   	            	                       
            	$("#txt_9").attr("readonly",true);
				$("#txt_12").attr("readonly",true);
            	$("#avatar").attr("src","img/"+ret.avatar);
            	$("#descuento").val(ret.descuento);
            	if(ret.expiracion_producto == "Si"){
			    	$("#expiracion_producto").prop("checked",true);
			    }else{
			    	$("#expiracion_producto").prop("checked",false);
			    }
			    if(ret.incluye_iva == "Si"){
			    	$("#incluye_iva").prop("checked",true);
			    }else{
			    	$("#incluye_iva").prop("checked",false);
			    }
			    $("#iva_producto").val(ret.iva_producto);
				$("#iva_producto").trigger("chosen:updated");
				if(ret.producto_activo == "Si"){
			    	$("#producto_activo").prop("checked",true);
			    }else{
			    	$("#producto_activo").prop("checked",false);
			    }
			    if(ret.producto_series == "Si"){
			    	$("#producto_series").prop("checked",true);
			    }else{
			    	$("#producto_series").prop("checked",false);
			    }
			    if(ret.sin_existencia == "Si"){
			    	$("#sin_existencia").prop("checked",true);
			    }else{
			    	$("#sin_existencia").prop("checked",false);
			    }
			    $("#txt_0").val(ret.txt_0);		    
			    $("#txt_1").val(ret.txt_1);		    
			    $("#txt_2").val(ret.txt_2);		    
			    $("#txt_3").val(ret.txt_3);	
			    $("#txt_4").val(ret.txt_4);		    	    
			    $("#txt_5").val(ret.txt_5);		   			     
			    $("#txt_5").trigger("chosen:updated");		            	          
			    $("#txt_6").val(ret.txt_6);		   			     
			    $("#txt_6").trigger("chosen:updated");		            	          
			    $("#txt_7").val(ret.txt_7);		   			     
			    $("#txt_7").trigger("chosen:updated");		            	          
				$("#txt_8").val(ret.txt_8);		    	    
				$("#txt_9").val(ret.txt_9);		    	    
				$("#txt_10").val(ret.txt_10);	
				$("#txt_11").val(ret.txt_11);	
				$("#txt_12").val(ret.txt_12);	
				$("#txt_13").val(ret.txt_13);		   			     
			    $("#txt_13").trigger("chosen:updated");		            	          
			    $("#txt_14").val(ret.txt_14);		   			     
			    $("#txt_14").trigger("chosen:updated");		            	          
			    $("#txt_15").val(ret.txt_15);	
			    $("#txt_16").val(ret.txt_16);	
			    $("#txt_17").val(ret.txt_17);	
			    $("#txt_18").val(ret.txt_18);
			    $("#grupo_contable").val(ret.grupo_contable);
				$("#grupo_contable").trigger("chosen:updated");		            	  
	            $('#myModal').modal('hide');
	            comprobarCamposRequired("form_productos");  
	            $("#btn_0").text("");
	            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
	        },
	        
	        caption: "LISTA DE PRODUCTOS"
	    });
		jQuery(grid_selector).jqGrid('hideCol', "txt_0");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_3");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_10");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_4");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_11");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_5");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_6");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_13");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_7");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_14");		
		jQuery(grid_selector).jqGrid('hideCol', "txt_15");	
		jQuery(grid_selector).jqGrid('hideCol', "txt_16");			
		jQuery(grid_selector).jqGrid('hideCol', "txt_17");	
		jQuery(grid_selector).jqGrid('hideCol', "avatar");		
		jQuery(grid_selector).jqGrid('hideCol', "descuento");	
		jQuery(grid_selector).jqGrid('hideCol', "producto_series");	
		jQuery(grid_selector).jqGrid('hideCol', "incluye_iva");	
		jQuery(grid_selector).jqGrid('hideCol', "id_usuario");	
		jQuery(grid_selector).jqGrid('hideCol', "fecha_creacion");	
		jQuery(grid_selector).jqGrid('hideCol', "iva_producto");
		jQuery(grid_selector).jqGrid('hideCol', "txt_18");		
		jQuery(grid_selector).jqGrid('hideCol', "producto_activo");	
		jQuery(grid_selector).jqGrid('hideCol', "expiracion_producto");	
		jQuery(grid_selector).jqGrid('hideCol', "sin_existencia");	


		
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
	// dar valor inicial para convertir input en spinner o seleccion			
	$('#txt_12').ace_spinner({value:0,min:0,step:1,max:9999,btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'})
	$('#txt_16').ace_spinner({value:0,min:0,max:9999,step:1, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'})
	$('#txt_17').ace_spinner({value:0,min:0,step:1,max:9999, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'})	
	$('#descuento').ace_spinner({value:0,min:0,step:1,max:9999, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'})	
	// fin dar valor inicial a los espinner		
	carga_detalles_productos("txt_5",'7');//el producto es y el numero de funcion
	carga_detalles_productos("txt_6",'8');//categorias y el numero de funcion
	carga_detalles_productos("txt_7",'9');//asignado a y el numero de funcion
	carga_detalles_productos("txt_13",'10');//asignado a y el numero de funcion
	carga_detalles_productos_1("txt_14",'11');//asignado a y el numero de funcion
    carga_detalles_productos("iva_producto",'31');
    carga_detalles_productos("grupo_contable",'39');//GRUPO  y el numero de funcion
  	
	////////////////////////
	/*guardar categorias productos*/
	$("#guardarCategoriaProducto").on("click",guardarCategoriaProducto);
	/*---------------------------*/
	/*guardar asisgnacion del producto*/
	$("#btn_guardarAsignacion").on("click",guardarAsignacion);
	/*---------------------------*/
	/*guardar marcs del producto*/
	$("#btn_guardarMarcaProducto").on("click",guardarMarcaProducto);
	/*---------------------------*/	
	/*change se vende por*/
	$("#txt_14").on("change",function(e){
		var extra_data = $("#txt_14").find(":selected").data("foo");		
		$("#txt_15").val(extra_data);
	});
	$("#btn_guardarSevende").on("click",guardarSevende);
	/*--------------*/
	/*procesos productos*/
	$("#btn_0").on("click",guardar_productos);
	$("#btn_1").on("click",limpiar_form);
	$("#btn_2").on("click",actualizar_form);	
	$("#btn_4").on("click",function (){		
		$("#txt_9").attr("readonly",true);
		$("#txt_12").attr("readonly",true);
		var resp = "";		
		resp =atras($("#txt_0").val(),"productos","secuencia.php");	
		console.log(resp)	
		if(resp[0] != false){
			$("#txt_0").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_8").val(resp[0][2]);
			$("#txt_2").val(resp[0][3]);
			$("#txt_9").val(resp[0][4]);		
			$("#txt_3").val(resp[0][5]);
			$("#txt_10").val(resp[0][6]);
			$("#txt_4").val(resp[0][7]);		
			$("#txt_11").val(resp[0][8]);
			$("#txt_5").val(resp[0][9]);
			$("#txt_5").trigger("chosen:updated");
		    $("#txt_12").val(resp[0][10]);
		    $("#txt_6").val(resp[0][11]);
			$("#txt_6").trigger("chosen:updated");
			$("#txt_13").val(resp[0][12]);
			$("#txt_13").trigger("chosen:updated");
		    $("#txt_7").val(resp[0][13]);		    
		    $("#txt_7").trigger("chosen:updated");
		    $("#txt_14").val(resp[0][14]);		    
		    $("#txt_14").trigger("chosen:updated");
		    $("#txt_15").val(resp[0][15]);		    
		    if(resp[0][16] == "Si"){
		    	$("#sin_existencia").prop("checked",true);
		    }else{
		    	$("#sin_existencia").prop("checked",false);
		    }

		    $("#txt_16").val(resp[0][17]);		    
		    $("#txt_17").val(resp[0][18]);	

		    if(resp[0][19] == "Si"){
		    	$("#producto_series").prop("checked",true);
		    }else{
		    	$("#producto_series").prop("checked",false);
		    }
		    if(resp[0][20] == "Si"){
		    	$("#expiracion_producto").prop("checked",true);
		    }else{
		    	$("#expiracion_producto").prop("checked",false);
		    }
		    $("#txt_18").val(resp[0][21]);		 
		    $("#avatar").attr("src","img/"+resp[0][22]);		    
		    if(resp[0][23] == "Si"){
		    	$("#producto_activo").prop("checked",true);
		    }else{
		    	$("#producto_activo").prop("checked",false);
		    }
		    $("#iva_producto").val(resp[0][25]);		    
		    $("#iva_producto").trigger("chosen:updated");			
		    if(resp[0][27] == "Si"){
		    	$("#incluye_iva").prop("checked",true);
		    }else{
		    	$("#incluye_iva").prop("checked",false);
		    }			
			$("#descuento").val(resp[0][28]);		 
			$("#grupo_contable").val(resp[0][29]);		    
		    $("#grupo_contable").trigger("chosen:updated");
				    		    
		    /**/	        
		}else{
			alert("Sin registros anteriores");
		}		
	    comprobarCamposRequired("form_productos");		    	            
	    $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
        /**/
	});
	$("#btn_5").on("click",function (){		
		var resp = "";	
		$("#txt_9").attr("readonly",true);
		$("#txt_12").attr("readonly",true);	
		resp =adelante($("#txt_0").val(),"productos","secuencia.php");	
		//console.log(resp)	
		if(resp[0] != false){
			$("#txt_0").val(resp[0][0]);
			$("#txt_1").val(resp[0][1]);
			$("#txt_8").val(resp[0][2]);
			$("#txt_2").val(resp[0][3]);
			$("#txt_9").val(resp[0][4]);		
			$("#txt_3").val(resp[0][5]);
			$("#txt_10").val(resp[0][6]);
			$("#txt_4").val(resp[0][7]);		
			$("#txt_11").val(resp[0][8]);
			$("#txt_5").val(resp[0][9]);
			$("#txt_5").trigger("chosen:updated");
		    $("#txt_12").val(resp[0][10]);
		    $("#txt_6").val(resp[0][11]);
			$("#txt_6").trigger("chosen:updated");		    
		    $("#txt_13").val(resp[0][12]);
			$("#txt_13").trigger("chosen:updated");
		    $("#txt_7").val(resp[0][13]);		    
		    $("#txt_7").trigger("chosen:updated");
		    $("#txt_14").val(resp[0][14]);		    
		    $("#txt_14").trigger("chosen:updated");
		    $("#txt_15").val(resp[0][15]);		    
		    if(resp[0][16] == "Si"){
		    	$("#sin_existencia").prop("checked",true);
		    }else{
		    	$("#sin_existencia").prop("checked",false);
		    }

		    $("#txt_16").val(resp[0][17]);		    
		    $("#txt_17").val(resp[0][18]);	

		    if(resp[0][19] == "Si"){
		    	$("#producto_series").prop("checked",true);
		    }else{
		    	$("#producto_series").prop("checked",false);
		    }
		    if(resp[0][20] == "Si"){
		    	$("#expiracion_producto").prop("checked",true);
		    }else{
		    	$("#expiracion_producto").prop("checked",false);
		    }
		    $("#txt_18").val(resp[0][21]);		 
		    $("#avatar").attr("src","img/"+resp[0][22]);		    
		    if(resp[0][23] == "Si"){
		    	$("#producto_activo").prop("checked",true);
		    }else{
		    	$("#producto_activo").prop("checked",false);
		    }
		    $("#iva_producto").val(resp[0][25]);		    
		    $("#iva_producto").trigger("chosen:updated");			
		    if(resp[0][27] == "Si"){
		    	$("#incluye_iva").prop("checked",true);
		    }else{
		    	$("#incluye_iva").prop("checked",false);
		    }			
			$("#descuento").val(resp[0][28]);		 
			$("#grupo_contable").val(resp[0][29]);		    
		    $("#grupo_contable").trigger("chosen:updated");
				    		    
		    /**/	        
		}else{
			alert("Sin registros anteriores");
		}		
	    comprobarCamposRequired("form_productos");		    	            
	    $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     	            
        /**/
	});
	/*-----------------*/
	$("input").on("keyup click",function (e){//campos requeridos				
		comprobarCamposRequired(e.currentTarget.form.id);
	});	
}

function guardarCategoriaProducto(){	
	var resp=comprobarCamposRequired("form_categoriasProductos");	    	
	if(resp==true){    		
		$("#form_categoriasProductos").on("submit",function (e){												
			var texto=($("#guardarCategoriaProducto").text()).trim();																		
			if(texto=="Guardar"){ 				
				guardar_categoriaProducto("add",e);							  					                	
	        }
	        e.preventDefault();
    		$(this).unbind("submit")		    			            			
		});	
		
	}				 
}
function guardar_categoriaProducto(tipo,p){		
	$.ajax({
	    url: "../categorias/categorias.php", 	    				    	    
	    data:  "nombre_categoria="+$("#txt_categoriaProducto").val() + "&oper="+tipo, 	    	    	    
	    type: "POST",				
	    success: function(data){	    	
	    	if( data == 2 ){		    		
	    		carga_detalles_productos("txt_6",'8');//categorias y el numero de funcion	    		
	    		alert('Datos Agregados Correctamente');	
	    		limpiar_form(p);		    		
	    	}else{
	    		if( data == 1 ){	    		
	    			alert('Esta categoría ya existe. Ingrese otra')	;
	    			$("#txt_categoriaProducto").val("");
	    			$("#txt_categoriaProducto").focus();
	    		}
	    	}
		},		
	}); 
}
function guardarAsignacion(){	
	var resp=comprobarCamposRequired("form_asignarProducto");	    	
	if(resp==true){    		
		$("#form_asignarProducto").on("submit",function (e){												
			var texto=($("#btn_guardarAsignacion").text()).trim();																		
			if(texto=="Guardar"){ 				
				guardar_asignacionProducto("add",e);							  					                	
	        }
	        e.preventDefault();
    		$(this).unbind("submit")		    			            			
		});	
		
	}				 
}
function guardar_asignacionProducto(tipo,p){		
	$.ajax({
	    url: "../bodegas/bodegas.php", 	    				    	    
	    data:  "nombre_bodega="+$("#txt_descripcionBodega").val() + "&oper="+tipo+ "&ubicacion_bodega="+$("#txt_ubicacionProducto").val(), 	    	    	    
	    type: "POST",				
	    success: function(data){	    	
	    	if( data == 2 ){		    		
	    		carga_detalles_productos("txt_7",'9');//categorias y el numero de funcion	    		
	    		alert('Datos Agregados Correctamente');	
	    		limpiar_form(p);		    		
	    	}else{
	    		if( data == 1 ){	    		
	    			alert('Esta bodega ya existe. Ingrese otra')	;
	    			$("#txt_descripcionBodega").val("");
	    			$("#txt_descripcionBodega").focus();
	    		}
	    	}
		},		
	}); 
}
function guardarMarcaProducto(){	
	var resp=comprobarCamposRequired("form_marcasProducto");	    	
	if(resp==true){    		
		$("#form_marcasProducto").on("submit",function (e){												
			var texto=($("#btn_guardarMarcaProducto").text()).trim();																		
			if(texto=="Guardar"){ 				
				guardar_marcaProducto("add",e);							  					                	
	        }
	        e.preventDefault();
    		$(this).unbind("submit")		    			            			
		});	
		
	}				 
}
function guardar_marcaProducto(tipo,p){		
	$.ajax({
	    url: "../marcas/marcas.php", 	    				    	    
	    data:  "nombre_marca="+$("#txt_marcaProductos").val() + "&oper="+tipo, 	    	    	    
	    type: "POST",				
	    success: function(data){	    	
	    	if( data == 2 ){		    		
	    		carga_detalles_productos("txt_13",'10');//marcas y el numero de funcion	    		
	    		alert('Datos Agregados Correctamente');	
	    		limpiar_form(p);		    		
	    	}else{
	    		if( data == 1 ){	    		
	    			alert('Esta marca ya existe. Ingrese otra')	;
	    			$("#txt_marcaProductos").val("");
	    			$("#txt_marcaProductos").focus();
	    		}
	    	}
		},		
	}); 
}
function guardarSevende(){	
	var resp=comprobarCamposRequired("form_sevende");	    	
	if(resp==true){    		
		$("#form_sevende").on("submit",function (e){												
			var texto=($("#btn_guardarSevende").text()).trim();																		
			if(texto=="Guardar"){ 				
				guardar_seVende("add",e);							  					                	
	        }
	        e.preventDefault();
    		$(this).unbind("submit")		    			            			
		});	
		
	}				 
}
function guardar_seVende(tipo,p){		
	$.ajax({
	    url: "../unidad_medida/unidad_medida.php", 	    				    	    
	    data:  "descripcion="+$("#txt_descripcionUnidades").val() + "&oper="+tipo+ "&abreviatura="+$("#txt_abreviatura").val()+"&cantidad="+$("#txt_cantidadSevende").val(), 	    	    	    
	    type: "POST",				
	    success: function(data){	    	
	    	if( data == 2 ){		    		
	    		carga_detalles_productos_1("txt_14",'11');//marcas y el numero de funcion	    		
	    		alert('Datos Agregados Correctamente');	
	    		limpiar_form(p);		    		
	    	}else{
	    		if( data == 1 ){	    		
	    			alert('Este dato ya existe. Ingrese otra')	;
	    			$("#txt_descripcionUnidades").val("");
	    			$("#txt_descripcionUnidades").focus();
	    		}
	    	}
		},		
	}); 
}
function guardar_productos(){
	var resp=comprobarCamposRequired("form_productos");
	if(resp==true){
		$("#form_productos").on("submit",function (e){				
			var valores = $("#form_productos").serialize();
			var texto=($("#btn_0").text()).trim();	
			if(texto=="Guardar"){						
				datos_productos(valores,"g",e);					
			}else{				
				datos_productos(valores,"m",e);					
			}
			e.preventDefault();
    		$(this).unbind("submit");
		});
	}
}
function datos_productos(valores,tipo,p){	
	$.ajax({				
		type: "POST",
		data: valores+"&tipo="+tipo+"&img="+$("#avatar")[0].src,		
		url: "productos.php",			
	    success: function(data) {		    	
    		if(data == 0){
    			alert('Datos guardados correctamente');		
    			var ul = $("#myTab").children();
    			var di = $("#myTab").next();
    			
    			$('#myTab a:first').tab('show') 

    			limpiar_form(p);		    		
    		}else{
    			if( data == 1 ){
		    		alert('El código del producto esta repetido. Ingrese nuevamente');			
		    		$("#txt_1").focus();		    		
		    	}else{
		    		if( data == 2 ){
			    		alert('El código de barras del producto esta repetido. Ingrese nuevamente');			
			    		$("#txt_8").focus();			    		
			    	}else{
			    		if( data == 3 ){
				    		alert('El nombre del producto esta repetido. Ingrese nuevamente');			
				    		$("#txt_2").focus();				    		
				    	}else{
				    		alert('Error al momento de guardar... El formulario se recargara')
				    		//actualizar_form();
				    	}
			    	}
		    	}
    		}	    				    	
		}
	}); 
}

/*---------------------------------*/