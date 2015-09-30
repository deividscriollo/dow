<?php

session_start();

include '../conexion.php';
conectarse();

error_reporting(0);
$id = $_GET['com'];
$arr_data = array();

$consulta = pg_query("select D.id_productos, Pr.codigo, Pr.descripcion, D.cantidad, D.precio, D.descuento, D.total, P.iva, Pr.incluye_iva from proforma P, detalle_proforma D, productos Pr where D.id_productos = Pr.id_productos and P.id_proforma = D.id_proforma and D.id_proforma = '" . $id . "'");
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
