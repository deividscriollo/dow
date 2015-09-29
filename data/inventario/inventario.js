$(document).on("ready",inicio);

function recargar() {
  setTimeout(function() {
    location.reload();
  }, 1000);  
}

function guardar_inventario(){
    var tam = jQuery("#list").jqGrid("getRowData");

    if(tam.length === 0) {
        $("#codigo_barras").focus();
        alert("Ingrese productos al inventario");  
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
            v2[i] = datos['stock'];
            v3[i] = datos['existencia'];
            v4[i] = datos['diferencia'];
            v5[i] = datos['precio_compra'];
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
            data: $("#form_inventario").serialize()+"&campo1="+string_v1+"&campo2="+string_v2+"&campo3="+string_v3+"&campo4="+string_v4+"&campo5="+string_v5,                
            url: "inventario.php",      
            success: function(data) { 
                if( data == 0 ){
                  $.gritter.add({
                        title: 'Información Mensaje',
                        text: '<span class="fa fa-shield"></span>'+ ' ' +'Inventario Agregado Correctamente <span class="text-succes fa fa-spinner fa-spin"></span>'
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

function limpiar_campo1(){
    if($("#codigo").val() == "") {
        $("#codigo_barras").val("");
        $("#id_productos").val("");
        $("#producto").val("");
        $("#cantidad").val("");
        $("#precio").val("");
        $("#descuento").val("");
        $("#stock").val("");
        $("#p_venta").val("");
    }
} 

function limpiar_campo2(){
    if($("#producto").val() == "") {
        $("#codigo_barras").val("");
        $("#id_productos").val("");
        $("#codigo").val("");
        $("#cantidad").val("");
        $("#precio").val("");
        $("#descuento").val("");
        $("#stock").val("");
        $("#p_venta").val("");
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

  $("#cantidad").validCampoFranz("0123456789");
  $("#codigo").on("keyup", limpiar_campo1);
  $("#producto").on("keyup", limpiar_campo2);

   // bucador barras
    $("#codigo_barras").change(function(e) {
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
                  $("#p_venta").val(data[i + 6]);
                  $("#cantidad").focus();
              }
          } else {
              $("#id_productos").val("");
              $("#codigo").val("");
              $("#producto").val("");
              $("#precio").val("");
              $("#descuento").val("");
              $("#stock").val("");
              $("#p_venta").val("");
          }
      });
    });
    // fin

    // busqueda productos codigo
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
          $("#stock").val(ui.item.stock);
          $("#p_venta").val(ui.item.p_venta);
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
          $("#p_venta").val(ui.item.p_venta);
          $("#cantidad").focus();
          return false;
          }

          }).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li>")
          .append("<a>" + item.value + "</a>")
          .appendTo(ul);
      };
    // fin

    // busqueda productos nombres
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
          $("#stock").val(ui.item.stock);
          $("#p_venta").val(ui.item.p_venta);
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
          $("#p_venta").val(ui.item.p_venta);
          $("#cantidad").focus();
          return false;
          }

          }).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li>")
          .append("<a>" + item.value + "</a>")
          .appendTo(ul);
      };
    // fin 

    // agregar datos a los detalles
  $("#cantidad").on("keypress",function (e) {
    if(e.keyCode == 13){//tecla del alt para el entrer poner 13
        if($("#id_productos").val() != "") {
            if($("#cantidad").val() != "") {

                var filas = jQuery("#list").jqGrid("getRowData");
                var su = 0;
                var dife = 0;
                if (filas.length === 0) {
                   dife = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())))
                    var datarow = {
                        id_productos: $("#id_productos").val(), 
                        codigo: $("#codigo").val(), 
                        nombre_producto: $("#producto").val(), 
                        precio_compra: $("#precio").val(), 
                        precio_venta: $("#p_venta").val(), 
                        stock: $("#stock").val(), 
                        existencia:  $("#cantidad").val(), 
                        diferencia: dife
                    };
                    su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                    limpiar_input();
                }
                else {
                    var repe = 0;
                    for (var i = 0; i < filas.length; i++) {
                        var id = filas[i];
                        if (id['id_productos'] === $("#id_productos").val()) {
                            repe = 1;
                        }
                    }

                    if (repe == 1) {
                       dife = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())))
                        datarow = {
                            id_productos: $("#id_productos").val(), 
                            codigo: $("#codigo").val(), 
                            nombre_producto: $("#producto").val(), 
                            precio_compra: $("#precio").val(), 
                            precio_venta: $("#p_venta").val(), 
                            stock: $("#stock").val(), 
                            existencia:  $("#cantidad").val(), 
                            diferencia: dife
                        };
                        su = jQuery("#list").jqGrid('setRowData', $("#id_productos").val(), datarow);
                        limpiar_input();
                    }
                    else {
                        dife = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())))
                        datarow = {
                            id_productos: $("#id_productos").val(), 
                            codigo: $("#codigo").val(), 
                            nombre_producto: $("#producto").val(), 
                            precio_compra: $("#precio").val(), 
                            precio_venta: $("#p_venta").val(), 
                            stock: $("#stock").val(), 
                            existencia:  $("#cantidad").val(), 
                            diferencia: dife
                        };
                        su = jQuery("#list").jqGrid('addRowData', $("#id_productos").val(), datarow);
                        limpiar_input();
                    }
                }
                
                ///////////////////calcular valores//////////////
                var valor_cos = 0;
                var valor_ven = 0;
                var fil = jQuery("#list").jqGrid("getRowData");
                for (var t = 0; t < fil.length; t++) {
                    var dd = fil[t];
                    valor_cos = (valor_cos + parseFloat(dd['precio_compra']));
                    var valor_costo = (valor_cos).toFixed(2);
                    valor_ven = (valor_ven + parseFloat(dd['precio_venta']));
                    var valor_venta = (valor_ven).toFixed(2);
                    }
                $("#total_costo").val(valor_costo);
                $("#total_venta").val(valor_venta);

            }else{
                $("#codigo_barras").focus();
                alert("Seleccione un producto antes de continuar");
            }
        }else{
            alert("Ingrese una cantidad");
            
        }
    }
});

/*-----guardar factura compra--*/
  $("#btn_0").on("click",guardar_inventario);

      jQuery("#list").jqGrid({
        datatype: "local",
        colNames: ['','ID', 'CÓDIGO', 'PRODUCTO', 'P. COSTO', 'P. VENTA', 'STOCK', 'EXISTENCIA', 'DIFERENCIA'],
        colModel: [
            {name: 'myac', width: 50, fixed: true, sortable: false, search: false, resize: false, formatter: 'actions', formatoptions: {keys: false, delbutton: true, editbutton: false}},
            {name: 'id_productos', index: 'id_productos', editable: false, search: false, hidden: true, editrules: {edithidden: false}, align: 'center', frozen: true, width: 50},
            {name: 'codigo', index: 'codigo', editable: false, search: true, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 200},
            {name: 'nombre_producto', index: 'nombre_producto', editable: false, search: true, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 450},
            {name: 'precio_compra', index: 'precio_compra', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 110},
            {name: 'precio_venta', index: 'precio_venta', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 110},
            {name: 'stock', index: 'stock', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 100},
            {name: 'existencia', index: 'existencia', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 110},
            {name: 'diferencia', index: 'diferencia', editable: false, search: false, hidden: false, editrules: {edithidden: false}, align: 'center', frozen: true, width: 110}
        ],
        rowNum: 30,
        width: 900,
        height: 400,
        sortable: true,
        rowList: [10, 20, 30],
        pager: jQuery('#pager'),
        sortname: 'id_productos',
        sortorder: 'asc',
        viewrecords: true,
        cellEdit: true,
        cellsubmit: 'clientArray',
        shrinkToFit: true,
        delOptions: {
            modal: true,
            jqModal: true,
            onclickSubmit: function(rp_ge, rowid) {
                var id = jQuery("#list").jqGrid('getGridParam', 'selrow');
                jQuery('#list').jqGrid('restoreRow', id);
                var ret = jQuery("#list").jqGrid('getRowData', id);
                
                rp_ge.processing = true;
                var su = jQuery("#list").jqGrid('delRowData', rowid);
                
                var total_costo = 0;
                var total_venta = 0;
                if (su === true) {
                    total_costo = (parseFloat($("#total_costo").val()) - ret.precio_compra).toFixed(2);
                    total_venta = (parseFloat($("#total_venta").val()) - ret.precio_venta).toFixed(2);
                    $("#total_costo").val(total_costo);
                    $("#total_venta").val(total_venta);  
                }
                $(".ui-icon-closethick").trigger('click');
                return true;
            },
            processing: true
        },
        gridComplete: function () {
            if (jQuery("div.ui-jqgrid-bdiv > DIV").height() < 249) {
                jQuery("#list").parents('div.ui-jqgrid-bdiv').css("height", 250);
            }
            else {
                jQuery("#list").parents('div.ui-jqgrid-bdiv').css("height", "100%");
            }
        }
    }).jqGrid('navGrid', '#pager',
            {
                add: false,
                edit: false,
                del: false,
                refresh: false,
                search: true,
                view: true,
                searchtext: "Buscar",
                viewtext: "Ver"
            },
    {
        recreateForm: true, closeAfterEdit: true, checkOnUpdate: true, reloadAfterSubmit: true, closeOnEscape: true
         
    },
    {
        reloadAfterSubmit: true, closeAfterAdd: true, checkOnUpdate: true, closeOnEscape: true,
        bottominfo: "Los campos marcados con (*) son obligatorios", width: 350, checkOnSubmit: false
       
    },
    {
        width: 300, closeOnEscape: true
    },
    {
        closeOnEscape: true,
        multipleSearch: false, overlay: false
    },
    {
        closeOnEscape: true,
        width: 400
    },
    {
        closeOnEscape: true
    });

    jQuery(window).bind('resize', function () {
      jQuery("#list").setGridWidth(jQuery('#grid_container').width(), true);
  }).trigger('resize');

}


