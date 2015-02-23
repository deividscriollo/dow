
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
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "tipo_producto", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into tipo_producto values ('$id','" . strtoupper($_POST['descripcion']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "tipo_producto", "m", $_POST['id'], "id_tipo");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "update tipo_producto set descripcion = '" . strtoupper($_POST['descripcion']) . "', fecha_creacion = '$fecha' where id_tipo = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $data = "3";
        }
    }
}
echo $data;
?>