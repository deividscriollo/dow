<?php

session_start();

include '../conexion.php';
conectarse();
error_reporting(0);
$id = $_GET['com'];
$arr_data = array();

$consulta = pg_query("SELECT D.id_devolucion, D.fecha_actual, D.hora_actual, U.nombres_completos, P.id_proveedor, P.identificacion, P.nombres_completos, F.id_factura_compra, F.numero_serie, D.tarifa0, D.tarifa12, D.iva, D.descuento, D.total FROM  factura_compra F, devolucion_compra  D, usuario U, proveedor P where D.id_usuario = U.id_usuario and D.id_proveedor = P.id_proveedor and D.id_factura_compra = F.id_factura_compra and D.id_devolucion ='" . $id . "'");
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
}
echo json_encode($arr_data);
?>
