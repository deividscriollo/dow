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
	/////////////////////////	
	$campo1 = $_POST['vect1'];		
	$arreglo1 = explode(',', $campo1);
	$campo4 = $_POST['vect4'];		
	$arreglo4 = explode(',', $campo4);	
	$nelem = count($arreglo1);
	///////////////////////
	if($_POST['tipo'] == "g"){
		$repetidos = repetidos($conexion, "codigo_grupo", strtoupper($_POST['txt_1']), "grupos", "g", "", "");
	    if ($repetidos == 'true') {
	        $data = "1"; /// este codigo ya existe;
	    } else {
	        $repetidos = repetidos($conexion, "nombre_grupo", strtoupper($_POST['txt_2']), "grupos", "g", "", "");
	        if ($repetidos == 'true') {
	        	$data = "2"; /// este nombre ya existe;
	    	} else {
				$sql = "insert into grupos values ('".$id."','". strtoupper($_POST['txt_1']) ."','". strtoupper($_POST['txt_2']) ."','1','".$fecha."')";
		        $guardar = guardarSql($conexion, $sql);
		        if( $guardar == 'true'){
					$data = '0'; ////datos guardados
					$sql_nuevo = "SELECT (id,codigo_grupo,nombre_grupo,estado,fecha)  FROM grupos where id = '".$id."'";        
		        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
		        	auditoria_sistema($conexion,'grupos',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
		        	/////////////////////detalles grupos////////////		        	
		        	for ($i = 0; $i < $nelem; $i++) {		
						$id_detalles = unique($fecha_larga);	
						$sql = "insert into cuentas_grupos values('".$id_detalles."','".$id."','".$arreglo1[$i]."','".$fecha."')";	
						guardarSql($conexion, $sql);
						$sql_nuevo = "SELECT (id,id_grupo,id_plan,fecha)  FROM cuentas_grupos where id = '".$id_detalles."'";
		        		$sql_nuevo = sql_array($conexion,$sql_nuevo);		        		
					}
				}else{
					$data = '3'; /// error al guardar
				}			        
		        $data = '0';///correcto    		
	    	}
	    }
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos($conexion, "codigo_grupo", strtoupper($_POST['txt_1']), "grupos", "m", $_POST['txt_0'], "id");	
		    if ($repetidos == 'true') {
		        $data = "1"; /// este codigo ya existe;
		    } else {
		    	$repetidos = repetidos($conexion, "nombre_grupo", strtoupper($_POST['txt_2']), "grupos", "m", $_POST['txt_0'], "id");	
		        if ($repetidos == 'true') {
		        	$data = "2"; /// este nombre ya existe;
		    	} else {
					$sql = "update grupos set codigo_grupo = '". strtoupper($_POST['txt_1']) ."',nombre_grupo = '". strtoupper($_POST['txt_2']) ."',estado = '1',fecha = '".$fecha."' where id = '".$_POST['txt_0']."'";

					$sql_nuevo = "SELECT (id,codigo_grupo,nombre_grupo,estado,fecha)  FROM grupos where id = '".$_POST['txt_0']."'";        
			        $sql_nuevo = sql_array($conexion,$sql_nuevo);
			        $guardar = guardarSql($conexion, $sql);
			        if( $guardar == 'true'){
						$data = '0'; ////datos guardados
						$sql_anterior = "SELECT (id,codigo_grupo,nombre_grupo,estado,fecha)  FROM grupos where id = '".$_POST['txt_0']."'";
			        	$sql_anterior = sql_array($conexion,$sql_anterior);	
			        	auditoria_sistema($conexion,'grupos',$id_user,'Update',$id,$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
			        	/////////////////////detalles grupos////////////		        	
			        	for ($i = 0; $i < $nelem; $i++) {		
							$id_detalles = unique($fecha_larga);	
							if($arreglo4[$i] == ''){
								$sql = "insert into cuentas_grupos values('".$id_detalles."','".$_POST['txt_0']."','".$arreglo1[$i]."','".$fecha."')";	
								guardarSql($conexion, $sql);
								$sql_nuevo = "SELECT (id,id_grupo,id_plan,fecha)  FROM cuentas_grupos where id = '".$id_detalles."'";
			        			$sql_nuevo = sql_array($conexion,$sql_nuevo);
			        			auditoria_sistema($conexion,'cuentas_grupos',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');		        			
							}else{
								$sql_anterior = "SELECT (id,id_grupo,id_plan,fecha)  FROM cuentas_grupos where id = '".$arreglo4[$i]."'";
			        			$sql_anterior = sql_array($conexion,$sql_anterior);		        			
								$sql = "update cuentas_grupos set id_plan = '".$arreglo1[$i]."' where id = '".$arreglo4[$i]."'";
								guardarSql($conexion, $sql);
								$sql_nuevo = "SELECT (id,id_grupo,id_plan,fecha)  FROM cuentas_grupos where id = '".$arreglo4[$i]."'";
			        			$sql_nuevo = sql_array($conexion,$sql_nuevo);		
			        			auditoria_sistema($conexion,'cuentas_grupos',$id_user,'Update',$id,$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);        			
							}							



							
						}
					}else{
						$data = '3'; /// error al guardar
					}			        
			        $data = '0';///correcto    		
		    	}
		    }	
		}
	}	
	echo $data;
	
?>