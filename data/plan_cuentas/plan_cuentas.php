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
		$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['txt_1'],'plan_cuentas','g','','');		
		if( $repetidos == 'true'){
			$data = 1; /// este dato ya existe;
		}else{					
			$sql = "insert into plan_cuentas values ('$id','".$_POST['txt_1']."','".ucwords($_POST['txt_2'])."','0','$fecha','".$_POST['codigo']."')";						
			$guardar = guardarSql($conexion,$sql);
			$sql_nuevo = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$id'";        
        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
        	auditoria_sistema($conexion,'plan_cuentas',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 2; /// error al guardar
			}			
		}
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['txt_1'],'plan_cuentas','m',$_POST['txt_0'],'id_plan');					
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{	
				$sql = "update plan_cuentas set codigo_cuenta='".$_POST['txt_1']."',nombre_cuenta='".ucwords($_POST['txt_2'])."',estado='0',fecha='".$fecha."',tipo_cuenta='".$_POST['codigo']."' where id_plan= '".$_POST['txt_0']."'";																	
				$sql_anterior = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[txt_0]'";        
        		$sql_anterior = sql_array($conexion,$sql_anterior);
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[txt_0]'";        
            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            

            	auditoria_sistema($conexion,'plan_cuentas',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 2; /// error al guardar
				}				
			}
		}else{
			
		}

	}	
	echo $data;
?>