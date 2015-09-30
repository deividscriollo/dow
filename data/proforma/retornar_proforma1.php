<?php

session_start();

include '../conexion.php';
conectarse();
error_reporting(0);
$id = $_GET['com'];
$arr_data = array();

$consulta = pg_query("select P.id_proforma, P.fecha_actual, P.hora_actual, U.nombres_completos, C.id_cliente, C.identificacion, C.nombres_completos, C.direccion, C.telefono1, C.correo, P.tipo_precio, P.tarifa0, P.tarifa12, P.iva, P.descuento, P.total from proforma  P, cliente C, usuario U where P.id_usuario = U.id_usuario and P.id_cliente = C.id_cliente and P.id_proforma ='" . $id . "'");
while ($row = pg_fetch_row($consulta)) {
    $arr_data[] = $row[0];
    $arr_data[] = $row[1];
    $arr_data[] = $row[2];
    $arr_data[] = $row[3];
    $arr_data[] = $row[4];
    $arr_data[] = $row[5];
    $arr_data[] = $row[6];
    $arr_data[] = $row[7];
    $arr_data[] = $row[8];
    $arr_data[] = $row[9];
    $arr_data[] = $row[10];
    $arr_data[] = $row[11];
    $arr_data[] = $row[12];
    $arr_data[] = $row[13];
    $arr_data[] = $row[14];
    $arr_data[] = $row[15];
}
echo json_encode($arr_data);
?>
