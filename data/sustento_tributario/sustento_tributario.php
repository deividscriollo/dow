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
		$repetidos = repetidos($conexion, "codigo_sustento", strtoupper($_POST['txt_1']), "sustento_tributario", "g", "", "");
	    if ($repetidos == 'true') {
	        $data = 1; /// este codigo ya existe;
	    } else {
	    	$repetidos = repetidos($conexion, "nombre_sustento", strtoupper($_POST['txt_2']), "sustento_tributario", "g", "", "");
	    	if ($repetidos == 'true') {
	        	$data = 2; /// este nombre ya existe;
	    	}else{
	    		$sql = "insert into sustento_tributario values ('$id','". strtoupper($_POST['txt_1']) ."','". strtoupper($_POST['txt_2']) ."','$fecha','1')";
		        if($guardar = guardarSql($conexion, $sql)){
		        	$sql_nuevo = "SELECT (id_sustento,codigo_sustento,nombre_sustento,fecha_creacion,estado)  FROM sustento_tributario where id_sustento = '".$id."'";        
			        $sql_nuevo = sql_array($conexion,$sql_nuevo);
			        auditoria_sistema($conexion,'sustento_tributario',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			        $data = 0;	
		        }else{
		        	$data = 3;
		        }	        
		        
	    	}    	        
	    }		
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos($conexion, "codigo_sustento", strtoupper($_POST['txt_1']), "sustento_tributario", "m", $_POST['txt_0'], "id_sustento");			
			if( $repetidos == 'true'){
				$data = 1; /// este codigo ya existe;				
			}else{	
				$repetidos = repetidos($conexion, "nombre_sustento", strtoupper($_POST['txt_2']), "sustento_tributario", "m", $_POST['txt_0'], "id_sustento");
				if( $repetidos == 'true'){
					$data = 2; /// este nombre ya existe;				
				}else{	
					$sql = "update sustento_tributario set codigo_sustento = '".$_POST['txt_1']."',nombre_sustento = '".$_POST['txt_2']."' where id_sustento= '".$_POST['txt_0']."'";        
	        		$sql_anterior = "SELECT (id_sustento,codigo_sustento,nombre_sustento,fecha_creacion,estado)  FROM sustento_tributario where id_sustento = '".$_POST['txt_0']."'";        
	        		$sql_anterior = sql_array($conexion,$sql_anterior);
					if($guardar = guardarSql($conexion,$sql)){
						$sql_nuevo = "SELECT (id_sustento,codigo_sustento,nombre_sustento,fecha_creacion,estado)  FROM sustento_tributario where id_sustento = '".$_POST['txt_0']."'";        
		            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            
		            	auditoria_sistema($conexion,'sustento_tributario',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);								
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