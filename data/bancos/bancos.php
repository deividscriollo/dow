
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
    $repetidos = repetidos($conexion, "nombre_banco", strtoupper($_POST['nombre_banco']), "bancos", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        $sql = "insert into bancos values ('$id','" . strtoupper($_POST['codigo']) . "','" . strtoupper($_POST['nombre_banco']) . "','$fecha','1')";
        $guardar = guardarSql($conexion, $sql);

        $sql_nuevo = "select (id_bancos, codigo, nombre_banco, fecha_creacion, estado) from bancos where id_bancos = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'bancos',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "nombre_banco", strtoupper($_POST['nombre_banco']), "bancos", "m", $_POST['id'], "id_bancos");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            // $sql_anterior = "select (id_bancos, codigo, nombre_banco, fecha_creacion, estado) from bancos where id_bancos = '$_POST[id]'";        
            // $sql_anterior = sql_array($conexion,$sql_anterior);
            $sql = "update bancos set codigo = '" . strtoupper($_POST['codigo']) . "', nombre_banco = '" . strtoupper($_POST['nombre_banco']) . "', fecha_creacion = '$fecha' where id_bancos = '$_POST[id]'";
            $guardar = guardarSql($conexion, $sql);
            // $sql_nuevo = "select (id_bancos, ,codigo, nombre_banco, fecha_creacion, estado) from bancos where id_bancos = '$_POST[id]'";        
            // $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            // auditoria_sistema($conexion,'bancos',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>