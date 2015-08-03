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
		$repetidos = repetidos($conexion,'codigo_anexo',$_POST['codigo_anexo'],'retenciones','g','','');		
		if($repetidos == 'true'){
			$data = 1; /// este dato ya existe;
		}else{					
			$sql = "insert into retenciones values ('$id','".$_POST['codigo_anexo']."','".$_POST['formulario_103']."','".$_POST['porcentaje']."','".$_POST['descripcion']."','".$_POST['id_plan']."','1','$fecha')";						
			$guardar = guardarSql($conexion,$sql);
			$sql_nuevo = "select (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion) from retenciones where id_retencion = '$id'";        
        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
        	auditoria_sistema($conexion,'retenciones',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 2; /// error al guardar
			}			
		}
	}else{
		if($_POST['oper'] == "edit"){
			$repetidos = repetidos($conexion,'codigo_anexo',$_POST['codigo_anexo'],'retenciones','m',$_POST['id_retencion'],'id_retencion');					
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{	
				$sql = "update retenciones set codigo_anexo ='".$_POST['codigo_anexo']."',formulario_103 = '".$_POST['formulario_103']."',porcentaje = '".$_POST['porcentaje']."',descripcion = '".$_POST['descripcion']."',id_plan = '".$_POST['id_plan']."',estado = '1',fecha_creacion = '$fecha' where id_retencion= '".$_POST['id_retencion']."'";	
				$sql_anterior = "select (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion) from retenciones where id_retencion = '".$_POST['id_retencion']."'";      
        		$sql_anterior = sql_array($conexion,$sql_anterior);
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion) from retenciones where id_retencion = '".$_POST['id_retencion']."'";        
            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            

            	auditoria_sistema($conexion,'retenciones',$id_user,'Update',$_POST['id_retencion'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
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