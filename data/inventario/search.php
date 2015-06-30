<?php

session_start();

include '../conexion.php';
conectarse();
error_reporting(0);
$codigo_barras = $_GET["codigo_barras"];
$precio = $_GET["precio"];
$arr_data = array();

if ($codigo_barras != "") {
    $consulta = pg_query("select * from productos P, porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and P.estado = 'Si' and P.codigo_barras = '$codigo_barras'");
    while ($row = pg_fetch_row($consulta)) {
        $arr_data[] = $row[0];
        $arr_data[] = $row[1];
        $arr_data[] = $row[3];
        $arr_data[] = $row[4];
        $arr_data[] = $row[27];
        $arr_data[] = $row[10];
        $arr_data[] = $row[7];
    }
}
echo json_encode($arr_data);
?>