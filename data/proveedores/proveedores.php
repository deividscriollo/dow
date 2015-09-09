<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
	$sql = "";		
	$id_user = sesion_activa();	
	$id = unique($fecha_larga);		
	$id_compras = unique($fecha_larga);		
	$id_ret_fuente = unique($fecha_larga);		
	$id_ret_iva = unique($fecha_larga);			
	if($_POST['tipo'] == "g"){		
		$repetidos = repetidos_1($conexion,"identificacion",strtoupper($_POST["txt_2"]),"proveedor","g","","","tipo_documento",$_POST['txt_1']);	
		if( $repetidos == 'true'){
			$data = 1; /// este dato ya existe;
		}else{					
			$sql = "insert into proveedor values ('$id','".$_POST['txt_1']."','".$_POST['txt_2']."','".$_POST['txt_12']."','".$_POST['txt_14']."','".$_POST['txt_4']."','".$_POST['txt_5']."','".$_POST['txt_11']."','".$_POST['txt_15']."','".$_POST['txt_3']."','".$_POST['txt_13']."','".$_POST['txt_7']."','".$_POST['txt_6']."','".$_POST['txt_8']."','".$_POST['txt_16']."','".$_POST['txt_17']."','".$_POST['txt_18']."','".$_POST['txt_19']."','".$_POST['txt_22']."','".$_POST['txt_23']."','".$_POST['txt_24']."','".$id_user."','".$_POST['txt_26']."','0','$fecha','".$_POST['txt_25']."','".$_POST['txt_20']."','".$_POST['txt_21']."')";						
			$guardar = guardarSql($conexion,$sql);
			$sql_nuevo = "select (id_proveedor,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,direccion,empresa,visitador,fax,correo,forma_pago,principal,cupo_credito,serie_comprobante,autorizacion_sri,id,id_sustento,id_comprobante,id_usuario,comentario,estado,fecha_creacion,id_compras,id_ret_fuente,id_ret_iva) from proveedor where id_proveedor = '$id'";        
        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
        	auditoria_sistema($conexion,'proveedor',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			if( $guardar == 'true'){
				$data = 0; ////datos guardados				
			}else{
				$data = 2; /// error al guardar
			}			
		}
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos_1($conexion,"identificacion",strtoupper($_POST["txt_2"]),"proveedor","m",$_POST['txt_0'],"id_proveedor","tipo_documento","$_POST[txt_1]");		
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{						
				$sql = "update proveedor set tipo_documento='".$_POST['txt_1']."',identificacion='".$_POST['txt_2']."',nombres_completos='".$_POST['txt_12']."',tipo='".$_POST['txt_14']."',telefono1='".$_POST['txt_4']."',telefono2='".$_POST['txt_5']."',ciudad='".$_POST['txt_11']."',direccion='".$_POST['txt_15']."',empresa='".$_POST['txt_3']."',visitador='".$_POST['txt_13']."',fax='".$_POST['txt_7']."',correo='".$_POST['txt_6']."',forma_pago='".$_POST['txt_8']."',principal='".$_POST['txt_16']."',cupo_credito='".$_POST['txt_17']."',serie_comprobante='".$_POST['txt_18']."',autorizacion_sri='".$_POST['txt_19']."',id='".$_POST['txt_22']."',id_sustento='".$_POST['txt_23']."',id_comprobante='".$_POST['txt_24']."',id_usuario='".$id_user."',comentario='".$_POST['txt_26']."',estado='0',id_compras='".$_POST['txt_25']."',id_ret_fuente='".$_POST['txt_20']."',id_ret_iva='".$_POST['txt_21']."' where id_proveedor='".$_POST['txt_0']."'";							
				$sql_anterior = "select (id_proveedor,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,direccion,empresa,visitador,fax,correo,forma_pago,principal,cupo_credito,serie_comprobante,autorizacion_sri,id,id_sustento,id_comprobante,id_usuario,comentario,estado,fecha_creacion,id_compras,id_ret_fuente,id_ret_iva) from proveedor where id_proveedor = '$_POST[txt_0]'";        
        		$sql_anterior = sql_array($conexion,$sql_anterior);
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_proveedor,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,direccion,empresa,visitador,fax,correo,forma_pago,principal,cupo_credito,serie_comprobante,autorizacion_sri,id,id_sustento,id_comprobante,id_usuario,comentario,estado,fecha_creacion,id_compras,id_ret_fuente,id_ret_iva) from proveedor where id_proveedor = '$_POST[txt_0]'";        
            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            
            	auditoria_sistema($conexion,'proveedor',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 2; /// error al guardar
				}				
			}
		}

	}	
	echo $data;
?>