<?php

session_start();

include '../conexion.php';
conectarse();
error_reporting(0);

$codigo_barras = $_GET["codigo_barras"];
$arr_data = array();

if ($codigo_barras != "") {
    $consulta = pg_query("SELECT P.id_productos, P.codigo, P.descripcion, D.precio, D.descuento, D.cantidad, I.porcentaje, P.facturar_existencia, P.incluye_iva FROM factura_compra F, detalle_factura_compra D, productos P, porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and D.id_productos = P.id_productos and D.id_factura_compra = F.id_factura_compra and F.id_factura_compra= '$_GET[ids]' and P.codigo_barras = '$codigo_barras' and P.estado='Si'");
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
}
echo json_encode($arr_data);
?>