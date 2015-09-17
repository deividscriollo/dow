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
	
	if($_POST['tipo'] == "g"){				
			$sql = "insert into cuentas values ('$id','$_POST[banco]','$_POST[agencia]','$_POST[num_cuenta]','$_POST[num_cheque]','$_POST[ubicacion]','$_POST[grupo_contable]','$fecha','1')";			
			$guardar = guardarSql($conexion,$sql);
			
			// $sql_nuevo = "select (id_cuentas,id_banco,agencia,num_cuenta,num_cheque,direccion,id_plan,fecha_creacion,estado) from cliente where id_cuentas = '$id'";        
   //      	$sql_nuevo = sql_array($conexion,$sql_nuevo);
   //      	auditoria_sistema($conexion,'cuentas',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 2; /// error al guardar
			}			
		// }
	}else{
		if($_POST['tipo'] == "m"){
				$sql = "update cuentas set id_banco ='$_POST[banco]', agencia = '$_POST[agencia]', num_cuenta='$_POST[num_cuenta]', num_cheque='$_POST[num_cheque]', direccion='$_POST[ubicacion]', id_plan='$_POST[grupo_contable]', fecha_creacion='$fecha' where id_cuentas='$_POST[id_cuentas]'";								
				$guardar = guardarSql($conexion,$sql);
				
				if( $guardar == 'true'){
					$data = 0; ////datos modficados
				}else{
					$data = 2; /// error al modificar
				}				
			
		}

	}	
	echo $data;
?>