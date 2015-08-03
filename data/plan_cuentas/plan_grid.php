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
	
	if($_POST['oper'] == "add"){
		$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['codigo_cuenta'],'plan_cuentas','g','','');		
		if($repetidos == 'true'){
			$data = 1; /// este dato ya existe;
		}else{					
			$sql = "insert into plan_cuentas values ('$id','".$_POST['codigo_cuenta']."','".ucwords($_POST['nombre_cuenta'])."','0','$fecha','".$_POST['grupo_cuenta']."')";						
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
		if($_POST['oper'] == "edit"){
			$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['codigo_cuenta'],'plan_cuentas','m',$_POST['id_plan'],'id_plan');					
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{	
				$sql = "update plan_cuentas set codigo_cuenta='".$_POST['codigo_cuenta']."',nombre_cuenta='".ucwords($_POST['nombre_cuenta'])."',estado='0',fecha='".$fecha."',tipo_cuenta='".$_POST['grupo_cuenta']."' where id_plan= '".$_POST['id_plan']."'";																						
				$sql_anterior = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[id_plan]'";        
        		$sql_anterior = sql_array($conexion,$sql_anterior);
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[id_plan]'";        
            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            

            	auditoria_sistema($conexion,'plan_cuentas',$id_user,'Update',$_POST['id_plan'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
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