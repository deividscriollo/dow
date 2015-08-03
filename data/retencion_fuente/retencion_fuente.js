$(document).on("ready",inicio);
var tipo = 0;
var temp_fila = 0;
function inicio (){
	$('#txt_3').ace_spinner({value:0,min:0,max:900050,step:1, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'});
	comprobarCamposRequired("form_retencion_fuente");
	cargar_rtenciones();
	$("#btn_0").on("click",guardar_retenciones);
	$("#form_retencion_fuente input").on("keyup click",function (e){//campos requeridos		
		comprobarCamposRequired(e.currentTarget.form.id);
	});	
	$('#td_retenciones tbody').on( 'dblclick', 'tr', function () {  		             	    	
        var data=$("#td_retenciones").dataTable().fnGetData($(this));
        //console.log(data);        
        $("#txt_0").val(data[0]);       
        $("#txt_1").val(data[1]);
        $("#txt_2").val(data[2]);                
        $("#txt_3").val(data[3]);                
        $("#txt_4").val(data[6]+" "+data[7]);                
        $("#txt_5").val(data[4]);                        
        $("#txt_00").val(data[5]);                        
        $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Modificar");     
        comprobarCamposRequired("form_retencion_fuente");
	});	
	$("#btn_1").on("click",limpiar_form);
	$("#btn_3").on("click",actualizar_form);
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
	        url: '../grupos/xml_plan.php',        	        
	        colNames: ['ID','CÓDIGO','CUENTA','GRUPO'],
	        colModel:[      
            	{name:'id_plan',index:'id_plan',frozen:true,align:'left',search:false,editable: true},            	
            	{name:'codigo_cuenta',index:'codigo_cuenta',frozen:true,align:'left',search:true,editable: true, editrules: {required: true},editoptions:{
            		dataInit:function (element,response){
            			$(element).keyup(function(){            				            				
            				var pattern = new RegExp("^[0-9.]{1,}[.]{1}$");        
					        if($(this).val() != '' && pattern.test($(this).val())){            					        	
					            $("#FormError").css("display","none");
					            $("#FormError").children().text("");
					        }else{					            					            
					        	$("#FormError").css("display","table-row");
					            $("#FormError").children().text("Formato Requerido: 1.");
					        }  
            			});            			
            		}
            	}},
            	{name:'nombre_cuenta',index:'nombre_cuenta',frozen:true,align:'left',search:true,editable: true,editrules: {required: true}},            	            	
            	{name:'grupo_cuenta',index:'grupo_cuenta', width:90, editable: true,edittype:"select",editoptions:{value:"G:Grupo;M:Movimiento"}},
            	

            ],
           	rowNum: 10,       
	        width:600,
	        shrinkToFit: true,
	        height:200,
	        rowList: [10,20,30],
	        pager: pager_selector,        
	        sortname: 'id_plan',
	        sortorder: 'asc',
	        caption: 'Lista de Grupos',	        
	        editurl:'../plan_cuentas/plan_grid.php',
	        
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
				$("#txt_4").val(ret.codigo_cuenta+" "+ret.nombre_cuenta);				
				$("#txt_00").val(ret.id_plan);
				$("#myModal").hide();
				comprobarCamposRequired("form_retencion_fuente");		    	            	    		
	        },	        
	        caption: "PLAN DE CUENTRAS"
	    });
		jQuery(grid_selector).jqGrid('hideCol', "id_plan");
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
	        edit: true,
	        editicon : 'ace-icon fa fa-pencil blue',
	        add: true,
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
	    	jqModal:true,
	    	width: 500,	        
	        closeAfterEdit : true,
    		reloadAfterSubmit:true,
	        recreateForm: true,
	        overlay: false,   
			beforeShowForm : function(e) {
				var form = $(e[0]);
				form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
				style_edit_form(form);
			},
	        afterSubmit: function (response){
	        	if(response.responseText == 0){
	        		$.gritter.add({
						title: 'Mensaje',
						text: 'Registro Guardado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
						time: 1000				
					});
	        		return [true,"",""];

	        	}else{
	        		if(response.responseText == 1){	
	        			$("#codigo_cuenta").val("");
	        			return [false,"Error.. Este código ya existe"];
		        	}	
	        	}
	        }, 
	        onClose: function() {
                alert('Hi ^_^');
            }   
	    },
	    {
	        //new record form,
	        //width: 700,
	        closeAfterAdd: true,
	        recreateForm: true,	  	        
	        viewPagerButtons: false,	     
	        jqModal:true,
	        overlay: false,   
	        beforeShowForm : function(e) {
	            var form = $(e[0]);	            
	            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
	            .wrapInner('<div class="widget-header" />')
	            style_edit_form(form);	            
	        },	    
	        afterSubmit: function (response){
	        	if(response.responseText == 0){
	        		$.gritter.add({
						title: 'Mensaje',
						text: 'Registro Guardado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
						time: 1000				
					});
	        		return true;
	        	}else{
	        		if(response.responseText == 1){	
	        			$("#codigo_cuenta").val("");
	        			return [false,"Error.. Este código ya existe"];
		        	}	
	        	}
	        },    
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
	        //overlay: false,
	        jqModal:false,
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

function guardar_retenciones(){
	var resp=comprobarCamposRequired("form_retencion_fuente");
	if(resp==true){
		$("#form_retencion_fuente").on("submit",function (e){				
			var valores = $("#form_retencion_fuente").serialize();
			var texto=($("#btn_0").text()).trim();				
			if(texto=="Guardar"){									
				datos_retenciones(valores,"g",e);														
			}else{				
				datos_retenciones(valores,"m",e);					
			}
			e.preventDefault();
    		$(this).unbind("submit");
		});
	}
}
function datos_retenciones(valores,tipo,p){	
	$.ajax({				
		type: "POST",
		data: valores+"&tipo="+tipo,
		url: "retencion_fuente.php",
		success: function(data) {
			if(data == 0){
    			alert('Datos guardados correctamente');			
	    		limpiar_form(p);	
	    		cargar_rtenciones();	    		
    		}else{
    			if( data == 1 ){
		    		alert('El código del grupo esta repetido. Ingrese nuevamente');			
		    		$("#txt_1").focus();		    		
		    	}else{
		    		if( data == 2 ){
			    		alert('El nombre del grupo esta repetido. Ingrese nuevamente');			
			    		$("#txt_8").focus();			    		
			    	}else{
			    		if( data == 3 ){				    		
				    		alert('Error al momento de guardar... El formulario se recargara')
				    		actualizar_form();
				    	}
			    	}
		    	}
    		}	    		    	
		}
	}); 
}
function cargar_rtenciones(){		
	var dataTable = $('#td_retenciones').dataTable();
    $("#dynamic-table tbody").empty(); 
    $.ajax({
        type: "POST",
        url: "retenciones.php",          
        dataType: 'json',
        success: function(response) {   
        	dataTable.fnClearTable();
			for(var i = 0; i < response.length; i++) {
				dataTable.fnAddData([
					response[i][0],
					response[i][1],
					response[i][2],	
					response[i][3],	
					response[i][4],	
					response[i][5],	
					response[i][6],	
					response[i][7],	
					response[i][8],	
					response[i][9],	
				]);
			} // End For
		},
		error: function(e){
			console.log(e.responseText);
		}              	
                                
   	});      
}