<?php 
//inclucion de librerias
	include '../conexion.php';
	include '../funciones_generales.php';
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";
	$sql2 = "";
	$sql3 = "";
	$id_session = sesion_activa();///datos session
	$id = unique($fecha_larga);

	$sql = "insert into inventario values ('$id','$id_session','$fecha','$_POST[hora_actual]','Activo','$fecha')";	
		
	$guardar = guardarSql($conexion,$sql);
	if( $guardar == 'true'){
		$data = 0; ////datos guardados
	}else{
		$data = 2; /// error al guardar
	}

	/////datos detalle inventario/////
	$campo1 = $_POST['campo1'];
	$campo2 = $_POST['campo2'];
	$campo3 = $_POST['campo3'];
	$campo4 = $_POST['campo4'];
	///////////////////////////////

	/////descomponer detalle_inventario////
	$arreglo1 = explode('|', $campo1);
	$arreglo2 = explode('|', $campo2);
	$arreglo3 = explode('|', $campo3);
	$arreglo4 = explode('|', $campo4);
	$nelem = count($arreglo1);
	/////////////////////////////////////

	for ($i = 1; $i < $nelem; $i++) {
		$id2 = unique($fecha_larga);

		///guardar detalle_factura/////
		$sql2 = "insert into detalle_inventario values (
		'$id2','$id','".$arreglo1[$i]."','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo4[$i]."','Activo','$fecha')";       
		$guardar = guardarSql($conexion,$sql2);
		//////////////////////////////

		//////////////modificar productos///////////
	    $sql3 = "update productos set stock='".$arreglo3[$i]."' where id_productos='".$arreglo1[$i]."'";								
		$guardar = guardarSql($conexion, $sql3);
	    ///////////////////////////////////////////
	   }
?>