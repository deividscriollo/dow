<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$lista = array();
$sql = "select id_comprobante, codigo_comprobante, nombre_comprobante from tipo_comprobante order by fecha_creacion desc";
$sql = carga_json($conexion,$sql);
$tipo = '';
$estado = '';
while($row = pg_fetch_row($sql)){	
	$lista[]=array($row[0],$row[1],$row[2]); 
}
echo $lista = json_encode($lista);

?>