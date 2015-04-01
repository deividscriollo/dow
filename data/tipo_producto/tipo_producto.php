
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
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "tipo_producto", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into tipo_producto values ('$id','" . strtoupper($_POST['descripcion']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $sql_nuevo = "select (id_tipo,descripcion,fecha_creacion,estado) from tipo_producto where id_tipo='$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'tipo_producto',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "tipo_producto", "m", $_POST['id'], "id_tipo");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            $sql_anterior = "select (id_tipo,descripcion,fecha_creacion,estado) from tipo_producto where id_tipo='$_POST[id]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);
            $sql = "update tipo_producto set descripcion = '" . strtoupper($_POST['descripcion']) . "', fecha_creacion = '$fecha' where id_tipo = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "select (id_tipo,descripcion,fecha_creacion,estado) from tipo_producto where id_tipo='$_POST[id]'";        
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'tipo_producto',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>