$(document).on("ready",inicio);	
function inicio(){	 
  $('input[name=date-range-picker]').daterangepicker({
    'applyClass' : 'btn-sm btn-success',
    'cancelClass' : 'btn-sm btn-purple',
    locale: {
      applyLabel: 'Aplicar',
      cancelLabel: 'Cancelar',
    }
  }); 	 	  
  $('#btn_buscar').click(function(){
    //$('#td_libro').dataTable().fnClearTable();
    $('#td_libro tbody').html('');
    var debe = 0;
    var haber = 0;
    $.ajax({
        type: "POST",
        url: "libro_diario.php",  
        data:{fecha:$('#rango_fecha').val()},
        dataType: 'json',
        success: function(response) { 
        //console.log(response)                              
          for (var i = 0; i < response.length; i++) {           
            $('#td_libro tbody').append('<tr><td class="hidden"><strong>'+response[i].Cabecera[0]+'</strong></td><td ><strong>'+response[i].Cabecera[1]+'</td><td colspan=3><strong>'+response[i].Cabecera[2]+'</strong></td></tr>');
            $('#td_libro tbody').append('<tr><td class="center" ><strong>Fecha</strong></td><td class="center"><strong>Debe</strong></td><td class="center"><strong>Haber</strong></td><td class="center"><strong>Referencia</strong></td><td class="center"><strong>Detalle</strong></td></tr>');  
            for (var j = 0; j < response[i].Detalles.length; j=j+5) {           
              $('#td_libro tbody').append('<tr><td>'+response[i].Detalles[j]+'</td><td>'+response[i].Detalles[j+1]+'</td><td>'+response[i].Detalles[j+2]+'</td><td>'+response[i].Detalles[j+3]+'</td><td>'+response[i].Detalles[j+4]+'</td></tr>');
              if(!isNaN(parseFloat(response[i].Detalles[j+1]))){
                debe = parseFloat(debe) + parseFloat(response[i].Detalles[j+1]);                
              }
              if(!isNaN(parseFloat(response[i].Detalles[j+2]))){
                haber = parseFloat(haber) + parseFloat(response[i].Detalles[j+2]);           
              }
              
            }            
          }
          debe = debe.toFixed(3);
          haber = haber.toFixed(3);
          $('#td_libro tbody').append('<tr><td ><strong>Totales</td><td class="center"><strong>'+debe+'</strong></td><td class="center"><strong>'+haber+'</strong></td><td></td><td></td></tr>');
          //$("#dynamic-table tbody").html(acu);
         }                    
      });       
      
  })
  $('#btn_reporte').click(function(){    
    window.open("../reportes/libro_diario.php?fecha="+$('#rango_fecha').val());
  });
               	
}