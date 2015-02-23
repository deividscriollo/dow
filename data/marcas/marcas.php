
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
    $repetidos = repetidos($conexion, "nombre_marca", strtoupper($_POST['nombre_marca']), "marca", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into marca values ('$id','" . strtoupper($_POST['nombre_marca']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_marca", strtoupper($_POST['nombre_marca']), "marca", "m", $_POST['id'], "id_marca");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql = "update marca set nombre_marca = '" . strtoupper($_POST['nombre_marca']) . "', fecha_creacion = '$fecha' where id_marca = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $data = "3";
        }
    }
}
echo $data;
?>