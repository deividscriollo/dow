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
        if ($precio == "MINORISTA") {
            $arr_data[] = $row[0];
            $arr_data[] = $row[1];
            $arr_data[] = $row[3];
            $arr_data[] = $row[7];
            $arr_data[] = $row[27];
            $arr_data[] = $row[10];
            $arr_data[] = $row[29];
            $arr_data[] = $row[15];
            $arr_data[] = $row[26];
        } else {
            if ($precio == "MAYORISTA") {
                $arr_data[] = $row[0];
                $arr_data[] = $row[1];
                $arr_data[] = $row[3];
                $arr_data[] = $row[8];
                $arr_data[] = $row[27];
                $arr_data[] = $row[10];
                $arr_data[] = $row[29];
                $arr_data[] = $row[15];
                $arr_data[] = $row[26];
            }
        }
    }
}
echo json_encode($arr_data);
?>