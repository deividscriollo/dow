<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();	
    date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";	
	$id = unique($fecha_larga);			
	$id_user = sesion_activa();	
	$vector_1 = "array[". $_POST['vector_1']."]";
	$vector_2 = "array[". $_POST['vector_2']."]";
	$vector_3 = "array[". $_POST['vector_3']."]";	
	$sql = "update permisos set nivel1 =$vector_1,nivel2=$vector_2, nivel3=$vector_3 where id_usuario = '$_POST[id]'";				
	guardarSql($conexion,$sql);							
	$data = 0; ////datos guardados
	echo $data;
?>