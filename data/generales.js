function fecha_actual (input){
    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    $("#"+input).text(strDate);    
}

function mostrar(input) {///funcion para mostrar la hora se necesita un nombre de campo como parametro
    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    var seconds = Digital.getSeconds();
    var dn = "AM";    
    if (hours > 12) {
        dn = "PM";
        hours = hours - 12;
    }
    if (hours === 0)
        hours = 12;
    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    $("#"+input).text(hours + ":" + minutes + ":" + seconds + " " + dn);
    //$("#"+input).val(hours + ":" + minutes + ":" + seconds + " " + dn);    
    setTimeout("mostrar('"+input+"')", 1000);    
}

function show() {
    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    var seconds = Digital.getSeconds();
    var dn = "AM";    
    if (hours > 12) {
        dn = "PM";
        hours = hours - 12;
    }
    if (hours === 0)
        hours = 12;
    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    $("#hora_actual").val(hours + ":" + minutes + ":" + seconds + " " + dn);

    setTimeout("show()", 1000);
}

function comprobarCamposRequired(form){
    
    var correcto=true;    
    var campos_text=$('#'+form+' input:required');    
    $(campos_text).each(function() {
        var pattern = new RegExp("^" + $(this)[0].pattern + "$");        
        if($(this).val() != '' && pattern.test($(this).val())){            
            $(this).parent().parent().removeClass('has-error');                        
        }else{
            correcto=false;
            $(this).parent().parent().addClass('has-error');
        }   
    });        
    return correcto; 
}

function autocompletar() {
    var temp = "";
    var serie = $("#serie3").val();
    for (var i = serie.length; i < 9; i++) {
        temp = temp + "0";
    }
    return temp;
}

function enter(e) {
    if (e.which === 13 || e.keyCode === 13) {
        entrar();
        return false;
    }
    return true;
}

function actualizar_form(){    
    setTimeout(function() {
      location.reload();
    }, 2000);
    
}

function limpiar_input() {
    $("#codigo_barras").val("");
    $("#id_productos").val("");
    $("#codigo").val("");
    $("#producto").val("");
    $("#cantidad").val("");
    $("#precio").val("");
    $("#p_venta").val("");
    $("#descuento").val("");
    $("#stock").val("");
    $("#iva_producto").val("");
    $("#inventar").val("");
    $("#incluye").val("");
    $("#codigo_barras").focus();
}

function limpiar_form(e){
    if(e != undefined)
    {
        var form;
        if(e.type == "click"){///mediante el click del boton
            $("#"+e.currentTarget.form.id+" input").val("");
            comprobarCamposRequired(e.currentTarget.form.id);       
            form = e.currentTarget.form.id;
        }else{//form por el evento submit
            if(e.type == "submit"){
                $("#"+e.target.id+" input").val("");
                comprobarCamposRequired(e.target.id);       
                form = e.target.id
            }else{///id directo del form
                $("#"+e+" input").val("");
                comprobarCamposRequired(e);     
                form = e;
            }
        }

        if(form == "form_usuario"){
            $("#btn_0").text("");
            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");
            $("#avatar").prop("src","img/default.png");            
            $("#table").trigger('reloadGrid');     
        }else{
            if(form == "form_cliente"){
                $("#btn_0").text("");
                $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");
                $("#table").trigger('reloadGrid');     
            }else{
                if(form == "form_proveedores"){
                    $("#btn_0").text("");
                    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");
                    $("#table").trigger('reloadGrid');
                    $("#txt_20").val('')
                    $("#txt_20").trigger('chosen:updated');
                    $("#txt_21").val('')
                    $("#txt_21").trigger('chosen:updated');
                    $("#txt_22").val('')
                    $("#txt_22").trigger('chosen:updated');
                    $("#txt_23").val('')
                    $("#txt_23").trigger('chosen:updated');
                    $("#txt_24").val('')
                    $("#txt_24").trigger('chosen:updated');
                    $("#txt_25").val('')
                    $("#txt_25").trigger('chosen:updated');

                }else{
                    if(form == "form_productos"){
                        $("#btn_0").text("");
                        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");
                        $("#table").trigger('reloadGrid');     
                        var extra_data = $("#txt_14").find(":selected").data("foo");        
                        $("#txt_15").val(extra_data);
                        $("#txt_12").val('0');
                        $("#txt_16").val('0');
                        $("#txt_17").val('0');
                        $("#descuento").val('0');
                        $("#txt_18").val('');
                        $("#txt_13").val('')
                        $("#txt_13").trigger('chosen:updated');
                        $("#txt_6").val('')
                        $("#txt_6").trigger('chosen:updated');
                        $("#avatar").prop("src","img/default.png");    
                        $("#txt_9").attr("readonly",false);
                        $("#txt_12").attr("readonly",false);   
                    }else{
                        if(form == "form_plan_cuentas"){
                            $("#btn_0").text("");
                            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                            $("#txt_0").val('');
                            $("#txt_1").val('');
                            $("#txt_2").val('');
                            $("#txt_3").val('');                                                                                    
                        }else{
                            if(form == "form_grupos"){
                                $("#btn_0").text("");
                                $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                                $("#txt_0").val('');
                                $("#txt_1").val('');
                                $("#txt_2").val('');
                                $("#td_grupos tbody").html("");
                                $("#table").trigger('reloadGrid');   
                                $("#table1").trigger('reloadGrid');   

                            }else{
                                if(form == "form_sustento"){
                                    $("#btn_0").text("");
                                    $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                                    $("#txt_0").val('');
                                    $("#txt_1").val('');
                                    $("#txt_2").val('');                                                                        
                                }else{
                                    if(form == "form_tipo_comprobante"){
                                        $("#btn_0").text("");
                                        $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                                        $("#txt_0").val('');
                                        $("#txt_1").val('');
                                        $("#txt_2").val('');                                                                        
                                    }else{
                                        if(form == "form_sust_compro"){
                                            $("#btn_0").text("");
                                            $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                                            $("#txt_0").val('');
                                            $("#txt_1").attr("disabled",false);
                                            $("#txt_1").trigger("chosen:updated");                      
                                            $("#td_sust_compro tbody").html(''); 
                                        }else{
                                            if(form == "form_retencion_fuente"){
                                                $("#btn_0").text("");
                                                $("#btn_0").append("<span class='glyphicon glyphicon-log-in'></span> Guardar");                                                        
                                                $("#txt_00").val('');                                                
                                                $("#txt_1").val('');
                                                $("#txt_2").val('');
                                                $("#txt_3").val('');
                                                $("#txt_4").val('');
                                                $("#txt_5").val('');
                                            }
                                        }

                                    }   
                                }   
                            }   
                        }   
                    }   
                }   
            }    
        }           
        $("input:not([readonly='readonly']):text:visible:first").focus();   
    }
}

function carga_ubicaciones(pais,provincia,ciudad){
    $.ajax({        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id=0&fun=1",        
        success: function(response) {         
            for (var i = 0; i < response.length; i=i+2) {               
                $("#"+pais).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                            
            }   
            $("#"+pais).trigger("chosen:updated");                              
            $.ajax({       /*cargar el select provincia*/        
                type: "POST",
                dataType: 'json',        
                url: "../carga_ubicaciones.php?tipo=0&id="+$("#"+pais).val()+"&fun=2",        
                success: function(response) {         
                    for (var i = 0; i < response.length; i=i+2) {               
                        $("#"+provincia).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
                    }   
                    $("#"+provincia).trigger("chosen:updated");      
                    $.ajax({      /*cargar el select ciudades*/         
                        type: "POST",
                        dataType: 'json',        
                        url: "../carga_ubicaciones.php?tipo=0&id="+$("#"+provincia).val()+"&fun=3",        
                        success: function(response) {         
                            for (var i = 0; i < response.length; i=i+2) {               
                                $("#"+ciudad).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
                            }   
                            $("#"+ciudad).trigger("chosen:updated");                              
                        }                   
                    });                        
                }                   
            });
        }                   
    }); 
}

function change_pais(pais,provincia,ciudad){    
    $.ajax({       /*cargar el select provincia*/        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id="+$("#"+pais).val()+"&fun=2",        
        success: function(response) {         
            $("#"+provincia).html("");
            for (var i = 0; i < response.length; i=i+2) {               
                $("#"+provincia).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
            }   
            $("#"+provincia).trigger("chosen:updated");      
            $.ajax({      /*cargar el select ciudades*/         
                type: "POST",
                dataType: 'json',        
                url: "../carga_ubicaciones.php?tipo=0&id="+$("#"+provincia).val()+"&fun=3",        
                success: function(response) {  
                    $("#"+ciudad).html("");       
                    for (var i = 0; i < response.length; i=i+2) {               
                        $("#"+ciudad).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
                    }   
                    $("#"+ciudad).trigger("chosen:updated");                              
                }                   
            });                        
        }                   
    });    
}

function change_provincia(pais,provincia,ciudad){    
    $.ajax({       /*cargar el select provincia*/        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id="+$("#"+provincia).val()+"&fun=3",        
        success: function(response) {         
            $("#"+ciudad).html("");
            for (var i = 0; i < response.length; i=i+2) {               
                $("#"+ciudad).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
            }   
            $("#"+ciudad).trigger("chosen:updated");                                      
        }                   
    });
}

function carga_detalles_productos(id_select,fun){     
    if(id_select == "txt_6"){
        $("#"+id_select+" option").not(":first").remove();
    }else{
        if(id_select == "txt_13"){
            $("#"+id_select+" option").not(":first").remove();
        }else{
            $("#"+id_select+" option").remove();    
        }           
    }
    $.ajax({        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id=0&fun="+fun,        
        success: function(response) {      
            if(id_select == "grupo_contable"){               
                for (var i = 0; i < response.length; i=i+3) {               
                    $("#"+id_select).append("<option value ="+response[i]+">"+response[i+1]+ " " +response[i+2] +"</option>");                                                                                                                                            
                }   
            }else{
                for (var i = 0; i < response.length; i=i+2) {               
                    $("#"+id_select).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                            
                }   
            }
            $("#"+id_select).trigger("chosen:updated");                                          
        }                   
    }); 
}

function carga_detalles_productos_1(id_select,fun){     
    $("#"+id_select+" option").remove();         
    $.ajax({        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&id=0&fun="+fun,        
        success: function(response) {                     
            for (var i = 0; i < response.length; i=i+3) {               
                $("#"+id_select).append("<option value ="+response[i]+" data-foo="+response[i+2]+">"+response[i+1]+"</option>");                                                                                                                                            
            }   
            $("#"+id_select).trigger("chosen:updated");                                          
            if(id_select == 'txt_14'){        
                var extra_data = $("#txt_14").find(":selected").data("foo");        
                $("#txt_15").val(extra_data);
            }       
        }                   
    });     
}

function punto(e){                
    if(e.keyCode == 46){        
        var texto = $(this).val();     
        var buscar = '.';      
        var contador = 0;    
        while (texto.indexOf(buscar) > -1) {        
            texto = texto.substr(texto.indexOf(buscar)+buscar.length,texto.length);
            contador++; 
        }
        //console.log(contador)
        if(contador <1 ){
            return true;
        } else{
            return false;
        }
    }    
}

function validarNumeros(e) { // 1       
    tecla = (document.all) ? e.keyCode : e.which; // 2
    //console.log(e.keyCode)
    if (tecla==8) return true; // backspace
    if (tecla==13) return true; // enter
    if (tecla==9) return true; // tab
    if (tecla==116) return true; // f5
    //if (tecla==109) return true; // menos
    if (tecla==110) return true; // punto
    //if (tecla==189) return true; // guion
    if (tecla==39) return true; // atras
    if (tecla==37) return true; // adelante
    if (e.ctrlKey && tecla==86) { return true}; //Ctrl v
    if (e.ctrlKey && tecla==67) { return true}; //Ctrl c
    if (e.ctrlKey && tecla==88) { return true}; //Ctrl x
    if (tecla>=96 && tecla<=105) { return true;} //numpad

    patron = /[0-9]/; // patron

    te = String.fromCharCode(tecla); 
    return patron.test(te); // prueba
}

function ci(campo,extranjero){ 
    if(extranjero == 'OFF'){
        var numero = $("#"+campo).val();        
        var suma = 0;      
        var residuo = 0;      
        var pri = false;      
        var pub = false;            
        var nat = false;                     
        var modulo = 11;
        var p1;
        var p2;
        var p3;
        var p4;
        var p5;
        var p6;
        var p7;
        var p8;            
        var p9; 
        var d1  = numero.substr(0,1);         
        var d2  = numero.substr(1,1);         
        var d3  = numero.substr(2,1);         
        var d4  = numero.substr(3,1);         
        var d5  = numero.substr(4,1);         
        var d6  = numero.substr(5,1);         
        var d7  = numero.substr(6,1);         
        var d8  = numero.substr(7,1);         
        var d9  = numero.substr(8,1);         
        var d10 = numero.substr(9,1);  

        if (d3 < 6){           
            nat = true;            
            p1 = d1 * 2;
            if (p1 >= 10) p1 -= 9;
            p2 = d2 * 1;
            if (p2 >= 10) p2 -= 9;
            p3 = d3 * 2;
            if (p3 >= 10) p3 -= 9;
            p4 = d4 * 1;
            if (p4 >= 10) p4 -= 9;
            p5 = d5 * 2;
            if (p5 >= 10) p5 -= 9;
            p6 = d6 * 1;
            if (p6 >= 10) p6 -= 9; 
            p7 = d7 * 2;
            if (p7 >= 10) p7 -= 9;
            p8 = d8 * 1;
            if (p8 >= 10) p8 -= 9;
            p9 = d9 * 2;
            if (p9 >= 10) p9 -= 9;             
            modulo = 10;
        } else if(d3 == 6){           
            pub = true;             
            p1 = d1 * 3;
            p2 = d2 * 2;
            p3 = d3 * 7;
            p4 = d4 * 6;
            p5 = d5 * 5;
            p6 = d6 * 4;
            p7 = d7 * 3;
            p8 = d8 * 2;            
            p9 = 0;            
        } else if(d3 == 9) {          
            pri = true;                                   
            p1 = d1 * 4;
            p2 = d2 * 3;
            p3 = d3 * 2;
            p4 = d4 * 7;
            p5 = d5 * 6;
            p6 = d6 * 5;
            p7 = d7 * 4;
            p8 = d8 * 3;
            p9 = d9 * 2;            
        }

        suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
        residuo = suma % modulo;                                         

        var digitoVerificador = residuo==0 ? 0: modulo - residuo; 
        ////////////verificamos del tipo cedula o ruc////////////////////        
        if (numero.length === 10) {     
            if(nat == true){
                if (digitoVerificador != d10){                                              
                    alert('El número de cédula es incorrecto.');
                    $("#"+campo).val("");
                    $("#"+campo).focus();
                }else{                    
                    //alert('El número de cédula es correcto.');
                }
            }
        }         
    }      
}

function ci_ruc_pass(campo,valor,documento){
    var numero = valor;
    var suma = 0;      
    var residuo = 0;      
    var pri = false;      
    var pub = false;            
    var nat = false;                     
    var modulo = 11;
    var p1;
    var p2;
    var p3;
    var p4;
    var p5;
    var p6;
    var p7;
    var p8;            
    var p9; 
    var d1  = numero.substr(0,1);         
    var d2  = numero.substr(1,1);         
    var d3  = numero.substr(2,1);         
    var d4  = numero.substr(3,1);         
    var d5  = numero.substr(4,1);         
    var d6  = numero.substr(5,1);         
    var d7  = numero.substr(6,1);         
    var d8  = numero.substr(7,1);         
    var d9  = numero.substr(8,1);         
    var d10 = numero.substr(9,1);  

    if (d3 < 6){           
        nat = true;            
        p1 = d1 * 2;
        if (p1 >= 10) p1 -= 9;
        p2 = d2 * 1;
        if (p2 >= 10) p2 -= 9;
        p3 = d3 * 2;
        if (p3 >= 10) p3 -= 9;
        p4 = d4 * 1;
        if (p4 >= 10) p4 -= 9;
        p5 = d5 * 2;
        if (p5 >= 10) p5 -= 9;
        p6 = d6 * 1;
        if (p6 >= 10) p6 -= 9; 
        p7 = d7 * 2;
        if (p7 >= 10) p7 -= 9;
        p8 = d8 * 1;
        if (p8 >= 10) p8 -= 9;
        p9 = d9 * 2;
        if (p9 >= 10) p9 -= 9;             
        modulo = 10;
    } else if(d3 == 6){           
        pub = true;             
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;            
        p9 = 0;            
    } else if(d3 == 9) {          
        pri = true;                                   
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;            
    }

    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
    residuo = suma % modulo;                                         
    var digitoVerificador = residuo==0 ? 0: modulo - residuo; 
    ////////////verificamos del tipo cedula o ruc////////////////////
    if (documento == "Cedula") {
        if (numero.length === 10) {
            if(nat == true){
                if (digitoVerificador != d10){                          
                    alert('El número de cédula es incorrecto.');
                    $("#"+campo).val("");
                }else{
                    alert('El número de cédula es correcto.');
                }
            }
        }
    }else{
        if (documento === "RUC") {
            var ruc = numero.substr(10,13);
            var digito3 = numero.substring(2,3);
            if(ruc == "001" ){
                if(digito3 < 6){ 
                    if(nat == true){
                     if (digitoVerificador != d10){                          
                      alert('El ruc persona natural es incorrecto.');
                      $("#"+campo).val("");
                      }else{
                       alert('El ruc persona natural es correcto.');    
                      } 
                    }
                }else{
                    if(digito3 == 6){ 
                        if (pub==true){  
                            if (digitoVerificador != d9){                          
                                alert('El ruc público es incorrecto.');
                                $("#"+campo).val("");
                            }else{
                                alert('El ruc público es correcto.'); 
                            } 
                        }
                    }else{
                        if(digito3 == 9){
                            if(pri == true){
                                if (digitoVerificador != d10){                          
                                    alert('El ruc privado es incorrecto.');
                                    $("#"+campo).val("");
                                }else{
                                    alert('El ruc privado es correcto.');      
                                } 
                            }
                        } 
                    }
                }
            }else{
                if(numero.length === 13){
                    alert('El ruc es incorrecto.'); 
                    $("#"+campo).val("");
                }
            }
        }else{

        }                    
    }         
}

function atras(id,carpeta,archivo) {
    var url = '';    
    //url = "../secuencia.php?id="+id+"&fn=0";    
    url = "../"+carpeta+"/"+archivo+"?id="+id+"&fn=0"; 
    var resp = "";    
    $.ajax({                
        type: "POST",
        dataType: 'json',       
        url: url, 
        async:false,          
        success: function(data) {               
            resp = data;
        }
    });     
    return resp;
}

function adelante(id,carpeta,archivo) {
    var url = '';    
    //url = "../secuencia.php?id="+id+"&fn=1";    
    url = "../"+carpeta+"/"+archivo+"?id="+id+"&fn=1"; 
    var resp = "";    
    $.ajax({                
        type: "POST",
        dataType: 'json',       
        url: url, 
        async:false,          
        success: function(data) {               
            resp = data;
        }
    });     
    return resp;
}

function appendToChosenProducto(id,val1,val2,val3,val4,val5,val6,val7,val8,val9,text,chosen,chosen1){      
    
    $('#'+chosen).append($("<option data-barras='"+val2+"' data-codigo='"+val3+"' data-precio='"+val4+"' data-stock='"+val5+"' data-iva='"+val6+"' data-inventariable='"+val7+"' data-incluye_iva='"+val8+"' data-descuento='"+val9+"' ></option>").val(id).html(val1)).trigger('chosen:updated');
    var input = $("#"+chosen1).children().next().children(); 
    $(input).children().val(text);            
}
function appendToChosenDevolucion(id,val1,val2,val3,val4,val5,val6,val7,text,chosen,chosen1){      
    $('#'+chosen).append($("<option data-barras='"+val2+"' data-codigo='"+val3+"' data-precio='"+val4+"' data-stock='"+val5+"' data-descuento='"+val6+"' data-total='"+val7+"' ></option>").val(id).html(val1)).trigger('chosen:updated');
    var input = $("#"+chosen1).children().next().children(); 
    $(input).children().val(text);            
}

function appendToChosen(id,value,text,extra,chosen,chosen1){            
    $('#'+chosen).append($("<option data-extra='"+extra+"'></option>").val(id).html(value)).trigger('chosen:updated');        
    var input_ci = $("#"+chosen1).children().next().children(); 
    $(input_ci).children().val(text);        
    //console.log($("#txt_nro_identificacion_chosen").children().children().next())        
}

function appendToChosen_cliente(id,value,text,extra,extra1,extra2,extra3,chosen,chosen1){            
    $('#'+chosen).append($("<option data-extra='"+extra+"' data-direccion='"+extra1+"' data-telefono='"+extra2+"' data-email='"+extra3+"'></option>").val(id).html(value)).trigger('chosen:updated');        
    var input_ci = $("#"+chosen1).children().next().children(); 
    $(input_ci).children().val(text);        
    //console.log($("#txt_nro_identificacion_chosen").children().children().next())        
}

function limpiar_chosen_codigo(){
    $('#codigo_barras').html("");
    $('#codigo_barras').append($("<option></option>"));          
    $('#codigo_barras').trigger('chosen:updated');
    $('#codigo').html("");
    $('#codigo').append($("<option></option>"));          
    $('#codigo').trigger('chosen:updated')
    $('#producto').html("");
    $('#producto').append($("<option></option>"));          
    $('#producto').trigger('chosen:updated');     
    $("#id_productos").val("");
    $("#precio").val("");   
    $("#stock").val("");    
    $("#cantidad").val(""); 
    $("#descuento").val(0);
    $("#iva_producto").val(""); 
    $("#incluye").val(""); 
    $("#inventar").val("");  
    $("#codigo").trigger("chosen:close");
    $("#codigo").trigger("chosen:open");                  
}

function eliminar_fila(){
    var desc_tabla = 0;
    var total_tabla = 0;
    var iva0 = 0;
    var iva12 = 0;
    var cant_tabla = 0;
    var precio_u_tabla = 0;
    $("a.dc_btn_accion").click(function(){
      $(this).parents("tr").fadeOut("normal", function(){
         $(this).children("td").each(function (index) {
                switch (index) {
                case 3:  
                    cant_tabla = $(this).text();                    
                break;
                case 6:   
                    precio_u_tabla = $(this).text();                    
                break; 
                case 8:
                    total_tabla=$(this).text();
                break;
                case 10:
                if ($(this).text() == 'on'){
                    iva12 = parseFloat($("#tarifa12").val()) - parseFloat(total_tabla);

                }else{
                    iva0 = parseFloat($("#tarifa0").val()) - parseFloat(total_tabla);
                }
                break;
             }
          });
         ///////////////calcular valores//////////////////////
         desc_tabla = desc_tabla + ((cant_tabla * precio_u_tabla) - total_tabla);
         var tot_iva = parseFloat(iva12 * 0.12).toFixed(3);    
         var total_fac = parseFloat(iva12) + parseFloat(tot_iva) + parseFloat(iva0);   

         $("#tarifa0").val(parseFloat(iva0).toFixed(3));
         $("#tarifa12").val(parseFloat(iva12).toFixed(3));
         $("#iva").val(parseFloat(tot_iva).toFixed(3));
         $("#descuento_total").val(parseFloat(desc_tabla).toFixed(2));    
         $("#total").val(parseFloat(total_fac).toFixed(2));
         $(this).remove(); 
       }); 
    });
}

function agregar_fila(id_tabla,id_productos,codigo_producto,detalle_producto,cantidad_producto,limite,precio_unitario,descuento,iva,inventariable){    
    var contador=0;
    var vect = new Array();     
    var cont=0;
    var repe = 0;
    var fila = 0;
    $("#"+id_tabla+" tbody tr").each(function (index) {                                  
        $(this).children("td").each(function (index) { 
            contador++;                                 
        });                                                         
    });  

    if(contador == 0){        
        if (descuento != "") {
            desc = descuento
            precio = (parseFloat(precio_unitario)).toFixed(2);
            multi = (cantidad_producto * parseFloat(precio_unitario)).toFixed(2);
            descuento = ((multi * parseFloat(desc))/100).toFixed(2);
            total = (multi - descuento).toFixed(2);
        }else{
            desc = 0;
            precio = (parseFloat(precio_unitario)).toFixed(2);
            total = (parseFloat(cantidad_producto) * precio).toFixed(2);
        }           
        $("#"+id_tabla+" tbody").append( "<tr>" +"<td align=center>" + id_productos +"</td>" +"<td align=center>" + codigo_producto + "</td>" +"<td align=center>" + detalle_producto +"</td>" +"<td align=center>" + cantidad_producto +"</td>" +"<td align=center class='hidden'>" + limite +"</td>" +"<td align=center class='hidden'>" + inventariable +"</td>" +"<td align=center>" + precio + "</td>" +"<td align=center>" + desc +"</td>" +"<td align=center>" + total + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick='return eliminar_fila(event)' ></i></a></div>"+ "</td><td class='hidden'>"+iva+"</td>" +"</tr>" ); 
    }else{         
        $("#"+id_tabla+" tbody tr").each(function (index) {                                                                 
            $(this).children("td").each(function (index) {                               
                switch (index) {                                            
                    case 0:
                    vect[cont] = $(this).text();   
                    break;                                                                                                                               
                }                                          
            });
            cont++;  
        });
        for(var i=0 ; i<vect.length; i++) {
            if(vect[i] == id_productos) {
                repe++;
                fila = i;
            }
        }                                
        if(repe==0){
            if (descuento !== "") {
                desc = descuento
                precio = (parseFloat(precio_unitario)).toFixed(2);
                multi = (cantidad_producto * parseFloat(precio_unitario)).toFixed(2);
                descuento = ((multi * parseFloat(desc))/100).toFixed(2);
                total = (multi - descuento).toFixed(2);
            }else{
                desc = 0;
                precio = (parseFloat(precio_unitario)).toFixed(2);
                total = (parseFloat(cantidad_producto) * precio).toFixed(2);
            }            
            $("#"+id_tabla+" tbody").append( "<tr>" +"<td align=center>" + id_productos +"</td>" +"<td align=center>" + codigo_producto + "</td>" +"<td align=center>" + detalle_producto +"</td>" +"<td align=center>" + cantidad_producto +"</td>" +"<td align=center class='hidden'>" + limite +"</td>" +"<td align=center class='hidden'>" + inventariable +"</td>" +"<td align=center>" + precio + "</td>" +"<td align=center>" + desc +"</td>" +"<td align=center>" + total + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error elimina' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick='return eliminar_fila(event)' ></i></a></div>"+ "</td><td class='hidden'>"+iva+"</td>" +"</tr>" ); 
        }else{     
            if (descuento !== "") {
                desc = descuento
                precio = (parseFloat(precio_unitario)).toFixed(2);
                multi = (cantidad_producto * parseFloat(precio_unitario)).toFixed(2);
                descuento = ((multi * parseFloat(desc))/100).toFixed(2);
                total = (multi - descuento).toFixed(2);
            }else{
                desc = 0;
                precio = (parseFloat(precio_unitario)).toFixed(2);
                total = (parseFloat(cantidad_producto) * precio).toFixed(2);
            }                         
            $("#"+id_tabla+" tbody tr").eq(fila).find("td").each(function (index) {
                switch (index) {                                            
                    case 3:                        
                        $(this).text($("#cantidad").val());   
                    break;
                    case 6:                        
                        $(this).text($("#precio").val());   
                    break;
                    case 7:                        
                        $(this).text($("#descuento").val());   
                    break;
                    case 8:
                        $(this).text(total);   
                    break;                                                                                                                                               
                }                     
            });            
        }                                           
    }    
    limpiar_chosen_codigo();
    var desc_tabla = 0;
    var total_tabla = 0;
    var iva0 = 0;
    var iva12 = 0;
    var cant_tabla = 0;
    var precio_u_tabla = 0;
    $("#"+id_tabla+" tbody tr").each(function (index) {                                  
        $(this).children("td").each(function (index) { 
            switch (index) {                                            
                case 3:                
                    cant_tabla = $(this).text();                    
                break;
                case 6:                    
                    precio_u_tabla = $(this).text();                    
                break;                
                case 8:
                    total_tabla = $(this).text()                    
                break;                                                                                                                               
                case 10:                    
                    if ($(this).text() == 'on'){
                        iva12 = parseFloat(iva12) + parseFloat(total_tabla);

                    }else{
                        iva0 = parseFloat(iva0) +parseFloat(total_tabla);
                    }
                break;                                                                                                                               
            }      
        });        
        desc_tabla = desc_tabla +((cant_tabla * precio_u_tabla) - total_tabla);                
    });    
    var tot_iva = parseFloat(iva12 * 0.12).toFixed(3);    
    
    var total_fac = parseFloat(iva12)+parseFloat(tot_iva)+parseFloat(iva0);    
    $("#tarifa0").val(parseFloat(iva0).toFixed(3));
    $("#tarifa12").val(parseFloat(iva12).toFixed(3));
    $("#iva").val(parseFloat(tot_iva).toFixed(3));
    $("#descuento_total").val(parseFloat(desc_tabla).toFixed(2));    
    $("#total").val(parseFloat(total_fac).toFixed(2));    
}

function eliminar_fila2(){
    $("a.dc_btn_accion").click(function(){
      $(this).parents("tr").fadeOut("normal", function(){
          $(this).remove(); 
       }); 
    });
}


function agregar_fila_inventario(id_tabla,id_productos,codigo_producto,detalle_producto,precio_costo,stock,existencia,diferencia){
    var contador=0;
    var vect = new Array();     
    var cont=0;
    var repe = 0;
    var fila = 0;
    var diferencia = 0;
    $("#"+id_tabla+" tbody tr").each(function (index) {                                  
        $(this).children("td").each(function (index) { 
            contador++;                                 
        });                                                         
    });

    if(contador == 0){
    diferencia = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())));
    $("#"+id_tabla+" tbody").append( "<tr>" +"<td align=center>" + id_productos +"</td>" +"<td align=center>" + codigo_producto + "</td>" +"<td align=center>" + detalle_producto +"</td>" +"<td align=center>" + precio_costo +"</td>" +"<td align=center>" + stock +"</td>" +"<td align=center>" + existencia +"</td>" +"<td align=center>" + diferencia + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick='return eliminar_fila2(event)' ></i></a></div>" +"</tr>" ); 
    }else{
       $("#"+id_tabla+" tbody tr").each(function (index) {                                                                 
            $(this).children("td").each(function (index) {                               
                switch (index) {                                            
                    case 0:
                    vect[cont] = $(this).text();   
                    break;                                                                                                                               
                }                                          
            });
            cont++;  
        });
      
        for(var i=0 ; i<vect.length; i++) {
            if(vect[i] == id_productos) {
                repe++;
                fila = i;
            }
        }

        if(repe==0){
           diferencia = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())));
           $("#"+id_tabla+" tbody").append( "<tr>" +"<td align=center>" + id_productos +"</td>" +"<td align=center>" + codigo_producto + "</td>" +"<td align=center>" + detalle_producto +"</td>" +"<td align=center>" + precio_costo +"</td>" +"<td align=center>" + stock +"</td>" +"<td align=center>" + existencia +"</td>" +"<td align=center>" + diferencia + "</td>" +"<td align=center>" + "<div class=hidden-sm hidden-xs action-buttons> <a class='red dc_btn_accion tooltip-error' data-rel='tooltip' data-original-title='Eliminar'><i class='ace-icon fa fa-trash-o bigger-130' onclick='return eliminar_fila(event)' ></i></a></div>" +"</tr>" ); 
        }else{
            diferencia = (parseInt( $("#cantidad").val()) - Math.abs(parseInt( $("#stock").val())));
           $("#"+id_tabla+" tbody tr").eq(fila).find("td").each(function (index) {
                switch (index) {                                            
                    case 3:                        
                        $(this).text($("#precio").val());   
                    break;
                    case 4:                        
                        $(this).text($("#stock").val());   
                    break;
                    case 5:                        
                        $(this).text($("#cantidad").val());    
                    break;
                    case 6:
                        $(this).text(diferencia);   
                    break;                                                                                                                                               
                }                     
            });
        }
    }
    limpiar_chosen_codigo();
}
function documentos(fun){
    if(fun == 0){
        $("#txt_2").val("");    
    }   
    $("#txt_2").focus();
    if($("#txt_1").val() == "Cedula"){                      
        $("#txt_2").prop("maxlength",10);
        $("#txt_2").attr("minlength",10);
        $("#txt_2").prop("pattern","[0-9]{10,10}");
    }else{
        if($("#txt_1").val() == "RUC"){                             
            $("#txt_2").prop("maxlength",13);
            $("#txt_2").attr("minlength",13);
            $("#txt_2").prop("pattern","[0-9]{13,13}");
        }else{          
            $("#txt_2").removeAttr("maxlength");            
            $("#txt_2").attr("minlength",1);
            $("#txt_2").prop("pattern","[0-9]{1,}");
        }
    }
}

function carga_forma_pago(id){
    $.ajax({       /*cargar el select forma_pago*/        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&fun=28",        
        success: function(response) {         
            $("#"+id).html("");
            for (var i = 0; i < response.length; i=i+2) {               
                $("#"+id).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
            }               
            $('#'+id).trigger('chosen:updated')
        }                   
    });      
}
function carga_termino_pago(id){
    $.ajax({       /*cargar el select forma_pago*/        
        type: "POST",
        dataType: 'json',        
        url: "../carga_ubicaciones.php?tipo=0&fun=29",        
        success: function(response) {         
            $("#"+id).html("");
            for (var i = 0; i < response.length; i=i+2) {               
                $("#"+id).append("<option value ="+response[i]+">"+response[i+1]+"</option>");                                                                                                                                           
            }               
            $('#'+id).trigger('chosen:updated')
        }                   
    });      
}


