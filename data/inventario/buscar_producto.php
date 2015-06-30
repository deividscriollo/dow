<?php

session_start();

include '../conexion.php';
conectarse();
$texto = $_GET['term'];
$consulta = pg_query("select * from productos P, porcentaje_iva I where P.id_porcentaje_iva = I.id_porcentaje_iva and P.estado = 'Si' and P.descripcion like '%$texto%'");

while ($row = pg_fetch_row($consulta)) {
    $data[] = array(
        'id_productos' => $row[0],
        'codigo' => $row[1],
        'codigo_barras' => $row[2],
        'value' => $row[3],
        'precio' => $row[4],
        'descuento' => $row[27],
        'stock' => $row[10],
        'p_venta' => $row[7]
    );
}

echo $data = json_encode($data);
?>
