<?php 
//inclucion de librerias
	include '../conexion.php';
	include '../funciones_generales.php';
	include '../correos/mail.php';
	error_reporting(0);

	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";
	$sql2 = "";	
	$sql3 = "";
	$sql4 = "";
	$id_session = sesion_activa();///datos session
	$id = unique($fecha_larga);
	
	// guardar proforma
	$sql = "insert into proforma values ('$id','".$_POST['id_cliente']."','".$id_session."','".$_POST['fecha_actual']."','".$_POST['hora_actual']."','".$_POST['tipo']."','".$_POST['tarifa0']."','".$_POST['tarifa12']."','".$_POST['iva']."','".$_POST['descuento_total']."','".$_POST['total']."','$fecha','Activo')";	
	// fin

	// datos detalle_proofrma
	$campo1 = $_POST['campo1'];
    $campo2 = $_POST['campo2'];
    $campo3 = $_POST['campo3'];
    $campo4 = $_POST['campo4'];
    $campo5 = $_POST['campo5'];
	// fin

	// descomponer detalle_proforma
	$arreglo1 = explode('|', $campo1);
    $arreglo2 = explode('|', $campo2);
    $arreglo3 = explode('|', $campo3);
    $arreglo4 = explode('|', $campo4);
    $arreglo5 = explode('|', $campo5);
    $nelem = count($arreglo1);
    // Fin 

	for ($i = 1; $i < $nelem; $i++) {

	$id2 = unique($fecha_larga);
	// guardar detalle_proforma
    $sql2 = "insert into detalle_proforma values ('$id2','$id','".$arreglo1[$i]."','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo4[$i]."','".$arreglo5[$i]."','$fecha','Activo')"; 
	$guardar = guardarSql($conexion,$sql2);
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