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
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "unidades_medida", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into unidades_medida values ('$id','" . strtoupper($_POST['descripcion']) . "','" . strtoupper($_POST['abreviatura']) . "','$_POST[cantidad]','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "unidades_medida", "m", $_POST['id'], "id_unidad");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "update unidades_medida set descripcion = '" . strtoupper($_POST['descripcion']) . "', abreviatura= '" . strtoupper($_POST['abreviatura']) . "', cantidad = '$_POST[cantidad]', fecha_creacion = '$fecha'  where id_unidad = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $data = "3";
        }
    }
}
echo $data;
?>

