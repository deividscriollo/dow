<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$lista = array();
$sql = "select id_plan,codigo_cuenta,nombre_cuenta,tipo_cuenta, fecha,estado from plan_cuentas order by codigo_cuenta asc";
$sql = carga_json($conexion,$sql);
$tipo = '';
$estado = '';
while($row = pg_fetch_row($sql)){
	$tipo = '';
	$estado = '';
	if($row[3] == 'G'){
		$tipo = 'Grupo';
	}else{
		$tipo = 'Movimiento';
	}
	if($row[5] == '0'){
		$estado = 'Activo';
	}else{
		$estado = 'Pasivo';
	}
	$lista[]=array($row[0],$row[1],$row[2],$row[3],$tipo,$row[4],$row[5],$estado); 
}
echo $lista = json_encode($lista);

?>