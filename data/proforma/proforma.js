$(document).on("ready",inicio);

function recargar() {
  setTimeout(function() {
    location.reload();
  }, 1000);  
}

function actualizar () {
  location.reload();
}

function guardar_proforma() {
  var tam = jQuery("#list").jqGrid("getRowData");

  if($("#id_cliente").val() == "") {
      $("#txt_nro_identificacion").trigger("chosen:open");    
      alert("Seleccione un cliente");
    } else {
        if(tam.length == 0) {
            $("#codigo_barras").focus();
            alert("Ingrese productos a la Proforma");  
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
                v1[i] = datos['id_productos'];
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
                data: $("#form_proforma").serialize() + "&campo1=" + string_v1 + "&campo2=" + string_v2 + "&campo3=" + string_v3 + "&campo4=" + string_v4 + "&campo5=" + string_v5,                
                url: "proforma.php",      
                success: function(data) { 
                    if( data == 0 ){
                      $.gritter.add({
                          title: 'Información Mensaje',
                          text: '<span class="fa fa-shield"></span>'+ ' ' +'Proforma Agregada Correctamente <span class="text-succes fa fa-spinner fa-spin"></span>'
                              ,
                          sticky: false,
                          time: 1000,                       
                        });
                      recargar(); 
                    }
                }
            }); 
        }
    }
}

function limpiar_campo1() {
    if($("#codigo").val() == "") {
        $("#codigo_barras").val("");
        $("#id_productos").val("");
        $("#producto").val("");
        $("#cantidad").val("");
        $("#precio").val("");
        $("#descuento").val("");
        $("#stock").val("");
        $("#iva_producto").val("");
        $("#inventar").val("");
        $("#incluye").val("");
    }
} 

function limpiar_campo2() {
    if($("#producto").val() == "") {
        $("#codigo_barras").val("");
        $("#id_productos").val("");
        $("#codigo").val("");
        $("#cantidad").val("");
        $("#precio").val("");
        $("#descuento").val("");
        $("#stock").val("");
        $("#iva_producto").val("");
        $("#inventar").val("");
        $("#incluye").val("");
    }
} 

function inicio (){	
  show();

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


 	// validaciones 
 	$("#cantidad").validCampoFranz("0123456789");
 	$("#descuento").validCampoFranz("0123456789");
    $("#codigo").on("keyup", limpiar_campo1);
    $("#producto").on("keyup", limpiar_campo2);
    // fin

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
			       
		    	}	        
		    });
	    }	  
	});


	$("#txt_nro_identificacion").chosen().change(function (event,params) {
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
		    	}	        
		    });
	    }	  
	});

	$("#txt_nombre_cliente").chosen().change(function (event,params) {
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
		} else {
			var a = $("#txt_nombre_cliente option:selected");            
      		$('#txt_nro_identificacion').html("");
      		$('#txt_nro_identificacion').append($("<option data-extra='"+$(a).text()+"' data-direccion='"+$(a).data("direccion")+"' data-telefono='"+$(a).data("telefono")+"' data-email='"+$(a).data("email")+"'></option>").val($(a).val()).html($(a).data("extra"))).trigger('chosen:updated');      		
      		$("#id_cliente").val($(a).val());		        
			$('#lbl_client_telefono').val($(a).data("telefono"));
			$('#lbl_client_correo').val($(a).data("email"));
			$('#lbl_client_direccion').val($(a).data("direccion"));
		}
	});

    // bucador barras
    $("#codigo_barras").change(function(e) {
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
                } else {
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
        } else {
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
                    } else {
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
    // fin

    // busqueda productos codigo
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
    // fin

    // busqueda productos nombres
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
    // fin

    // accion limpiar
    $("#tipo").change(function() {
      limpiar_input(); 
    });
    // fin

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
              
      		if($("#id_productos").val() != "") {
                if($("#cantidad").val() != "") {
                    if($("#precio").val() != "") {
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
                      var suma = 0;

                      if (filas.length == 0) {
                          if ($("#descuento").val() !== "") {
                                desc = $("#descuento").val();
                                precio = (parseFloat($("#precio").val())).toFixed(3);
                                multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
                                descuento = ((multi * parseFloat(desc)) / 100);
                                flotante = parseFloat(descuento);
                                resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                total = (multi - resultado).toFixed(3);
                            } else {
                                desc = 0;
                                precio = (parseFloat($("#precio").val())).toFixed(3);
                                multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
                                descuento = ((multi * parseFloat(desc)) / 100);
                                flotante = parseFloat(descuento);
                                resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                total = (parseFloat($("#cantidad").val()) * precio).toFixed(3);
                            }
                          
                          var datarow = {
                              id_productos: $("#id_productos").val(), 
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
                              
                              if (id['id_productos'] == $("#id_productos").val()) {
                                  repe = 1;
                                  var can = id['cantidad'];
                              }
                          }

                          if (repe == 1) {
                              suma = parseInt(can) + parseInt($("#cantidad").val());

                              if ($("#descuento").val() !== "") {
                                    desc = $("#descuento").val();
                                    precio = (parseFloat($("#precio").val())).toFixed(3);
                                    multi = (parseFloat(suma) * parseFloat($("#precio").val())).toFixed(3);
                                    descuento = ((multi * parseFloat(desc)) / 100);
                                    flotante = parseFloat(descuento);
                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                    total = (multi - resultado).toFixed(3);
                                } else {
                                    desc = 0;
                                    precio = (parseFloat($("#precio").val())).toFixed(3);
                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
                                    descuento = ((multi * parseFloat(desc)) / 100);
                                    flotante = parseFloat(descuento);
                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                    total = (parseFloat(suma) * precio).toFixed(3);
                                }
                          
                                datarow = {
                                    id_productos: $("#id_productos").val(), 
                                    codigo: $("#codigo").val(), 
                                    detalle: $("#producto").val(), 
                                    cantidad: suma, 
                                    precio_u: precio, 
                                    descuento: desc, 
                                    cal_des: resultado,
                                    total: total, 
                                    iva: $("#iva_producto").val(), 
                                    pendiente: 0,
                                    incluye: $("#incluye").val()
                                };
                          
                            su = jQuery("#list").jqGrid('setRowData', $("#id_productos").val(), datarow);
                            limpiar_input();
                        } else {
                            if(filas.length < 19) {
                                if ($("#descuento").val() !== "") {
                                    desc = $("#descuento").val();
                                    precio = (parseFloat($("#precio").val())).toFixed(3);
                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
                                    descuento = ((multi * parseFloat(desc)) / 100);
                                    flotante = parseFloat(descuento) ;
                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                    total = (multi - resultado).toFixed(3);
                                } else {
                                    desc = 0;
                                    precio = (parseFloat($("#precio").val())).toFixed(3);
                                    multi = (parseFloat($("#cantidad").val()) * parseFloat($("#precio").val())).toFixed(3);
                                    descuento = ((multi * parseFloat(desc)) / 100);
                                    flotante = parseFloat(descuento);
                                    resultado = (Math.round(flotante * Math.pow(10,2)) / Math.pow(10,2)).toFixed(3);
                                    total = (parseFloat($("#cantidad").val()) * precio).toFixed(3);
                                }
                            
                                datarow = {
                                    id_productos: $("#id_productos").val(), 
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

                        // Calcular valores
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
                                    descu_total = parseFloat(descu_total) + parseFloat(dd['cal_des']);
                                
                                    subtotal0 = parseFloat(subtotal0).toFixed(3);
                                    subtotal12 = parseFloat(subtotal12).toFixed(3);
                                    iva12 = parseFloat(iva12).toFixed(3);
                                    descu_total = parseFloat(descu_total).toFixed(3);
                                } else {
                                    if(dd['incluye'] == "Si"){
                                        subtotal = dd['total'];
                                        sub2 = (subtotal / 1.12).toFixed(3);
                                        iva2 = (sub2 * 0.12).toFixed(3);

                                        subtotal0 = parseFloat(subtotal0) + 0;
                                        subtotal12 = parseFloat(subtotal12) + parseFloat(sub2);
                                        iva12 = parseFloat(iva12) + parseFloat(iva2);
                                        descu_total = parseFloat(descu_total) + parseFloat(dd['cal_des']);

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
                                    descu_total = parseFloat(descu_total) + parseFloat(dd['cal_des']);
                                    
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
          			} else {
                        $("#precio").focus();  
                        alert("Ingrese un precio");                        
        	  		}
        		} else {
                    $("#cantidad").focus();
                    alert("Ingrese una cantidad");
    	      		
        		}
      		} else {
                $('#codigo_barras').focus();
                alert("Seleccione un producto antes de continuar"); 
      		}
    	}
	});

/*-----guardar proforma--*/
$("#btn_0").on("click", guardar_proforma);
$("#btn_1").on("click", actualizar);

$("#btn_2").on("click",function () { 
    $.ajax({
        type: "POST",
        url: "../procesos/secuencia.php",
        data: "comprobante=" + $("#comprobante").val() + "&tabla=" + "proforma" + "&id_tabla=" + "id_proforma" + "&tipo=" + 1,
        success: function(data) {
            var val = data;
            if(val != '0') {
                $("#comprobante").val(val);
                var valor = val;

                // limpiar campos
                $('#txt_nro_identificacion').html("");
                $('#txt_nombre_cliente').html("");
                $("#lbl_client_direccion").val("");
                $("#lbl_client_telefono").val("");
                $("#lbl_client_correo").val("");
                $('#tipo').html("");

                $("#list").jqGrid("clearGridData", true);
                $("#tarifa0").val("0.000");
                $("#tarifa12").val("0.000");
                $("#iva").val("0.000");
                $("#descuento_total").val("0.000");
                $("#total").val("0.000");

                $.getJSON('retornar_proforma1.php?com=' + valor, function(data) {
                  var tama = data.length;
                  if (tama != 0) {
                        for (var i = 0; i < tama; i = i + 16) {
                            $("#id_proforma").val(data[i]);
                            $("#fecha_actual").val(data[i + 1]);
                            $("#hora_actual").val(data[i + 2]);
                            $("#digitador").val(data[i + 3]);
                            $("#id_cliente").val(data[i + 4]);
                            $('#txt_nro_identificacion').append($("<option data-extra='" + data[i + 5] + "'></option>").html(data[i + 5])).trigger('chosen:updated');                    
                            $('#txt_nombre_cliente').append($("<option data-extra='" + data[i + 6] + "'></option>").html(data[i + 6])).trigger('chosen:updated');                                                             
                            $("#lbl_client_direccion").val(data[i + 7]);
                            $("#lbl_client_telefono").val(data[i + 8]);
                            $("#lbl_client_correo").val(data[i + 9]);
                            $('#tipo').append($("<option data-extra='" + data[i + 10] + "'></option>").html(data[i + 10])).trigger('chosen:updated');                                                             
                            $("#tarifa0").val(data[i + 11]);
                            $("#tarifa12").val(data[i + 12]);
                            $("#iva").val(data[i + 13]);
                            $("#descuento_total").val(data[i + 14]);
                            $("#total").val(data[i + 15]);
                        }
                    }
                });

                $.getJSON('retornar_proforma2.php?com=' + valor, function(data) {
                  var tama = data.length;
                    if (tama !== 0) {
                         for (var i = 0; i < tama; i = i + 9) {
                            var datarow = {
                                id_productos: data[i], 
                                codigo: data[i + 1], 
                                detalle: data[i + 2], 
                                cantidad: data[i + 3], 
                                precio_u: data[i + 4], 
                                descuento: data[i + 5], 
                                total: data[i + 6], 
                                iva: data[i + 7],
                                incluye: data[i + 8]
                                };
                            var su = jQuery("#list").jqGrid('addRowData', data[i], datarow);
                        }
                    }
                });
                $("#btn_0").text("");
                $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> ----------");
            } else {
                alert("Sin registros Posteriores!!");
        }
      }
    });
});

$("#btn_3").on("click",function () { 
    $.ajax({
        type: "POST",
        url: "../procesos/secuencia.php",
        data: "comprobante=" + $("#comprobante").val() + "&tabla=" + "proforma" + "&id_tabla=" + "id_proforma" + "&tipo=" + 2,
        success: function(data) {
            var val = data;
            if(val != '0') {
                $("#comprobante").val(val);
                var valor = val;

                // limpiar campos
                $('#txt_nro_identificacion').html("");
                $('#txt_nombre_cliente').html("");
                $("#lbl_client_direccion").val("");
                $("#lbl_client_telefono").val("");
                $("#lbl_client_correo").val("");
                $('#tipo').html("");

                $("#list").jqGrid("clearGridData", true);
                $("#tarifa0").val("0.000");
                $("#tarifa12").val("0.000");
                $("#iva").val("0.000");
                $("#descuento_total").val("0.000");
                $("#total").val("0.000");

                $.getJSON('retornar_proforma1.php?com=' + valor, function(data) {
                  var tama = data.length;
                  if (tama != 0) {
                        for (var i = 0; i < tama; i = i + 16) {
                            $("#id_proforma").val(data[i]);
                            $("#fecha_actual").val(data[i + 1]);
                            $("#hora_actual").val(data[i + 2]);
                            $("#digitador").val(data[i + 3]);
                            $("#id_cliente").val(data[i + 4]);
                            $('#txt_nro_identificacion').append($("<option data-extra='" + data[i + 5] + "'></option>").html(data[i + 5])).trigger('chosen:updated');                    
                            $('#txt_nombre_cliente').append($("<option data-extra='" + data[i + 6] + "'></option>").html(data[i + 6])).trigger('chosen:updated');                                                             
                            $("#lbl_client_direccion").val(data[i + 7]);
                            $("#lbl_client_telefono").val(data[i + 8]);
                            $("#lbl_client_correo").val(data[i + 9]);
                            $('#tipo').append($("<option data-extra='" + data[i + 10] + "'></option>").html(data[i + 10])).trigger('chosen:updated');                                                             
                            $("#tarifa0").val(data[i + 11]);
                            $("#tarifa12").val(data[i + 12]);
                            $("#iva").val(data[i + 13]);
                            $("#descuento_total").val(data[i + 14]);
                            $("#total").val(data[i + 15]);
                        }
                    }
                });

                $.getJSON('retornar_proforma2.php?com=' + valor, function(data) {
                  var tama = data.length;
                    if (tama !== 0) {
                         for (var i = 0; i < tama; i = i + 9) {
                            var datarow = {
                                id_productos: data[i], 
                                codigo: data[i + 1], 
                                detalle: data[i + 2], 
                                cantidad: data[i + 3], 
                                precio_u: data[i + 4], 
                                descuento: data[i + 5], 
                                total: data[i + 6], 
                                iva: data[i + 7],
                                incluye: data[i + 8]
                                };
                            var su = jQuery("#list").jqGrid('addRowData', data[i], datarow);
                        }
                    }
                });
                $("#btn_0").text("");
                $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> ----------");
            } else {
                alert("Sin registros Superiores!!");
        }
      }
    });
});

// tabla factura
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Código', 'Producto', 'Cantidad', 'PVP', 'Descuento','Calculado', 'Total', 'Iva','Incluye'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'id_productos', index: 'id_productos', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center', frozen: true, width: 50},
    {name: 'codigo', index: 'codigo', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 150},
    {name: 'detalle', index: 'detalle', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 250},
    {name: 'cantidad', index: 'cantidad', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'precio_u', index: 'precio_u', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 90, editoptions:{maxlength: 10, size:15,dataInit: function(elem){$(elem).bind("keypress", function(e) {return punto(e)})}}}, 
    {name: 'descuento', index: 'descuento', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'cal_des', index: 'cal_des', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 50},
    {name: 'total', index: 'total', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'iva', index: 'iva', align: 'center', width: 50, hidden: true},
    {name: 'incluye', index: 'incluye', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 50}
  ],          
  rowNum: 10,       
  width: null,
  height:400,
  shrinkToFit: false,
  sortable: true,
  rowList: [10,20,30],
  // pager: jQuery('#pager'),
  sortname: 'id_productos',        
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
                descu_total = parseFloat($("#descuento_total").val()) - parseFloat(ret.cal_des);

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
                  descu_total = parseFloat($("#descuento_total").val()) - parseFloat(ret.cal_des);

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
                  descu_total = parseFloat($("#descuento_total").val()) - parseFloat(ret.cal_des);
                  
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

/*jqgrid*/    
jQuery(function($) {
var grid_selector = "#table2";
var pager_selector = "#pager2";    
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
  url: 'xml_proforma.php',        
  colNames: ['ID','IDENTIFICACIÓN','CLIENTE','MONTO TOTAL','FECHA'],
  colModel:[      
        {name: 'id_proforma', index: 'id_proforma', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',frozen: true, width: 50},
        {name: 'identificacion', index: 'identificacion', editable: false, search: true, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 150},
        {name: 'nombres_completos', index: 'nombres_completos', editable: true, search: true, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 200},
        {name: 'monto_total', index: 'monto_total', editable: true, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 100},
        {name: 'fecha_actual', index: 'fecha_actual', editable: true, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',frozen: true, width: 100},
      ],          
      rowNum: 10,       
      width: null,
      shrinkToFit: false,
      height:200,
      rowList: [10,20,30],
      pager: pager_selector,        
      sortname: 'id_proforma',
      sortorder: 'asc',
      caption: 'LISTA DE PROFORMAS',          
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
        
        $("#comprobante").val(ret.id_proforma);
        var valor = ret.id_proforma;

        // limpiar campos
        $('#txt_nro_identificacion').html("");
        $('#txt_nombre_cliente').html("");
        $("#lbl_client_direccion").val("");
        $("#lbl_client_telefono").val("");
        $("#lbl_client_correo").val("");
        $('#tipo').html("");

        $("#list").jqGrid("clearGridData", true);
        $("#tarifa0").val("0.000");
        $("#tarifa12").val("0.000");
        $("#iva").val("0.000");
        $("#descuento_total").val("0.000");
        $("#total").val("0.000");

        $.getJSON('retornar_proforma1.php?com=' + valor, function(data) {
          var tama = data.length;
          if (tama != 0) {
                for (var i = 0; i < tama; i = i + 16) {
                    $("#id_proforma").val(data[i]);
                    $("#fecha_actual").val(data[i + 1]);
                    $("#hora_actual").val(data[i + 2]);
                    $("#digitador").val(data[i + 3]);
                    $("#id_cliente").val(data[i + 4]);
                    $('#txt_nro_identificacion').append($("<option data-extra='" + data[i + 5] + "'></option>").html(data[i + 5])).trigger('chosen:updated');                    
                    $('#txt_nombre_cliente').append($("<option data-extra='" + data[i + 6] + "'></option>").html(data[i + 6])).trigger('chosen:updated');                                                             
                    $("#lbl_client_direccion").val(data[i + 7]);
                    $("#lbl_client_telefono").val(data[i + 8]);
                    $("#lbl_client_correo").val(data[i + 9]);
                    $('#tipo').append($("<option data-extra='" + data[i + 10] + "'></option>").html(data[i + 10])).trigger('chosen:updated');                                                             
                    $("#tarifa0").val(data[i + 11]);
                    $("#tarifa12").val(data[i + 12]);
                    $("#iva").val(data[i + 13]);
                    $("#descuento_total").val(data[i + 14]);
                    $("#total").val(data[i + 15]);
                }
            }
        });

        $.getJSON('retornar_proforma2.php?com=' + valor, function(data) {
          var tama = data.length;
            if (tama !== 0) {
                 for (var i = 0; i < tama; i = i + 9) {
                    var datarow = {
                        id_productos: data[i], 
                        codigo: data[i + 1], 
                        detalle: data[i + 2], 
                        cantidad: data[i + 3], 
                        precio_u: data[i + 4], 
                        descuento: data[i + 5], 
                        total: data[i + 6], 
                        iva: data[i + 7],
                        incluye: data[i + 8]
                        };
                    var su = jQuery("#list").jqGrid('addRowData', data[i], datarow);
                }
            }
        });

        $('#myModal').modal('hide');                         
        $("#btn_0").text("");
        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> ----------");                   
    }, 
      caption: "LISTA DE PROFORMAS"
  });
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