$(document).on("ready",inicio);

function recargar() {
  setTimeout(function() {
    location.reload();
  }, 1000);  
}

function guardar_factura() {
  var tam = jQuery("#list").jqGrid("getRowData");

  if($("#id_cliente").val() == ""){
      $("#txt_nro_identificacion").trigger("chosen:open");    
      alert("Seleccione un cliente");
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
                    v1[i] = datos['id_productos'];
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
                            $.gritter.add({
                              title: 'Información Mensaje',
                              text: ' <span class="fa fa-shield"></span>'
                                  +'Factura Agregada Correctamente <span class="text-succes fa fa-spinner fa-spin"></span>'
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
}

function limpiar_campo1(){
    if($("#codigo").val() === "") {
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

function limpiar_campo2(){
    if($("#producto").val() === "") {
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
  carga_forma_pago("formas");
  carga_termino_pago("termino_pago");

  if ($("#num_oculto").val() === "") {
        $("#serie3").val("");
    } else {
        var str = $("#num_oculto").val();
        var res = parseInt(str.substr(8, 16));
        res = res + 1;
        
        $("#serie3").val(res);
        var a = autocompletar(res);
        var validado = a + "" + res;
        $("#serie3").val(validado);
    }

    $("#codigo").on("keyup", limpiar_campo1);
    $("#producto").on("keyup", limpiar_campo2);

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
 	$("#cantidad").validCampoFranz("0123456789");
 	$("#serie3").validCampoFranz("0123456789");
 	$("#descuento").validCampoFranz("0123456789");
 	$("#serie3").attr("maxlength", "9");
 	$("#precio").on("keypress",punto);
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
			        // console.log(data)
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
    $("#codigo_barras").change(function(e) {      
        console.log(e)  
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
    	if(e.keyCode == 13) {//tecla del alt para el entrer poner 13 
          var subtotal0 = 0;
          var subtotal12 = 0;
          var iva12 = 0;
          var total_total = 0;
          var descu_total = 0;  
             
      		if($("#id_productos").val() != ""){
        		if($("#cantidad").val() != ""){
          			if($("#precio").val() != ""){
                        if($("#inventar").val() == "Si") {
                            if (parseInt($("#cantidad").val()) > parseInt($("#stock").val())) {
                                $("#cantidad").focus();
                                alert("Error.. Fuera de Stock cantidad disponible: " +$("#stock").val());
                            } else {
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

                            if (filas.length === 0) {
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
                                    pendiente: 0,
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

                                if (repe === 1) {
                                    suma = parseInt(can) + parseInt($("#cantidad").val());

                                    if(suma > parseInt($("#stock").val())){
                                        $("#cantidad").focus();
                                        alert("Error.. Fuera de Stock cantidad disponible: " +$("#stock").val());
                                    } else {
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
                                    }
                          } else {
                            if(filas.length < 19){
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
                                    pendiente: 0,
                                    incluye: $("#incluye").val()
                                };

                                su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                                limpiar_input();
                            } else {
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
                        ///////////////////////////////////////////////////// 
                    }
                  } else {
                    if($("#inventar").val() == "No") {
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

                      if (filas.length === 0) {
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
                              pendiente: 0,
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
                          if (repe === 1) {
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
                                if(filas.length < 19){
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
                                        pendiente: 0,
                                        incluye: $("#incluye").val()
                                    };
                                    su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                                    limpiar_input();
                                } else {
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
                        /////////////////////////////////////////////////////
                    } 
                  }
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
/*-----guardar factura compra--*/
  $("#btn_0").on("click",guardar_factura);

/////////////////////////////tabla factura///////////////////7
jQuery("#list").jqGrid({          
datatype: "local",
colNames: ['', 'ID', 'Código', 'Producto', 'Cantidad', 'PVP', 'Descuento','Calculado', 'Total', 'Iva', 'Pendientes','Incluye'],
colModel:[ 
    {name: 'myac', width: 50, fixed: true, sortable: false, resize: false, formatter: 'actions',
          formatoptions: {keys: false, delbutton: true, editbutton: false}
      },     
    {name: 'id_productos', index: 'id_productos', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center',
      frozen: true, width: 50},
    {name: 'codigo', index: 'codigo', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center',
      frozen: true, width: 150},
    {name: 'detalle', index: 'detalle', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 290},
    {name: 'cantidad', index: 'cantidad', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 70},
    {name: 'precio_u', index: 'precio_u', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 110, editoptions:{maxlength: 10, size:15,dataInit: function(elem){$(elem).bind("keypress", function(e) {return punto(e)})}}}, 
    {name: 'descuento', index: 'descuento', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'cal_des', index: 'cal_des', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'total', index: 'total', editable: false, search: false, frozen: true, editrules: {required: true}, align: 'center', width: 150},
    {name: 'iva', index: 'iva', align: 'center', width: 100, hidden: false},
    {name: 'pendiente', index: 'pendiente', editable: false, frozen: true, editrules: {required: true}, align: 'center', width: 90},
    {name: 'incluye', index: 'incluye', editable: false, hidden: true, frozen: true, editrules: {required: true}, align: 'center', width: 90}
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

jQuery(window).bind('resize', function () {
jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
}).trigger('resize');

}