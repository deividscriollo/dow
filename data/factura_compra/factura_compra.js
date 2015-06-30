$(document).on("ready",inicio);	

function guardar_factura(){
  var tam = jQuery("#list").jqGrid("getRowData");

  if($("#serie").val() == ""){  
      $("#serie").focus();    
      alert("Ingrese la serie");
    } else {
        if($("#id_proveedor").val() == ""){
          $("#txt_nro_identificacion").trigger("chosen:open");
          alert("Seleccione un Proveedor");    
        } else {
          if($("#autorizacion").val() == "") {
            $("#autorizacion").focus()
              alert("Ingrese la autorización");
          } else {
              if(tam.length == 0){
                  alert("Ingrese los productos a la Factura");  
              } else {
                  var v1 = new Array();
                  var v2 = new Array();
                  var v3 = new Array();
                  var v4 = new Array();
                  var v5 = new Array();
                  var string_v1 = "";
                  var string_v2 = "";
                  var string_v3 = "";
                  var string_v4 = "";
                  var string_v5 = "";
                  var fil = jQuery("#list").jqGrid("getRowData");
                  for (var i = 0; i < fil.length; i++) {
                      var datos = fil[i];
                      v1[i] = datos['cod_producto'];
                      v2[i] = datos['cantidad'];
                      v3[i] = datos['precio_u'];
                      v4[i] = datos['descuento'];
                      v5[i] = datos['total'];
                  }
                  
                  for (i = 0; i < fil.length; i++) {
                      string_v1 = string_v1 + "|" + v1[i];
                      string_v2 = string_v2 + "|" + v2[i];
                      string_v3 = string_v3 + "|" + v3[i];
                      string_v4 = string_v4 + "|" + v4[i];
                      string_v5 = string_v5 + "|" + v5[i];
                  }

                  $.ajax({        
                    type: "POST",
                    data: $("#form_facturaCompra").serialize()+"&campo1="+string_v1+"&campo2="+string_v2+"&campo3="+string_v3+"&campo4="+string_v4+"&campo5="+string_v5,                
                    url: "factura_compra.php",      
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
} 

function inicio (){		
  show();

  $('#serie').mask('999-999-999999999');
 
  carga_forma_pago("formas");
  carga_termino_pago("termino_pago");
  /*jqgrid*/    
  // jQuery(function($) {
  //   var grid_selector = "#table";
  //   var pager_selector = "#pager";    
  //   //cambiar el tamaño para ajustarse al tamaño de la página
  //   $(window).on('resize.jqGrid', function () {
  //     //$(grid_selector).jqGrid( 'setGridWidth', $("#myModal").width());          
  //     $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
  //   })
  //   //cambiar el tamaño de la barra lateral collapse/expand
  //   var parent_column = $(grid_selector).closest('[class*="col-"]');
  //   $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
  //     if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
  //       //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
  //       setTimeout(function() {
  //         $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
  //       }, 0);
  //     }
  //   })

  //   jQuery(grid_selector).jqGrid({          
  //     datatype: "xml",
  //     url: 'xml_factura_compra.php',        
  //     colNames: ['id_Factura_compra','RESPONSABLE','FECHA','HORA ACUTAL','id_proveedor','CI/RUC','PROVEEDOR','COMPROBANTE','FECHA REGISTRO','FECHA EMISION', 'FECHA CADUCIDAD','FECHA CANCELACION','NRO SERIE','NRO AUTORIZACION','id_form_pago','TARFIA 0','TARIFA 12','IVA', 'DESCUENTO','TOTAL','id_termino_pago','TÉRMINO PAGO','FORMA PAGO'],
  //     colModel:[      
  //             {name:'comprobante',index:'id_factura_compra',frozen:true,align:'left',search:false},
  //             {name:'txt_reponsable',index:'usuario.nombres_completos',frozen : true,align:'left',search:true},
  //             {name:'fecha_actual',index:'fecha_actual',frozen : true,align:'left',search:false},
  //             {name:'estado',index:'estado',frozen : true,align:'left',search:false},
  //             {name:'id_proveedor',index:'id_proveedor',frozen : true,align:'left',search:false},
  //             {name:'ci_proveedor',index:'proveedor.identificacion',frozen : true,align:'left',search:true},
  //             {name:'nombre_proveedor',index:'proveedor.nombres_completos',frozen : true,align:'left',search:true},
  //             {name:'tipo_comprobante',index:'tipo_comprobante',frozen : true,align:'left',search:false},
  //             {name:'fecha_registro',index:'fecha_registro',frozen : true,align:'left',search:false},
  //             {name:'fecha_emision',index:'fecha_emision',frozen : true,align:'left',search:false},
  //             {name:'fecha_caducidad',index:'fecha_caducidad',frozen : true,align:'left',search:false},
  //             {name:'fecha_cancelacion',index:'fecha_cancelacion',frozen : true,align:'left',search:false},
  //             {name:'nro_serie',index:'nro_serie',frozen : true,align:'left',search:false},
  //             {name:'autorizacion',index:'autorizacion',frozen : true,align:'left',search:false},
  //             {name:'id_forma_pago',index:'id_forma_pago',frozen : true,align:'left',search:false},
  //             {name:'tarifa0',index:'tarifa0',frozen : true,align:'left',search:false},
  //             {name:'tarifa12',index:'tarifa12',frozen : true,align:'left',search:false},
  //             {name:'iva',index:'iva',frozen : true,align:'left',search:false},
  //             {name:'descuento_total',index:'descuento_total',frozen : true,align:'left',search:false},
  //             {name:'total',index:'total',frozen : true,align:'left',search:false},                                         
  //             {name:'id_termino_pago',index:'id_termino_pago',frozen : true,align:'left',search:false},                                         
  //             {name:'descripcion_termino',index:'terminos_pago.descripcion',frozen : true,align:'left',search:false},                                         
  //             {name:'descripcion_formas',index:'formas_pago.descripcion',frozen : true,align:'left',search:false},                                         
  //         ],          
  //         rowNum: 10,       
  //         width:600,
  //         shrinkToFit: false,
  //         height:200,
  //         rowList: [10,20,30],
  //         pager: pager_selector,        
  //         sortname: 'id_factura_compra',
  //         sortorder: 'asc',
  //         caption: 'LISTA DE FACTURAS COMPRA',          
          
  //         altRows: true,
  //         multiselect: false,
  //         multiboxonly: true,
  //         viewrecords : true,
  //         loadComplete : function() {
  //             var table = this;
  //             setTimeout(function(){
  //                 styleCheckbox(table);
  //                 updateActionIcons(table);
  //                 updatePagerIcons(table);
  //                 enableTooltips(table);
  //             }, 0);
  //         },
  //         ondblClickRow: function(rowid) {                                
  //           var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
  //           var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);                                              
  //           $("#comprobante").val(ret.comprobante);
  //           $("#txt_responsable").text(ret.txt_reponsable);
  //           $("#fecha_actual").val(ret.fecha_registro);
  //           $("#estado").val(ret.estado);
  //           $("#id_proveedor").val(ret.id_proveedor);
  //           $('#txt_nro_identificacion').html("");
  //           $('#txt_nro_identificacion').append($("<option data-extra='"+ret.nombre_proveedor+"'></option>").val(ret.id_proveedor).html(ret.ci_proveedor)).trigger('chosen:updated');                    
  //           $('#txt_nombre_proveedor').html("");
  //           $('#txt_nombre_proveedor').append($("<option data-extra='"+ret.ci_proveedor+"'></option>").val(ret.id_proveedor).html(ret.nombre_proveedor)).trigger('chosen:updated');                                                             
  //           $('#tipo_comprobante').val(ret.tipo_comprobante);
  //           $('#tipo_comprobante').trigger("chosen:updated");
  //           $('#fecha_registro').val(ret.fecha_registro);
  //           $('#fecha_emision').val(ret.fecha_emision);
  //           $('#fecha_caducidad').val(ret.fecha_caducidad);
  //           $('#fecha_cancelacion').val(ret.fecha_cancelacion);
  //           var text = ret.nro_serie;
  //           $('#serie1').val(text.substr(0,3));
  //           $('#serie2').val(text.substr(4,3));
  //           $('#serie3').val(text.substr(8,30));
  //           $('#autorizacion').val(ret.autorizacion);
            
  //           $('#tarifa0').val(ret.tarifa0);
  //           $('#tarifa12').val(ret.tarifa12);
  //           $('#iva').val(ret.iva);
  //           $('#descuento_total').val(ret.descuento_total);
  //           $('#total').val(ret.total);

  //           $("#formas").val(ret.id_forma_pago);            
  //           $('#formas').trigger("chosen:updated");            
            
  //           $("#termino_pago").val(ret.id_termino_pago)            
  //           $('#termino_pago').trigger("chosen:updated");
  //           $('#myModal').modal('hide');  
  //           carga_detalles_fc("detalle_factura",ret.comprobante);                            
  //           $("#btn_0").text("");
  //           $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> ----------");                   
  //       },          
   
          
  //         caption: "LISTA DE FACTURAS COMPRA"

  //     });
  //     jQuery(grid_selector).jqGrid('hideCol', "comprobante");   
  //     jQuery(grid_selector).jqGrid('hideCol', "id_proveedor");      
  //     jQuery(grid_selector).jqGrid('hideCol', "tarifa0");      
  //     jQuery(grid_selector).jqGrid('hideCol', "tarifa12");      
  //     jQuery(grid_selector).jqGrid('hideCol', "iva");      
  //     jQuery(grid_selector).jqGrid('hideCol', "descuento_total");      
  //     jQuery(grid_selector).jqGrid('hideCol', "total");      
  //     jQuery(grid_selector).jqGrid('hideCol', "id_forma_pago");  
  //     jQuery(grid_selector).jqGrid('hideCol', "id_termino_pago");  
  //     $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

  //     function aceSwitch( cellvalue, options, cell ) {
  //         setTimeout(function(){
  //             $(cell) .find('input[type=checkbox]')
  //             .addClass('ace ace-switch ace-switch-5')
  //             .after('<span class="lbl"></span>');
  //         }, 0);
  //     }          
  //     //navButtons
  //     jQuery(grid_selector).jqGrid('navGrid',pager_selector,
  //     {   //navbar options
  //         edit: false,
  //         editicon : 'ace-icon fa fa-pencil blue',
  //         add: false,
  //         addicon : 'ace-icon fa fa-plus-circle purple',
  //         del: false,
  //         delicon : 'ace-icon fa fa-trash-o red',
  //         search: true,
  //         searchicon : 'ace-icon fa fa-search orange',
  //         refresh: true,
  //         refreshicon : 'ace-icon fa fa-refresh green',
  //         view: true,
  //         viewicon : 'ace-icon fa fa-search-plus grey'
  //     },
  //     {         
  //         recreateForm: true,
  //         beforeShowForm : function(e) {
  //             var form = $(e[0]);
  //             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
  //             style_edit_form(form);
  //         }
  //     },
  //     {
  //         //new record form
  //         //width: 700,
  //         closeAfterAdd: true,
  //         recreateForm: true,
  //         viewPagerButtons: false,
  //         beforeShowForm : function(e) {
  //             var form = $(e[0]);
  //             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
  //             .wrapInner('<div class="widget-header" />')
  //             style_edit_form(form);
  //         }
  //     },
  //     {
  //         //delete record form
  //         recreateForm: true,
  //         beforeShowForm : function(e) {
  //             var form = $(e[0]);
  //             if(form.data('styled')) return false;
                  
  //             form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
  //             style_delete_form(form);
                  
  //             form.data('styled', true);
  //         },
  //         onClick : function(e) {
  //             //alert(1);
  //         }
  //     },
  //     {
  //           recreateForm: true,
  //         afterShowSearch: function(e){
  //             var form = $(e[0]);
  //             form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
  //             style_search_form(form);
  //         },
  //         afterRedraw: function(){
  //             style_search_filters($(this));
  //         }
  //         ,
  //         //multipleSearch: true
  //         overlay: false,
  //         sopt: ['eq', 'cn'],
  //           defaultSearch: 'eq',                     
  //       },
  //     {
  //         //view record form
  //         recreateForm: true,
  //         beforeShowForm: function(e){
  //             var form = $(e[0]);
  //             form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
  //         }
  //     })      
  //     function style_edit_form(form) {
  //         //enable datepicker on "sdate" field and switches for "stock" field
  //         form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
          
  //         form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
  //         //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
  //         //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

                  
  //         //update buttons classes
  //         var buttons = form.next().find('.EditButton .fm-button');
  //         buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
  //         buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
  //         buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
          
  //         buttons = form.next().find('.navButton a');
  //         buttons.find('.ui-icon').hide();
  //         buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
  //         buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
  //     }

  //     function style_delete_form(form) {
  //         var buttons = form.next().find('.EditButton .fm-button');
  //         buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
  //         buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
  //         buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
  //     }
      
  //     function style_search_filters(form) {
  //         form.find('.delete-rule').val('X');
  //         form.find('.add-rule').addClass('btn btn-xs btn-primary');
  //         form.find('.add-group').addClass('btn btn-xs btn-success');
  //         form.find('.delete-group').addClass('btn btn-xs btn-danger');
  //     }
  //     function style_search_form(form) {
  //         var dialog = form.closest('.ui-jqdialog');
  //         var buttons = dialog.find('.EditTable')
  //         buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
  //         buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
  //         buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
  //     }
      
  //     function beforeDeleteCallback(e) {
  //         var form = $(e[0]);
  //         if(form.data('styled')) return false;
          
  //         form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
  //         style_delete_form(form);
          
  //         form.data('styled', true);
  //     }
      
  //     function beforeEditCallback(e) {
  //         var form = $(e[0]);
  //         form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
  //         style_edit_form(form);
  //     }



  //     //it causes some flicker when reloading or navigating grid
  //     //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
  //     //or go back to default browser checkbox styles for the grid
  //     function styleCheckbox(table) {
  //         /**
  //                     $(table).find('input:checkbox').addClass('ace')
  //                     .wrap('<label />')
  //                     .after('<span class="lbl align-top" />')


  //                     $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
  //                     .find('input.cbox[type=checkbox]').addClass('ace')
  //                     .wrap('<label />').after('<span class="lbl align-top" />');
  //          */
  //     }
      

  //     //unlike navButtons icons, action icons in rows seem to be hard-coded
  //     //you can change them like this in here if you want
  //     function updateActionIcons(table) {
  //         /**
  //                     var replacement = 
  //                     {
  //                             'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
  //                             'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
  //                             'ui-icon-disk' : 'ace-icon fa fa-check green',
  //                             'ui-icon-cancel' : 'ace-icon fa fa-times red'
  //                     };
  //                     $(table).find('.ui-pg-div span.ui-icon').each(function(){
  //                             var icon = $(this);
  //                             var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
  //                             if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
  //                     })
  //          */
  //     }
      
  //     //replace icons with FontAwesome icons like above
  //     function updatePagerIcons(table) {
  //         var replacement = 
  //             {
  //             'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
  //             'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
  //             'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
  //             'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
  //         };
  //         $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
  //             var icon = $(this);
  //             var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
              
  //             if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
  //         })
  //     }

  //     function enableTooltips(table) {
  //         $('.navtable .ui-pg-button').tooltip({container:'body'});
  //         $(table).find('.ui-pg-div').tooltip({container:'body'});
  //     }

  //     //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

  //     $(document).one('ajaxloadstart.page', function(e) {
  //         $(grid_selector).jqGrid('GridUnload');
  //         $('.ui-jqdialog').remove();
  //     });
  // });  
	////////////////validaciones/////////////////
	$("#cantidad").validCampoFranz("0123456789");
	$("#autorizacion").validCampoFranz("0123456789");
	$("#descuento").validCampoFranz("0123456789");	
  $("#precio").on("keypress",punto);  

  /*buscador de ci proveedor*/
  var input_ci = $("#txt_nro_identificacion_chosen").children().next().children();		
  $(input_ci).on("keyup",function(input_ci){
  	var text = $(this).children().val();
    if(text != ""){
		  $.ajax({        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=12&val="+text,        
        success: function(data, status) {
          $('#txt_nro_identificacion').html("");	        	
          for (var i = 0; i < data.length; i=i+3) {            				            		            	
            appendToChosen(data[i],data[i+1],text,data[i+2],"txt_nro_identificacion","txt_nro_identificacion_chosen");
          }		        
          $('#txt_nombre_proveedor').html("");
          $('#txt_nombre_proveedor').append($("<option data-extra='"+data[1]+"'></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                    
          $("#id_proveedor").val(data[0])            
        },
        error: function (data) {		        
        }	        
      });
    }
	});	

  /*eventos change del chosen*/
  $("#txt_nro_identificacion").chosen().change(function (event,params){
    if(params == undefined){      
      $('#txt_nro_identificacion').html("");
      $('#txt_nro_identificacion').append($("<option></option>"));          
      $('#txt_nro_identificacion').trigger('chosen:updated')
      $('#txt_nombre_proveedor').html("");
      $('#txt_nombre_proveedor').append($("<option></option>"));          
      $('#txt_nombre_proveedor').trigger('chosen:updated');     
      $("#id_proveedor").val("");            
    }else{        
      var a = $("#txt_nro_identificacion option:selected");            
      $('#txt_nombre_proveedor').html("");
      $('#txt_nombre_proveedor').append($("<option data-extra='"+$(a).text()+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');
      $("#id_proveedor").val($(a).val());
    }
  }); 
  //////////////////////////////////////////////////////////

  /*buscador del nombre del proveedor*/
  var input_nombre = $("#txt_nombre_proveedor_chosen").children().next().children();    
  $(input_nombre).on("keyup",function(input_ci){
    var text = $(this).children().val();
    if(text != ""){
     $.ajax({        
          type: "POST",
          dataType: 'json',        
          url: "../carga_ubicaciones.php?tipo=0&id=0&fun=14&val="+text,        
          success: function(data, status) {
            $('#txt_nombre_proveedor').html("");            
            for (var i = 0; i < data.length; i=i+3) {                                                 
              appendToChosen(data[i],data[i+1],text,data[i+2],"txt_nombre_proveedor","txt_nombre_proveedor_chosen");
            }           
            $('#txt_nro_identificacion').html("");
            $('#txt_nro_identificacion').append($("<option data-extra='"+data[1]+"'></option>").val(data[0]).html(data[2])).trigger('chosen:updated');                    
            $("#id_proveedor").val(data[0])            
        },
        error: function (data) {
            // alert(data);
        }         
      });
    }
  }); 

  $("#txt_nombre_proveedor").chosen().change(function (event,params){    
    if(params == undefined){      
      $('#txt_nro_identificacion').html("");
      $('#txt_nro_identificacion').append($("<option></option>"));          
      $('#txt_nro_identificacion').trigger('chosen:updated')
      $('#txt_nombre_proveedor').html("");
      $('#txt_nombre_proveedor').append($("<option></option>"));          
      $('#txt_nombre_proveedor').trigger('chosen:updated');     
      $("#id_proveedor").val("")            
    }else{        
      var a = $("#txt_nombre_proveedor option:selected");            
      $('#txt_nro_identificacion').html("");
      $('#txt_nro_identificacion').append($("<option data-extra='"+$(a).text()+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');
      $("#id_proveedor").val($(a).val());
    }
  });   
  /////////////////////////////////////////////////////////////

  /////////////////bucador barras///////////////////////////
    $("#codigo_barras").keyup(function(e) {
      var codigo = $("#codigo_barras").val();
      $.getJSON('search.php?codigo_barras=' + codigo, function(data) {
          var tama = data.length;
          if (tama !== 0) {
              for (var i = 0; i < tama; i = i + 9) {
                  $("#id_productos").val(data[i]);
                  $("#codigo").val(data[i+1]);
                  $("#producto").val(data[i + 2]);
                  $("#precio").val(data[i + 3]);
                  $("#descuento").val(data[i + 4]);
                  $("#stock").val(data[i + 5]);
                  $("#iva_producto").val(data[i + 6]);
                  $("#inventar").val(data[i + 7]);
                  $("#incluye").val(data[i + 8]);
                  $("#cantidad").focus();
              }
          }else{
              $("#id_productos").val("");
              $("#codigo").val("");
              $("#producto").val("");
              $("#precio").val("");
              $("#descuento").val("");
              $("#stock").val("");
              $("#iva_producto").val("");
              $("#inventar").val("");
              $("#incluye").val("");
          }
      });
    });
    ////////////////////////////////////////

    ///////////////////////busqueda productos codigo/////////
      $("#codigo").autocomplete({
          source: "buscar_codigo.php",
          minLength: 1,
          focus: function(event, ui) {
          $("#id_productos").val(ui.item.id_productos); 
          $("#codigo").val(ui.item.value); 
          $("#codigo_barras").val(ui.item.codigo_barras);
          $("#producto").val(ui.item.producto);
          $("#precio").val(ui.item.precio);
          $("#descuento").val(ui.item.descuento);
          // $("#descuento").attr("max",ui.item.descuento);
          $("#stock").val(ui.item.stock);
          $("#iva_producto").val(ui.item.iva_producto);
          $("#inventar").val(ui.item.inventar);
          $("#incluye").val(ui.item.incluye);
          return false;
          },
          select: function(event, ui) {
          $("#id_productos").val(ui.item.id_productos); 
          $("#codigo").val(ui.item.value); 
          $("#codigo_barras").val(ui.item.codigo_barras);
          $("#producto").val(ui.item.producto);
          $("#precio").val(ui.item.precio);
          $("#descuento").val(ui.item.descuento);
          $("#stock").val(ui.item.stock);
          $("#iva_producto").val(ui.item.iva_producto);
          $("#inventar").val(ui.item.inventar);
          $("#incluye").val(ui.item.incluye);
          $("#cantidad").focus();
          return false;
          }

          }).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li>")
          .append("<a>" + item.value + "</a>")
          .appendTo(ul);
      };
    /////////////////////////////////////////

    ///////////////////////busqueda productos nombres/////////
      $("#producto").autocomplete({
          source: "buscar_producto.php",
          minLength: 1,
          focus: function(event, ui) {
          $("#id_productos").val(ui.item.id_productos); 
          $("#codigo").val(ui.item.codigo); 
          $("#codigo_barras").val(ui.item.codigo_barras);
          $("#producto").val(ui.item.value);
          $("#precio").val(ui.item.precio);
          $("#descuento").val(ui.item.descuento);
          // $("#descuento").attr("max",ui.item.descuento);
          $("#stock").val(ui.item.stock);
          $("#iva_producto").val(ui.item.iva_producto);
          $("#inventar").val(ui.item.inventar);
          $("#incluye").val(ui.item.incluye);
          return false;
          },
          select: function(event, ui) {
          $("#id_productos").val(ui.item.id_productos); 
          $("#codigo").val(ui.item.codigo); 
          $("#codigo_barras").val(ui.item.codigo_barras);
          $("#producto").val(ui.item.value);
          $("#precio").val(ui.item.precio);
          $("#descuento").val(ui.item.descuento);
          $("#stock").val(ui.item.stock);
          $("#iva_producto").val(ui.item.iva_producto);
          $("#inventar").val(ui.item.inventar);
          $("#incluye").val(ui.item.incluye);
          $("#cantidad").focus();
          return false;
          }

          }).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li>")
          .append("<a>" + item.value + "</a>")
          .appendTo(ul);
      };
    /////////////////////////////////////////

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
      var subtotal0 = 0;
      var subtotal12 = 0;
      var iva12 = 0;
      var total_total = 0;
      var descu_total = 0;   

      if($("#cantidad").val() != ""){
        if($("#precio").val() != ""){
          if($("#id_productos").val() != ""){
            var a = $("#producto option:selected");
            var filas = jQuery("#list").jqGrid("getRowData");
            var descuento = 0;
            var total = 0;
            var su = 0;
            var desc = 0;
            var precio = 0;
            var multi = 0;
            var flotante = 0;
            var resultado = 0;
            var repe = 0;

            if (filas.length === 0) {
                if ($("#descuento").val() !== "") {
                    desc = $("#descuento").val();
                    precio = (parseFloat($("#precio").val())).toFixed(2);
                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(2);
                    descuento = ((multi * parseFloat($("#descuento").val())) / 100);
                    flotante = parseFloat(descuento);
                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
                    total = (multi - resultado).toFixed(2);
                } else {
                    desc = 0;
                    precio = (parseFloat($("#precio").val())).toFixed(2);
                    total = (parseFloat($("#cantidad").val()) * precio).toFixed(2);
                }
                
                var datarow = {
                    cod_producto: $("#id_productos").val(), 
                    codigo: $(a).data("codigo"), 
                    detalle: $(a).text(), 
                    cantidad: $("#cantidad").val(), 
                    precio_u: precio, 
                    descuento: desc, 
                    cal_des: resultado,
                    total: total, 
                    iva: $("#iva_producto").val(), 
                    incluye: $("#incluye").val()
                };

                su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                limpiar_input();
            } else {
                for (var i = 0; i < filas.length; i++) {
                    var id = filas[i];
                    var can = id['cantidad'];
                    if (id['cod_producto'] === $("#id_productos").val()) {
                        repe = 1;
                    }
                }

                if (repe === 1) {
                    if ($("#descuento").val() !== "") {
                        desc = $("#descuento").val();
                        precio = (parseFloat($("#precio").val())).toFixed(2);
                        multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(2);
                        descuento = ((multi * parseFloat($("#descuento").val())) / 100);
                        flotante = parseFloat(descuento);
                        resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
                        total = (multi - resultado).toFixed(2);
                    } else {
                        desc = 0;
                        precio = (parseFloat($("#precio").val())).toFixed(2);
                        total = (parseFloat($("#cantidad").val()) * precio).toFixed(2);
                    }
                
                    datarow = {
                        cod_producto: $("#id_productos").val(), 
                        codigo: $(a).data("codigo"), 
                        detalle: $(a).text(), 
                        cantidad: $("#cantidad").val(), 
                        precio_u: precio, 
                        descuento: desc, 
                        cal_des: resultado,
                        total: total, 
                        iva: $("#iva_producto").val(), 
                        incluye: $("#incluye").val()
                    };
                
                    su = jQuery("#list").jqGrid('setRowData', $("#id_productos").val(), datarow);
                    limpiar_input();
                } else {
                  if ($("#descuento").val() !== "") {
                    desc = $("#descuento").val();
                    precio = (parseFloat($("#precio").val())).toFixed(2);
                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(2);
                    descuento = ((multi * parseFloat($("#descuento").val())) / 100);
                    flotante = parseFloat(descuento);
                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(2);
                    total = (multi - resultado).toFixed(2);
                  } else {
                      desc = 0;
                      precio = (parseFloat($("#precio").val())).toFixed(2);
                      total = (parseFloat($("#cantidad").val()) * precio).toFixed(2);
                  }
              
                  datarow = {
                      cod_producto: $("#id_productos").val(), 
                      codigo: $(a).data("codigo"), 
                      detalle: $(a).text(), 
                      cantidad: $("#cantidad").val(), 
                      precio_u: precio, 
                      descuento: desc, 
                      cal_des: resultado,
                      total: total, 
                      iva: $("#iva_producto").val(), 
                      incluye: $("#incluye").val()
                  };
                  su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                  limpiar_input();
                }
              }

              ///////////////////CALCULAR VALORES/////////////////
              var subtotal = 0;
              var sub = 0;
              var sub1 = 0;
              var sub2 = 0;
              var iva = 0;
              var iva1 = 0;
              var iva2 = 0;

              var fil = jQuery("#list").jqGrid("getRowData");
              for (var t = 0; t < fil.length; t++) {
                  var dd = fil[t];
                  if (dd['iva'] != 0) {
                      if(dd['incluye'] == "No") {
                          subtotal = dd['total'];
                          sub1 = subtotal;
                          iva1 = (sub1 * 0.12).toFixed(3);                                          

                          subtotal0 = parseFloat(subtotal0) + 0;
                          subtotal12 = parseFloat(subtotal12) + parseFloat(sub1);
                          iva12 = parseFloat(iva12) + parseFloat(iva1);
                          descu_total = parseFloat(descu_total) + dd['cal_des'];
                      
                          subtotal0 = parseFloat(subtotal0).toFixed(3);
                          subtotal12 = parseFloat(subtotal12).toFixed(3);
                          iva12 = parseFloat(iva12).toFixed(3);
                          descu_total = parseFloat(descu_total).toFixed(3);
                      } else {
                          if(dd['incluye'] == "Si") {
                              subtotal = dd['total'];
                              sub2 = (subtotal / 1.12).toFixed(3);
                              iva2 = (sub2 * 0.12).toFixed(3);

                              subtotal0 = parseFloat(subtotal0) + 0;
                              subtotal12 = parseFloat(subtotal12) + parseFloat(sub2);
                              iva12 = parseFloat(iva12) + parseFloat(iva2);
                              descu_total = parseFloat(descu_total) + dd['cal_des'];

                              subtotal0 = parseFloat(subtotal0).toFixed(3);
                              subtotal12 = parseFloat(subtotal12).toFixed(3);
                              iva12 = parseFloat(iva12).toFixed(3);
                              descu_total = parseFloat(descu_total).toFixed(3);
                          }
                      }
                    } else {
                      if (dd['iva'] == 0) {                                               
                          subtotal = dd['total'];
                          sub = subtotal;

                          subtotal0 = parseFloat(subtotal0) + parseFloat(sub);
                          subtotal12 = parseFloat(subtotal12) + 0;
                          iva12 = parseFloat(iva12) + 0;
                          descu_total = parseFloat(descu_total) + dd['cal_des'];
                          
                          subtotal0 = parseFloat(subtotal0).toFixed(3);
                          subtotal12 = parseFloat(subtotal12).toFixed(3);
                          iva12 = parseFloat(iva12).toFixed(3);
                          descu_total = parseFloat(descu_total).toFixed(3);                                  
                      }       
                  }
                }  
                                                                        
                total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva12));
                total_total = parseFloat(total_total).toFixed(3);

                $("#tarifa0").val(subtotal0);
                $("#tarifa12").val(subtotal12);
                $("#iva").val(iva12);
                $("#descuento_total").val(descu_total);
                $("#total").val(total_total);
              /////////////////////////////////////////////////////
          } else {
            $('#codigo_barras').focus();
            alert("Seleccione un producto antes de continuar");                        
          }
        } else {
          $("#precio").focus();  
          alert("Ingrese un precio");
        }
      } else {
        $("#cantidad").focus();
        alert("Ingrese una cantidad");
      }
    }
  });
  /*-----guardar factura compra--*/
  $("#btn_0").on("click",guardar_factura);
  /*-----limpiar factura compra--*/
  $("#btn_1").on("click",actualizar_form);
  /*-----actualizar factura compra--*/
  $("#btn_2").on("click",actualizar_form);

  $("#btn_4").on("click",function (){   
    var resp = "";    
    resp =atras($("#comprobante").val(),"factura_compra","secuencia.php");   
    if(resp.Cabecera[0] != false){     
      $("#comprobante").val(resp.Cabecera[0][0]);
      $("#txt_responsable").text(resp.Cabecera[0][1]);
      $("#fecha_actual").val(resp.Cabecera[0][8]);
      $("#estado").val(resp.Cabecera[0][3]);
      $("#id_proveedor").val(resp.Cabecera[0][4]);
      $('#txt_nro_identificacion').html("");
      $('#txt_nro_identificacion').append($("<option resp-extra='"+resp.Cabecera[0][6]+"'></option>").val(resp.Cabecera[0][4]).html(resp.Cabecera[0][5])).trigger('chosen:updated');                    
      $('#txt_nombre_proveedor').html("");
      $('#txt_nombre_proveedor').append($("<option resp-extra='"+resp.Cabecera[0][5]+"'></option>").val(resp.Cabecera[0][4]).html(resp.Cabecera[0][6])).trigger('chosen:updated');                                                             
      $('#tipo_comprobante').val(resp.Cabecera[0][7]);
      $('#tipo_comprobante').trigger("chosen:updated");
      $('#fecha_registro').val(resp.Cabecera[0][8]);
      $('#fecha_emision').val(resp.Cabecera[0][9]);
      $('#fecha_caducidad').val(resp.Cabecera[0][10]);
      $('#fecha_cancelacion').val(resp.Cabecera[0][11]);
      var text = resp.Cabecera[0][12];
      $('#serie1').val(text.substr(0,3));
      $('#serie2').val(text.substr(4,3));
      $('#serie3').val(text.substr(8,30));
      $('#autorizacion').val(resp.Cabecera[0][13]);
      $('#formas').val(resp.Cabecera[0][14]);
      $('#formas').trigger("chosen:updated");
      $('#tarifa0').val(resp.Cabecera[0][15]);
      $('#tarifa12').val(resp.Cabecera[0][16]);
      $('#iva').val(resp.Cabecera[0][17]);
      $('#descuento_total').val(resp.Cabecera[0][18]);
      $('#total').val(resp.Cabecera[0][19]);
      $("#detalle_factura tbody").html("");
      for(var i = 0; i < resp.Detalles.length; i++){        
        for(var j = 0; j < resp.Detalles[i].length; j=j+7){          
          $("#detalle_factura tbody").append( "<tr>" +"<td align=center>" + resp.Detalles[i][j] +"</td>" +"<td align=center>" + resp.Detalles[i][j+1] + "</td>" +"<td align=center>" + resp.Detalles[i][j+2] +"</td>" +"<td align=center>" + resp.Detalles[i][j+3] +"</td>" +"<td align=center>" + resp.Detalles[i][j+4] + "</td>" +"<td align=center>" + resp.Detalles[i][j+5] +"</td>" +"<td align=center>" + resp.Detalles[i][j+6] + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error ' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' ></i></a></div>"+ "</td><td class='hidden'>"+"NH"+"</td>" +"</tr>" );                     
        } 
      }
    }else{
      alert("Sin registros anteriores");
    }         
    $("#btn_0").text("");
    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> -----------");                   
  });
  $("#btn_5").on("click",function (){   
    var resp = "";    
    resp =adelante($("#comprobante").val(),"factura_compra","secuencia.php");   
    if(resp.Cabecera[0] != false){     
      $("#comprobante").val(resp.Cabecera[0][0]);
      $("#txt_responsable").text(resp.Cabecera[0][1]);
      $("#fecha_actual").val(resp.Cabecera[0][8]);
      $("#estado").val(resp.Cabecera[0][3]);
      $("#id_proveedor").val(resp.Cabecera[0][4]);
      $('#txt_nro_identificacion').html("");
      $('#txt_nro_identificacion').append($("<option resp-extra='"+resp.Cabecera[0][6]+"'></option>").val(resp.Cabecera[0][4]).html(resp.Cabecera[0][5])).trigger('chosen:updated');                    
      $('#txt_nombre_proveedor').html("");
      $('#txt_nombre_proveedor').append($("<option resp-extra='"+resp.Cabecera[0][5]+"'></option>").val(resp.Cabecera[0][4]).html(resp.Cabecera[0][6])).trigger('chosen:updated');                                                             
      $('#tipo_comprobante').val(resp.Cabecera[0][7]);
      $('#tipo_comprobante').trigger("chosen:updated");
      $('#fecha_registro').val(resp.Cabecera[0][8]);
      $('#fecha_emision').val(resp.Cabecera[0][9]);
      $('#fecha_caducidad').val(resp.Cabecera[0][10]);
      $('#fecha_cancelacion').val(resp.Cabecera[0][11]);
      var text = resp.Cabecera[0][12];
      $('#serie1').val(text.substr(0,3));
      $('#serie2').val(text.substr(4,3));
      $('#serie3').val(text.substr(8,30));
      $('#autorizacion').val(resp.Cabecera[0][13]);
      $('#formas').val(resp.Cabecera[0][14]);
      $('#formas').trigger("chosen:updated");
      $('#tarifa0').val(resp.Cabecera[0][15]);
      $('#tarifa12').val(resp.Cabecera[0][16]);
      $('#iva').val(resp.Cabecera[0][17]);
      $('#descuento_total').val(resp.Cabecera[0][18]);
      $('#total').val(resp.Cabecera[0][19]);
      $("#detalle_factura tbody").html("");
      for(var i = 0; i < resp.Detalles.length; i++){        
        for(var j = 0; j < resp.Detalles[i].length; j=j+7){          
          $("#detalle_factura tbody").append( "<tr>" +"<td align=center>" + resp.Detalles[i][j] +"</td>" +"<td align=center>" + resp.Detalles[i][j+1] + "</td>" +"<td align=center>" + resp.Detalles[i][j+2] +"</td>" +"<td align=center>" + resp.Detalles[i][j+3] +"</td>" +"<td align=center>" + resp.Detalles[i][j+4] + "</td>" +"<td align=center>" + resp.Detalles[i][j+5] +"</td>" +"<td align=center>" + resp.Detalles[i][j+6] + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error ' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' ></i></a></div>"+ "</td><td class='hidden'>"+"NH"+"</td>" +"</tr>" );                     
        } 
      }
    }else{
      alert("Sin registros superiores");
    }         
    $("#btn_0").text("");
    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> -----------");                   
  });

/////////////////////////////tabla factura///////////////////7
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Código', 'Producto', 'Cantidad', 'PVP', 'Descuento','Calculado', 'Total', 'Iva','Incluye'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'cod_producto', index: 'cod_producto', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',
      frozen: true, width: 50},
    {name: 'codigo', index: 'codigo', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',
      frozen: true, width: 180},
    {name: 'detalle', index: 'detalle', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 320},
    {name: 'cantidad', index: 'cantidad', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'precio_u', index: 'precio_u', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 110, editoptions:{maxlength: 10, size:15,dataInit: function(elem){$(elem).bind("keypress", function(e) {return punto(e)})}}}, 
    {name: 'descuento', index: 'descuento', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'cal_des', index: 'cal_des', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'total', index: 'total', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 150},
    {name: 'iva', index: 'iva', align: 'center', width: 100, hidden: true},
    {name: 'incluye', index: 'incluye', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 90}
  ],          
  rowNum: 10,       
  width: null,
  height:400,
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
        var subtotal0 = 0;
        var subtotal12 = 0;
        var iva12 = 0;
        var total_total = 0;
        var descu_total = 0;

        var subtotal = 0;
        var sub = 0;
        var sub1 = 0;
        var sub2 = 0;
        var iva = 0;
        var iva1 = 0;
        var iva2 = 0;

        var fil = jQuery("#list").jqGrid("getRowData"); 
        for (var t = 0; t < fil.length; t++) {
            if(ret.iva != 0) {
              if(ret.incluye == "No") {
                subtotal = ret.total;
                sub1 = subtotal;
                iva1 = (sub1 * 0.12).toFixed(3);                                          

                subtotal0 = parseFloat($("#tarifa0").val()) + 0;
                subtotal12 = parseFloat($("#tarifa12").val()) - parseFloat(sub1);
                iva12 = parseFloat($("#iva").val()) - parseFloat(iva1);
                descu_total = parseFloat($("#descuento_total").val()) - ret.cal_des;

                subtotal0 = parseFloat(subtotal0).toFixed(3);
                subtotal12 = parseFloat(subtotal12).toFixed(3);
                iva12 = parseFloat(iva12).toFixed(3);
                descu_total = parseFloat(descu_total).toFixed(3);
              } else {
                if(ret.incluye == "Si") {
                  subtotal = ret.total;
                  sub2 = (subtotal / 1.12).toFixed(3);
                  iva2 = (sub2 * 0.12).toFixed(3);

                  subtotal0 = parseFloat($("#tarifa0").val()) + 0;
                  subtotal12 = parseFloat($("#tarifa12").val()) - parseFloat(sub2);
                  iva12 = parseFloat($("#iva").val()) - parseFloat(iva2);
                  descu_total = parseFloat($("#descuento_total").val()) - ret.cal_des;

                  subtotal0 = parseFloat(subtotal0).toFixed(3);
                  subtotal12 = parseFloat(subtotal12).toFixed(3);
                  iva12 = parseFloat(iva12).toFixed(3);
                  descu_total = parseFloat(descu_total).toFixed(3);
                }
              }
            } else {
              if (ret.iva == 0) {
                  subtotal = ret.total;
                  sub = subtotal;

                  subtotal0 = parseFloat($("#tarifa0").val()) - parseFloat(sub);
                  subtotal12 = parseFloat($("#tarifa12").val()) + 0;
                  iva12 = parseFloat($("#iva").val()) + 0;
                  descu_total = parseFloat($("#descuento_total").val()) - ret.cal_des;
                  
                  subtotal0 = parseFloat(subtotal0).toFixed(3);
                  subtotal12 = parseFloat(subtotal12).toFixed(3);
                  iva12 = parseFloat(iva12).toFixed(3);
                  descu_total = parseFloat(descu_total).toFixed(3);
              }
            }
          }

          total_total = parseFloat(total_total) + (parseFloat(subtotal0) + parseFloat(subtotal12) + parseFloat(iva12));
          total_total = parseFloat(total_total).toFixed(3);

          $("#tarifa0").val(subtotal0);
          $("#tarifa12").val(subtotal12);
          $("#iva").val(iva12);
          $("#descuento_total").val(descu_total);
          $("#total").val(total_total);

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

jQuery(window).bind('resize', function () {
jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
}).trigger('resize');
  
}
// function carga_detalles_fc(id_tabla,comprobante){
//   $.ajax({        
//     type: "POST",
//     dataType: 'json',        
//     url: "../carga_ubicaciones.php?tipo=0&id="+comprobante+"&fun=17",        
//     success: function(response) {                 
//       for (var i = 0; i < response.length; i=i+7) {        
//         $("#"+id_tabla+" tbody").append( "<tr>" +"<td align=center>" + response[i] +"</td>" +"<td align=center>" + response[i+1] + "</td>" +"<td align=center>" + response[i+2] +"</td>" +"<td align=center>" + response[i+3] +"</td>" +"<td align=center>" + response[i+4] + "</td>" +"<td align=center>" + response[i+5] +"</td>" +"<td align=center>" + response[i+6] + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error ' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' ></i></a></div>"+ "</td><td class='hidden'>"+"NH"+"</td>" +"</tr>" );                     
//       }
//     }
//   });
// }
