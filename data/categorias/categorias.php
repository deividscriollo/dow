
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
    $repetidos = repetidos($conexion, "nombre_categoria", strtoupper($_POST['nombre_categoria']), "categoria", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into categoria values ('$id','" . strtoupper($_POST['nombre_categoria']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_categoria", strtoupper($_POST['nombre_categoria']), "categoria", "m", $_POST['id'], "id_categoria");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "update categoria set nombre_categoria = '" . strtoupper($_POST['nombre_categoria']) . "', fecha_creacion = '$fecha' where id_categoria = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $data = "3";
        }
    }
}
echo $data;
?>