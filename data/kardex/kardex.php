<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$f=split(' - ', $_POST['fecha']);
$id_kardex = '';
$sql = pg_query("SELECT id_kardex from kardex where id_productos = '".$_POST['id']."'");
while ($row = pg_fetch_row($sql)) {
	$id_kardex = $row[0];
}

$consulta = pg_query("select id_detalle_kardex,fecha,detalle,c_e,v_e,t_e,c_s,v_s,t_s,c_t,v_t,t_t from detalles_kardex where id_kardex = '".$id_kardex."' and fecha between '".$f[0].' 00:00:00'."' and '".$f[1].' 23:59:59'."' order by fecha asc");
while ($row = pg_fetch_row($consulta)) {
    $lista[] = $row[0];
    $lista[] = $row[1];
    $lista[] = $row[2];
    $lista[] = $row[3];
    $lista[] = $row[4];
    $lista[] = $row[5];
    $lista[] = $row[6];
    $lista[] = $row[7];
    $lista[] = $row[8];
    $lista[] = $row[9];
    $lista[] = $row[10];
    $lista[] = $row[11];
}
echo $lista = json_encode($lista);
?>