<?php

	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
	$sql = "";		
	$data = "";		
	$id_user = sesion_activa();	
	$id = unique($fecha_larga);		
	
	if($_POST['tipo'] == "g"){
		$repetidos = repetidos($conexion, "codigo_comprobante", strtoupper($_POST['txt_1']), "tipo_comprobante", "g", "", "");
	    if ($repetidos == 'true') {
	        $data = 1; /// este codigo ya existe;
	    } else {
	    	$repetidos = repetidos($conexion, "nombre_comprobante", strtoupper($_POST['txt_2']), "tipo_comprobante", "g", "", "");
	    	if ($repetidos == 'true') {
	        	$data = 2; /// este nombre ya existe;
	    	}else{
	    		$sql = "insert into tipo_comprobante values ('$id','". strtoupper($_POST['txt_1']) ."','". strtoupper($_POST['txt_2']) ."','$fecha','1')";	    		
		        if($guardar = guardarSql($conexion, $sql)){
		        	$sql_nuevo = "SELECT (id_comprobante,codigo_comprobante,nombre_comprobante,fecha_creacion,estado)  FROM tipo_comprobante where id_comprobante = '".$id."'";        
			        $sql_nuevo = sql_array($conexion,$sql_nuevo);
			        auditoria_sistema($conexion,'tipo_comprobante',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			        $data = 0;	
		        }else{
		        	$data = 3;
		        }	        
		        
	    	}    	        
	    }		
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos($conexion, "codigo_comprobante", strtoupper($_POST['txt_1']), "tipo_comprobante", "m", $_POST['txt_0'], "id_comprobante");			
			if( $repetidos == 'true'){
				$data = 1; /// este codigo ya existe;				
			}else{	
				$repetidos = repetidos($conexion, "nombre_comprobante", strtoupper($_POST['txt_2']), "tipo_comprobante", "m", $_POST['txt_0'], "id_comprobante");
				if( $repetidos == 'true'){
					$data = 2; /// este nombre ya existe;				
				}else{	
					$sql = "update tipo_comprobante set codigo_comprobante = '".$_POST['txt_1']."',nombre_comprobante = '".$_POST['txt_2']."' where id_comprobante= '".$_POST['txt_0']."'";        
	        		$sql_anterior = "SELECT (id_comprobante,codigo_comprobante,nombre_comprobante,fecha_creacion,estado)  FROM tipo_comprobante where id_comprobante = '".$_POST['txt_0']."'";        
	        		$sql_anterior = sql_array($conexion,$sql_anterior);
					if($guardar = guardarSql($conexion,$sql)){
						$sql_nuevo = "SELECT (id_comprobante,codigo_comprobante,nombre_comprobante,fecha_creacion,estado)  FROM tipo_comprobante where id_comprobante = '".$_POST['txt_0']."'";        
		            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            
		            	auditoria_sistema($conexion,'tipo_comprobante',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);								
		            	$data = 0;
					}else{
						$data = 3;
					}					
				}				
			}
		}

	}	
	echo $data;
?>