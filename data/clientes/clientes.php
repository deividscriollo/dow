<?php

	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
	$sql = "";	
	$id_session = '1';///datos session
	$id = unique($fecha_larga);		
	
	if($_POST['tipo'] == "g"){
		$repetidos = repetidos_1($conexion,"identificacion",strtoupper($_POST["txt_2"]),"cliente","g","","","tipo_documento","$_POST[txt_1]");	
		if( $repetidos == 'true'){
			$data = 1; /// este dato ya existe;
		}else{					
			$sql = "insert into cliente values ('$id','$_POST[txt_1]','$_POST[txt_2]','$_POST[txt_3]','$_POST[txt_8]','$_POST[txt_4]','$_POST[txt_5]','$_POST[txt_11]','$_POST[txt_12]','$_POST[txt_6]','$_POST[txt_13]','$_POST[txt_7]','0','$id_session','$fecha')";			
				
			$guardar = guardarSql($conexion,$sql);
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 2; /// error al guardar
			}			
		}
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos_1($conexion,"identificacion",strtoupper($_POST["txt_2"]),"cliente","m",$_POST['txt_0'],"id_cliente","tipo_documento","$_POST[txt_1]");		
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{						
				$sql = "update cliente set tipo_documento='$_POST[txt_1]',identificacion='$_POST[txt_2]',nombres_completos='$_POST[txt_3]',tipo='$_POST[txt_8]',telefono1='$_POST[txt_4]',telefono2='$_POST[txt_5]',ciudad='$_POST[txt_11]',direccion='$_POST[txt_12]',correo='$_POST[txt_6]',comentario='$_POST[txt_13]',cupo_credito='$_POST[txt_7]', id_usuario='$id_session' where id_cliente='$_POST[txt_0]'";								
				$guardar = guardarSql($conexion,$sql);
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