<?php 
//inclucion de librerias
	include '../conexion.php';
	include '../funciones_generales.php';
	include '../correos/mail.php';
	error_reporting(0);

	// include '../correos/prueba.php';
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";
	$sql2 = "";	
	$sql3 = "";
	$sql4 = "";
	$id_session = sesion_activa();///datos session

	// datos pagos venta
	$campo1 = $_POST['campo1'];
    $campo2 = $_POST['campo2'];
    $campo3 = $_POST['campo3'];
    $campo4 = $_POST['campo4'];
    $campo5 = $_POST['campo5'];
    $campo6 = $_POST['campo6'];
	// fin

	// descomponer detalle pagos venta
	$arreglo1 = explode('|', $campo1);
    $arreglo2 = explode('|', $campo2);
    $arreglo3 = explode('|', $campo3);
    $arreglo4 = explode('|', $campo4);
    $arreglo5 = explode('|', $campo5);
    $arreglo6 = explode('|', $campo6);
    $nelem = count($arreglo1);



	for ($i = 1; $i < $nelem; $i++) {

		$id1 = unique($fecha_larga);
		$id2 = unique($fecha_larga);

		// guardar pagos
		pg_query("insert into pagos_cobrar values('$id1','".$_POST['id_cliente']."','".$id_session."', '".$_POST['fecha_actual']."','".$_POST['hora_actual']."','".$_POST['formas']."','$arreglo2[$i]','$arreglo3[$i]','$arreglo4[$i]','$arreglo5[$i]','$arreglo6[$i]','".$_POST['observaciones']."','Activo','$fecha')");
        // fin

		// modificar pagos
        $consulta = pg_query("select * from pagos_venta where id_pagos_venta = '".$arreglo1[$i]."'");
        while ($row = pg_fetch_row($consulta)) {
            $saldo = $row[9];
        }
        // fin



}

$guardar = guardarSql($conexion,$sql);
if( $guardar == 'true'){
	$data = 0; ////datos guardados
}else{
	$data = 2; /// error al guardar
}

echo $data;
?>