<?php

session_start();

include '../conexion.php';
conectarse();
$texto = $_GET['term'];
$tipo = $_GET['tipo_precio'];
$consulta = pg_query("select * from productos P, porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and P.estado = 'Si' and P.codigo like '%$texto%'");

while ($row = pg_fetch_row($consulta)) {
    if ($tipo == "MINORISTA") {
        $data[] = array(
            'id_productos' => $row[0],
            'value' => $row[1],
            'codigo_barras' => $row[2],
            'producto' => $row[3],
            'precio' => $row[7],
            'descuento' => $row[27],
            'stock' => $row[10],
            'iva_producto' => $row[29],
            'inventar' => $row[15],
            'incluye' => $row[26]
        );
    } else {
        if ($tipo == "MAYORISTA") {
            $data[] = array(
            'id_productos' => $row[0],
            'value' => $row[1],
            'codigo_barras' => $row[2],
            'producto' => $row[3],
            'precio' => $row[8],
            'descuento' => $row[27],
            'stock' => $row[10],
            'iva_producto' => $row[29],
            'inventar' => $row[15],
            'incluye' => $row[26]
            );
        }
    }
}

echo $data = json_encode($data);
?>
