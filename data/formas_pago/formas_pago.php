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
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "formas_pago", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        if($_POST['principal'] == 'Si'){
            $sql = "update formas_pago set principal = 'No'";            
            guardarSql($conexion,$sql);    
        }        
        $sql = "insert into formas_pago values ('$id','" . strtoupper($_POST['descripcion']) . "','0','" . $_POST['principal'] . "','$fecha','".$_POST['id_plan_cuentas']."')";        
        $guardar = guardarSql($conexion, $sql);        
        $sql_nuevo = "select (id_forma_pago,descripcion,estado,principal,fecha_creacion,id_plan_cuentas) from formas_pago where id_forma_pago = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'formas_pago',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "formas_pago", "m", $_POST['id_forma_pago'], "id_forma_pago");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            if($_POST['principal'] == 'Si'){
                $sql = "update formas_pago set principal = 'No'";            
                guardarSql($conexion,$sql);    
            }
            $sql_anterior = "select (id_forma_pago,descripcion,estado,principal,fecha_creacion,id_plan_cuentas) from formas_pago where id_forma_pago = '$_POST[id_forma_pago]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);            
            $sql = "update formas_pago set descripcion = '" . strtoupper($_POST['descripcion']) . "',estado = '0', principal = '".$_POST['principal']."', fecha_creacion = '$fecha', id_plan_cuentas = '".$_POST['id_plan_cuentas']."'  where id_forma_pago = '$_POST[id_forma_pago]'";
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "select (id_forma_pago,descripcion,estado,principal,fecha_creacion,id_plan_cuentas) from formas_pago where id_forma_pago = '$_POST[id_forma_pago]'";        
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'formas_pago',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>

