<?php

include '../conexion.php';
include '../funciones_generales.php';
$conexion = conectarse();
date_default_timezone_set('America/Guayaquil');
$fecha = date('Y-m-d H:i:s', time());
$fecha_larga = date('His', time());
$sql = "";
$id = unique($fecha_larga);
$id_user = sesion_activa();
if ($_POST['oper'] == "add") {
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "unidades_medida", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into unidades_medida values ('$id','" . strtoupper($_POST['descripcion']) . "','" . strtoupper($_POST['abreviatura']) . "','$_POST[cantidad]','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $sql_nuevo = "select (id_unidad,descripcion,abreviatura,cantidad,fecha_creacion,estado) from unidades_medida where id_unidad = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'unidades_medida',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "unidades_medida", "m", $_POST['id'], "id_unidad");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql_anterior = "select (id_unidad,descripcion,abreviatura,cantidad,fecha_creacion,estado) from unidades_medida where id_unidad = '$_POST[id]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);
            $sql = "update unidades_medida set descripcion = '" . strtoupper($_POST['descripcion']) . "', abreviatura= '" . strtoupper($_POST['abreviatura']) . "', cantidad = '$_POST[cantidad]', fecha_creacion = '$fecha'  where id_unidad = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "select (id_unidad,descripcion,abreviatura,cantidad,fecha_creacion,estado) from unidades_medida where id_unidad = '$_POST[id]'";        
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'unidades_medida',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>

