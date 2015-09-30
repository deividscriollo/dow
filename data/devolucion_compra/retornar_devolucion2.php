<?php

session_start();
include '../conexion.php';
conectarse();

error_reporting(0);
$id = $_GET['com'];
$arr_data = array();

$consulta = pg_query("select D.id_productos, P.codigo, P.descripcion, D.cantidad, D.precio, D.descuento, D.total, PI.porcentaje, P.incluye_iva from devolucion_compra C, detalle_devolucion_compra D, productos P, porcentaje_iva PI where P.id_porcentaje_iva = PI.id_porcentaje_iva and D.id_productos = P.id_productos and D.id_devolucion = C.id_devolucion and D.id_devolucion = '" . $id . "'");
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
}

echo json_encode($arr_data);
?>
