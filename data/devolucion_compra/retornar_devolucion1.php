<?php

session_start();

include '../conexion.php';
conectarse();
error_reporting(0);
$id = $_GET['com'];
$arr_data = array();

$consulta = pg_query("SELECT F.id_factura_compra, F.fecha_actual, F.hora_actual, U.nombres_completos, F.numero_serie, F.tipo_comprobante, P.id_proveedor, P.identificacion, P.nombres_completos, F.fecha_registro, F.fecha_emision, F.fecha_caducidad, F.fecha_cancelacion, F.numero_autorizacion, F.id_forma_pago, F.id_termino_pago, F.tarifa0, F.tarifa12, F.iva, F.descuento, F.total FROM  factura_compra  F, usuario U, proveedor P where F.id_usuario = U.id_usuario and F.id_proveedor = P.id_proveedor and F.id_factura_compra ='" . $id . "'");
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
    $arr_data[] = $row[16];
    $arr_data[] = $row[17];
    $arr_data[] = $row[18];
    $arr_data[] = $row[19];
    $arr_data[] = $row[20];
}
echo json_encode($arr_data);
?>
