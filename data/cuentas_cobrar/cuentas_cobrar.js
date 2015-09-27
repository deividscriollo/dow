$(document).on("ready",inicio);

function guardar_factura(){
  var tam = jQuery("#list").jqGrid("getRowData");

  if($("#id_cliente").val() == ""){
      $("#txt_nro_identificacion").trigger("chosen:open");    
      alert("Seleccione un cliente");
      $(this).addClass('reload');
    }else{
        if($("#serie3").val() == ""){
            $("#serie3").focus();
            alert("Ingrese la serie");
        }else{
            if(tam.length == 0){
                var a = autocompletar($("#serie3").val());
                $("#serie3").val(a + "" + $("#serie3").val());
                $("#codigo").trigger("chosen:open");
                alert("Ingrese productos a la Factura");  
            }else{
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
                    v1[i] = datos['cod_producto'];
                    v2[i] = datos['cantidad'];
                    v3[i] = datos['precio_u'];
                    v4[i] = datos['descuento'];
                    v5[i] = datos['total'];
                    v6[i] = datos['pendiente'];
                }
                
                for (i = 0; i < fil.length; i++) {
                    string_v1 = string_v1 + "|" + v1[i];
                    string_v2 = string_v2 + "|" + v2[i];
                    string_v3 = string_v3 + "|" + v3[i];
                    string_v4 = string_v4 + "|" + v4[i];
                    string_v5 = string_v5 + "|" + v5[i];
                    string_v6 = string_v6 + "|" + v6[i];
                }

                var a = autocompletar($("#serie3").val());
                $("#serie3").val(a + "" + $("#serie3").val());
                $.ajax({        
                    type: "POST",
                    data: $("#form_facturaVenta").serialize() + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5+ "&campo6=" + string_v6,                
                    url: "factura_venta.php",      
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

    $("#btn_01").click(function (){
      cargar_facturas();  
    });

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

    /////////////////bucador barras///////////////////////////
    $("#codigo_barras").keyup(function(e) {
        var precio = $("#tipo").val(); 
        var codigo = $("#codigo_barras").val();
        if (precio === "MINORISTA") {
            $.getJSON('search.php?codigo_barras=' + codigo + '&precio=' + precio, function(data) {
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
        }else{
            if (precio === "MAYORISTA") {
                $.getJSON('search.php?codigo_barras=' + codigo + '&precio=' + precio, function(data) {
                    var tama = data.length;
                    if (tama !== 0) {
                        for (var i = 0; i < tama; i = i + 10) {
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
            }
        }
    });
    ////////////////////////////////////////

    ///////////////////////busqueda productos codigo/////////
    $("#codigo").keyup(function(e) {
        var precio = $("#tipo").val();
        if (precio === "MINORISTA") {
            $("#codigo").autocomplete({
                source: "buscar_codigo.php?tipo_precio=" + precio,
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
        } else {
            if (precio === "MAYORISTA") {
                $("#codigo").autocomplete({
                    source: "buscar_codigo.php?tipo_precio=" + precio,
                    minLength: 1,
                    focus: function(event, ui) {
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
            }
        }
    });
    /////////////////////////////////////////

    ///////////////////////busqueda productos nombres/////////
    $("#producto").keyup(function(e) {
        var precio = $("#tipo").val();
        if (precio === "MINORISTA") {
            $("#producto").autocomplete({
                source: "buscar_producto.php?tipo_precio=" + precio,
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
        } else {
            if (precio === "MAYORISTA") {
                $("#producto").autocomplete({
                    source: "buscar_producto.php?tipo_precio=" + precio,
                    minLength: 1,
                    focus: function(event, ui) {
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
            }
        }
    });
    /////////////////////////////////////////

    ///////////////////accion limpiar//////////
    $("#tipo").change(function() {
      limpiar_input(); 
    });
    //////////////////////////////////////////

    /////////////////////////////////////////////////////////
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
                              codigo: $("#codigo").val(), 
                              detalle: $("#producto").val(), 
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
                                  codigo: $("#codigo").val(), 
                                  detalle: $("#producto").val(),
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
                            if(filas.length < 19){
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
                                    codigo: $("#codigo").val(), 
                                    detalle: $("#producto").val(), 
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
                            }else{
                                alert("Error... Alcanzo el limite máximo de Items");
                            }
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
                                if(dd['incluye'] == "No"){
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
                                }else{
                                    if(dd['incluye'] == "Si"){
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
                              }else{
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


// tabla pagos
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Factura a Pagar', 'Fecha Factura', 'Total CxC', 'Valor a Pagar', 'Saldo'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'id_pagos_venta', index: 'id_pagos_venta', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',frozen: true, width: 50},
    {name: 'num_factura', index: 'num_factura', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',
      frozen: true, width: 150},
    {name: 'fecha_factura', index: 'fecha_factura', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 290},
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
        

         var fil = jQuery("#list").jqGrid("getRowData");

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
            colNames: ['ID', 'Factura a Pagar', 'Fecha Factura', 'Total Monto', 'Valor a Pagar', 'Saldo'],
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


jQuery(window).bind('resize', function () {
jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
}).trigger('resize');

}