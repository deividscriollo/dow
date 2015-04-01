<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();	
    date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "select nivel1,nivel2,nivel3 from permisos where id_usuario = '$_GET[id]'";

	$lista = carga_json_1($conexion,$sql);	
	$lista1 = $lista[0];
	$lista1 = str_replace("{", "", $lista1);
	$lista1 = str_replace("}", "", $lista1);
	$lista1 = explode(",", $lista1);
	$lista1 = array($lista1);

	$lista2 = $lista[1];
	$lista2 = str_replace("{", "", $lista2);
	$lista2 = str_replace("}", "", $lista2);
	$lista2 = explode(",", $lista2);
	$lista2 = array($lista2);

	$lista3 = $lista[2];
	$lista3 = str_replace("{", "", $lista3);
	$lista3 = str_replace("}", "", $lista3);
	$lista3 = explode(",", $lista3);
	$lista3 = array($lista3);

	
	$lista4=array("nivel1" => $lista1, "nivel2" => $lista2, "nivel3" => $lista3); 
	$data = (json_encode($lista4));
	echo $data;

	

	
		

?>