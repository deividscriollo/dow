<?php

include '../conexion.php';
include '../funciones_generales.php';
$conexion = conectarse();
date_default_timezone_set('America/Guayaquil');
$fecha = date('Y-m-d H:i:s', time());
$fecha_larga = date('His', time());
$sql = "";
$id = unique($fecha_larga);

if ($_POST['oper'] == "add") {
    $repetidos = repetidos($conexion, "nombre_bodega", strtoupper($_POST['nombre_bodega']), "bodega", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into bodega values ('$id','" . strtoupper($_POST['nombre_bodega']) . "','" . strtoupper($_POST['ubicacion_bodega']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $data = "2";//guardado
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_bodega", strtoupper($_POST['nombre_bodega']), "bodega", "m", $_POST['id'], "id_bodega");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "update bodega set nombre_bodega = '" . strtoupper($_POST['nombre_bodega']) . "', ubicacion_bodega= '" . strtoupper($_POST['ubicacion_bodega']) . "', fecha_creacion = '$fecha' where id_bodega = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $data = "3";
        }
    }
}
echo $data;
?>

