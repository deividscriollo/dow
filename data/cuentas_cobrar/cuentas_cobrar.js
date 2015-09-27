$(document).on("ready",inicio);

function guardar_pago() {
  var tam = jQuery("#list").jqGrid("getRowData");

  if($("#id_cliente").val() == ""){
      $("#txt_nro_identificacion").trigger("chosen:open");
       alert("Seleccione un cliente");
    }else{
        if(tam.length == 0){
            alert("Ingrese un pago");  
        } else {
            var v1 = new Array();
            var v2 = new Array();
            var v3 = new Array();
            var v4 = new Array();
            var v5 = new Array();
            var v6 = new Array();

            var string_v1 = "";
            var string_v2 = "";
            var string_v3 = "";
            var string_v4 = "";
            var string_v5 = "";
            var string_v6 = "";

            var fil = jQuery("#list").jqGrid("getRowData");
            for (var i = 0; i < fil.length; i++) {
                var datos = fil[i];
                v1[i] = datos['id_pagos_venta'];
                v2[i] = datos['num_factura'];
                v3[i] = datos['fecha_factura'];
                v4[i] = datos['totalcxc'];
                v5[i] = datos['valor_pagado'];
                v6[i] = datos['saldo'];
            }
            for (i = 0; i < fil.length; i++) {
                string_v1 = string_v1 + "|" + v1[i];
                string_v2 = string_v2 + "|" + v2[i];
                string_v3 = string_v3 + "|" + v3[i];
                string_v4 = string_v4 + "|" + v4[i];
                string_v5 = string_v5 + "|" + v5[i];
                string_v6 = string_v6 + "|" + v6[i];
            }
            
            $.ajax({
                type: "POST",
                url: "cuentas_cobrar.php",
                data: $("#form_pagosVenta").serialize() + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5 + "&campo6=" + string_v6,
                success: function(data) {
                    var val = data;
                    if (val == 1) {
                        //alertify.alert("Pago Guardado correctamente", function(){location.reload();});
                          
                    }
                }
            }); 
        }
    }
}


function inicio (){	
  show();

  carga_forma_pago("formas");

  // tooltips 
    $('[data-rel=tooltip]').tooltip();

    // seclect chosen 
    $('.chosen-select').chosen({
        allow_single_deselect:true,
        no_results_text:'No encontrado'     
    });
    
    $(document).one('ajaxloadstart.page', function(e) {
        //in ajax mode, remove before leaving page
        $('.modal.aside').remove();
        $(window).off('.aside')
    });

    // modal
      $('.modal.aside').ace_aside();
      $('#aside-inside-modal').addClass('aside').ace_aside({container: '#my-modal > .modal-dialog'});

    // formato calendario
      $('.date-picker').datepicker({
        autoclose: true,
        showOtherMonths: true,
        format:'yyyy-mm-dd',
        startView:0   
      }).datepicker('setDate', 'today');


 	////////////////validaciones/////////////////
 	$("#valor_pagado").on("keypress",punto);

 	/*----buscador cliente identificacion----*/
	var input_ci = $("#txt_nro_identificacion_chosen").children().next().children();		
	$(input_ci).on("keyup",function(input_ci){
		var text = $(this).children().val();
		if(text != "")  {
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
    					$('#lbl_client_telefono').val(data[4]);
    					$('#lbl_client_correo').val(data[5]);
    					$('#lbl_client_direccion').val(data[3]);
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
			$('#lbl_client_telefono').val("");
			$('#lbl_client_correo').val("");
			$('#lbl_client_direccion').val("");
		}else{
			var a = $("#txt_nro_identificacion option:selected");            
      		$('#txt_nombre_cliente').html("");
      		$('#txt_nombre_cliente').append($("<option data-extra='"+$(a).text()+"' data-direccion='"+$(a).data("direccion")+"' data-telefono='"+$(a).data("telefono")+"' data-email='"+$(a).data("email")+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');      		
      		$("#id_cliente").val($(a).val());		        
    			$('#lbl_client_telefono').val($(a).data("telefono"));
    			$('#lbl_client_correo').val($(a).data("email"));
    			$('#lbl_client_direccion').val($(a).data("direccion"));
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
              $('#lbl_client_telefono').val(data[4]);
              $('#lbl_client_correo').val(data[5]);
              $('#lbl_client_direccion').val(data[3]);
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
			$('#lbl_client_telefono').val("");
			$('#lbl_client_correo').val("");
			$('#lbl_client_direccion').val("");
		}else{
			var a = $("#txt_nombre_cliente option:selected");            
      		$('#txt_nro_identificacion').html("");
      		$('#txt_nro_identificacion').append($("<option data-extra='"+$(a).text()+"' data-direccion='"+$(a).data("direccion")+"' data-telefono='"+$(a).data("telefono")+"' data-email='"+$(a).data("email")+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');      		
      		$("#id_cliente").val($(a).val());		        
			$('#lbl_client_telefono').val($(a).data("telefono"));
			$('#lbl_client_correo').val($(a).data("email"));
			$('#lbl_client_direccion').val($(a).data("direccion"));
		}
	});


    /////////////////////////////////////////////////////////
  	/*---agregar a la tabla---*/

  	$("#valor_pagado").on("keypress",function (e) {
        if(e.keyCode == 13) {
            if($("#id_pagos_venta").val() != "") {
                if(parseFloat($("#valor_pagado").val()) <= parseFloat($("#saldo2").val())) {
                    $("#list").jqGrid("clearGridData", true);

                    var filas = jQuery("#list").jqGrid("getRowData");

                    if (filas.length === 0) {
                        var su = 0;
                        var saldo = 0;
                        var valor = parseFloat($("#valor_pagado").val());
                        var entero = ((valor).toFixed(2));
                        saldo = (parseFloat($("#saldo2").val()) - parseFloat($("#valor_pagado").val()));
                        var entero2 = ((saldo).toFixed(2));

                        var datarow = {id_pagos_venta: $("#id_pagos_venta").val(), num_factura: $("#num_factura").val(), fecha_factura: $("#fecha_factura").val(), totalcxc: $("#totalcxc").val(), valor_pagado: entero, saldo: entero2};
                        su = jQuery("#list").jqGrid('addRowData', $("#id_pagos_venta").val(), datarow);
                    }

                    // limpiar
                    $("#id_pagos_venta").val("");
                    $("#num_factura").val("");
                    $("#fecha_factura").val("");
                    $("#totalcxc").val("");
                    $("#valor_pagado").val("");
                    $("#saldo2").val("");

                } else{
                  alert("Error... Valor excedió al saldo");  
                }
            } else {
                alert("Seleccione una Factura");
            }
        }    
	});
/*-----guardar factura compra--*/
  $("#btn_0").on("click", guardar_pago);


// tabla pagos
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Factura a Pagar', 'Fecha Factura', 'Monto Total', 'Valor a Pagar', 'Saldo'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'id_pagos_venta', index: 'id_pagos_venta', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',frozen: true, width: 50},
    {name: 'num_factura', index: 'num_factura', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 150},
    {name: 'fecha_factura', index: 'fecha_factura', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 150},
    {name: 'totalcxc', index: 'totalcxc', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'valor_pagado', index: 'valor_pagado', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 110, editoptions:{maxlength: 10, size:15,dataInit: function(elem){$(elem).bind("keypress", function(e) {return punto(e)})}}}, 
    {name: 'saldo', index: 'saldo', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
  ],          
  rowNum: 10,       
  width: null,
  shrinkToFit: false,
  sortable: true,
  rowList: [10,20,30],
  pager: jQuery('#pager'),        
  sortorder: 'asc',
  viewrecords : true,
  cellEdit: true,
  shrinkToFit: true,
  delOptions: {
    modal: true,
    jqModal: true,
    onclickSubmit: function(rp_ge, rowid) {
        var id = jQuery("#list").jqGrid('getGridParam', 'selrow');
        jQuery('#list').jqGrid('restoreRow', id);
        var ret = jQuery("#list").jqGrid('getRowData', id);

         var su = jQuery("#list").jqGrid('delRowData', rowid);
         if (su === true) {
         rp_ge.processing = true;
         $(".ui-icon-closethick").trigger('click'); 
         }
      return true;
      },
    processing: true
}
});

// /busqueda facturas a cobrar
    jQuery(function($) {
        var grid_selector = "#table2";
        var pager_selector = "#pager2";
        
        //cambiar el tamaño para ajustarse al tamaño de la página
        $(window).on('resize.jqGrid', function () {
            //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());          
            $(grid_selector).jqGrid( 'setGridWidth', $("#modal_facturas .modal-dialog").width()-30);
            
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
            url: 'xmlFacturasventas.php',        
            colNames: ['ID', 'Factura a Pagar', 'Fecha Factura', 'Monto Total', 'Valor a Pagar', 'Saldo'],
                colModel: [
                {name: 'id_pagos_venta', index: 'id_pagos_venta', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',frozen: true, width: 50},
                {name: 'num_factura', index: 'num_factura', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 180},
                {name: 'fecha_factura', index: 'fecha_factura', editable: true, frozen: true, hidden: false, editrules: {required: true}, align: 'center', width: 150},
                {name: 'totalcxc', index: 'totalcxc', editable: true, search: false, frozen: true, hidden: false, editrules: {required: true}, align: 'center', width: 110},
                {name: 'valor_pagado', index: 'valor_pagado', editable: true, frozen: true, hidden: true, editrules: {required: true}, align: 'center', width: 120},
                {name: 'saldo', index: 'saldo', editable: true, frozen: true, hidden: false, editrules: {required: true}, align: 'center', width: 120}
            ],          
            rowNum: 10,       
            width:600,
            shrinkToFit: false,
            height:200,
            rowList: [10,20,30],
            pager: pager_selector,        
            sortname: 'id_pagos_venta',
            sortorder: 'asc',          
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

                $("#id_pagos_venta").val(ret.id_pagos_venta);
                $("#num_factura").val(ret.num_factura);
                $("#fecha_factura").val(ret.fecha_factura);
                $("#totalcxc").val(ret.totalcxc);
                $("#saldo2").val(ret.saldo); 

                $("#tablaNuevo tbody").empty(); 

                $.ajax({
                    type: "POST",
                    url: "buscar_pagos.php",    
                    data: "id=" + ret.id_pagos_venta,
                    dataType: 'json',
                    success: function(response) {
                    $("#tablaNuevo").css('display','inline-table');
                    for (var i = 0; i < response.length; i=i+3) {
                            $("#tablaNuevo tbody").append( "<tr>" +
                            "<td align=center >" + response[i+0] + "</td>" +
                            "<td align=center>" + response[i+1] + "</td>" +             
                            "<td align=center>" + response[i+2] + "</td>" +                         
                           "<tr>");                    
                        }
                   }                    
               });

                $('#modal_facturas').modal('hide');
                                
            }
        });

        jQuery(grid_selector).jqGrid('hideCol', "txt_0");
        jQuery(grid_selector).jqGrid('hideCol', "txt_11");      

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

        function styleCheckbox(table) {
        }

        function updateActionIcons(table) {
        }

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

        $(document).one('ajaxloadstart.page', function(e) {
            $(grid_selector).jqGrid('GridUnload');
            $('.ui-jqdialog').remove();
        });
    });


jQuery(window).bind('resize', function () {
jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
}).trigger('resize');

}