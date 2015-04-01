
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
    $repetidos = repetidos($conexion, "nombre_marca", strtoupper($_POST['nombre_marca']), "marca", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into marca values ('$id','". strtoupper($_POST['nombre_marca']) ."','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);
        $sql_nuevo = "SELECT (id_marca,nombre_marca,fecha_creacion,estado)  FROM marca where id_marca = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'marca',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_marca", strtoupper($_POST['nombre_marca']), "marca", "m", $_POST['id'], "id_marca");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {            
            $sql_anterior = "SELECT (id_marca,nombre_marca,fecha_creacion,estado)  FROM marca where id_marca = '$_POST[id]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);
            $sql = "update marca set nombre_marca = '" . strtoupper($_POST['nombre_marca']) . "', fecha_creacion = '$fecha' where id_marca = '$_POST[id]'";            
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "SELECT (id_marca,nombre_marca,fecha_creacion,estado)  FROM marca where id_marca = '$_POST[id]'";        
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'marca',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";                         
        }
    }
}
echo $data;
?>