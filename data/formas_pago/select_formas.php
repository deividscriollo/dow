<?php
	
//inclucion de librerias
	include '../conexion.php';	
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "select id_plan,codigo_cuenta,nombre_cuenta from plan_cuentas order by codigo_cuenta asc";
	$sql = pg_query($sql);
	echo "<select>";
	while($row = pg_fetch_row($sql)){
		echo "<option value='".$row[0]."'>".$row[1]."-". $row[2] ."</option>";
	}
	echo "</select>";
	
?>