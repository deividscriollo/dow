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
    $repetidos = repetidos($conexion, "nombre_bodega", strtoupper($_POST['nombre_bodega']), "bodega", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into bodega values ('$id','" . strtoupper($_POST['nombre_bodega']) . "','" . strtoupper($_POST['ubicacion_bodega']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $sql_nuevo = "select (id_bodega,nombre_bodega,ubicacion_bodega,fecha_creacion,estado) from bodega where id_bodega = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'bodega',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";//guardado
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_bodega", strtoupper($_POST['nombre_bodega']), "bodega", "m", $_POST['id'], "id_bodega");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql_anterior = "select (id_bodega,nombre_bodega,ubicacion_bodega,fecha_creacion,estado) from bodega where id_bodega = '$_POST[id]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);
            $sql = "update bodega set nombre_bodega = '" . strtoupper($_POST['nombre_bodega']) . "', ubicacion_bodega= '" . strtoupper($_POST['ubicacion_bodega']) . "', fecha_creacion = '$fecha' where id_bodega = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "select (id_bodega,nombre_bodega,ubicacion_bodega,fecha_creacion,estado) from bodega where id_bodega = '$_POST[id]'";      
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'bodega',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>

