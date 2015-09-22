<?php

session_start();

include '../conexion.php';
conectarse();
$texto = $_GET['term'];

$consulta = pg_query("SELECT P.id_productos, P.codigo, P.codigo_barras, P.descripcion, D.precio, D.descuento, D.cantidad, I.porcentaje, P.facturar_existencia, P.incluye_iva FROM factura_compra F, detalle_factura_compra D, productos P, porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and D.id_productos = P.id_productos and D.id_factura_compra = F.id_factura_compra and F.id_factura_compra= '$_GET[ids]' and P.codigo like '%$texto%' and P.estado='Si'");

while ($row = pg_fetch_row($consulta)) {
    $data[] = array(
        'id_productos' => $row[0],
        'value' => $row[1],
        'codigo_barras' => $row[2],
        'producto' => $row[3],
        'precio' => $row[4],
        'descuento' => $row[5],
        'stock' => $row[6],
        'iva_producto' => $row[7],
        'inventar' => $row[8],
        'incluye' => $row[9]
    );
}

echo $data = json_encode($data);
?>
