<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$lista = array();
$sql = "select id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,retenciones.id_plan,codigo_cuenta,nombre_cuenta,retenciones.estado,fecha_creacion from retenciones,plan_cuentas where retenciones.id_plan = plan_cuentas.id_plan order by fecha_creacion desc";
$sql = carga_json($conexion,$sql);
$tipo = '';
$estado = '';
while($row = pg_fetch_row($sql)){	
	$lista[]=array($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7],$row[8],$row[9]); 
}
echo $lista = json_encode($lista);

?>