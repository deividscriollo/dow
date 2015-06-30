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
	$campo2 = $_POST['vect2'];		
	$arreglo2 = explode(',', $campo2);	
	$nelem = count($arreglo1);

	$data = 0;
	///////////////////////
	if($_POST['tipo'] == "g"){						                		        
    	for ($i = 0; $i < $nelem; $i++) {		
			$id_sust_compro = unique($fecha_larga);	
			$repetidos = repetidos_1($conexion, "id_sustento", $arreglo1[$i], "sustento_comprobante", "g", "", "" ,"id_comprobante",$arreglo2[$i]);
			if( $repetidos == 'false'){
				$sql = "insert into  sustento_comprobante values('".$id_sust_compro."','".$arreglo1[$i]."','".$arreglo2[$i]."','0')";	
				guardarSql($conexion, $sql);
				$sql_nuevo = "SELECT (id_sust_compro,id_sustento,id_comprobante,estado)  FROM  sustento_comprobante where id_sust_compro = '".$id_sust_compro."'";			
	    		$sql_nuevo = sql_array($conexion,$sql_nuevo);		        		    		
	    		$data = 1;
			}else{
				$data = 0;
			}			
		}		        
	}else{
	}	
	echo $data;
	
?>