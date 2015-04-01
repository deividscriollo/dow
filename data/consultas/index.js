$(function(){
	// Existencia de sedula
	function existencia_cedula(reg){			
		var result = "" ; 					
		$.ajax({
            url:'consultas.php',						
            async:  false ,   
            type:  'post',
            data: {existencia:':)',reg:reg},
            success : function ( data )  {	
            	result=data; 
		    } 
		});	
		return result ; 
	}
	//Validación existencia cedula valida
	jQuery.validator.addMethod("existencia_ced", function (value, element) {
		
		var reg=$('#txt_cedula').val();
		if (existencia_cedula(reg)==1) {						
			return false;
		};
		if (existencia_cedula(reg)!=1) {						
			return true;
		};
		//return false;		
	}, "El numero de identificación no existe");

	$('#form_buscqueda').validate({
		errorElement: 'div',
		errorClass: 'help-block',
		focusInvalid: false,
		ignore: "",
		rules: {
			txt_cedula: {
				required: true,
				number:true,
				existencia_ced:true
			}
		},

		messages: {
			txt_cedula: {
				required: "Por favor, Ingrese cedula o ruc.",
				number:'Por favor, Ingrese valores numéricos'
			}
		},
			
		highlight: function (e) {
			$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
		},			
		success: function (e) {
			$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
			$(e).remove();
		},			
		errorPlacement: function (error, element) {
			if(element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
				var controls = element.closest('div[class*="col-"]');
				if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
				else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
			}
			else if(element.is('.select2')) {
				error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
			}
			else if(element.is('.chosen-select')) {
				error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
			}
			else error.insertAfter(element.parent());
		},			
		submitHandler: function (form) {
			$.ajax({
	            url:'consultas.php',						
	            type:  'post',
	            data: {cargar_tabla:':)',txt_1:$('#txt_cedula').val()},
	            success : function ( data )  {	
	            	$("#tbl_facturas tbody").html(data); 
			    } 
			});	
		}					
	});
});