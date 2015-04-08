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
    $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "terminos_pago", "g", "", "");
    if ($repetidos == 'true') {
        $data = "1"; /// este dato ya existe;
    } else {
        if($_POST['principal'] == 'Si'){
            $sql = "update terminos_pago set principal = 'No'";            
            guardarSql($conexion,$sql);    
        }        
        $sql = "insert into terminos_pago values ('$id','" . strtoupper($_POST['descripcion']) . "','" . $_POST['principal'] . "','0','$fecha','".$_POST['porcentaje_inicial']."','".$_POST['monto_inicial']."','".$_POST['nro_meses']."')";        
        $guardar = guardarSql($conexion, $sql);        
        $sql_nuevo = "select (id_termino_pago,descripcion,principal,estado,fecha_creacion,porcentaje_inicial,monto_inicial,nro_meses) from terminos_pago where id_termino_pago = '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'terminos_pago',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
        $data = "2";
    }
} else {
    if ($_POST['oper'] == "edit") {
        $repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['descripcion']), "terminos_pago", "m", $_POST['id_termino_pago'], "id_termino_pago");
        if ($repetidos == 'true') {
            $data = "1"; /// este dato ya existe;
        } else {
            if($_POST['principal'] == 'Si'){
                $sql = "update terminos_pago set principal = 'No'";            
                guardarSql($conexion,$sql);    
            }
            $sql_anterior = "select (id_termino_pago,descripcion,principal,estado,fecha_creacion,porcentaje_inicial,monto_inicial,nro_meses) from terminos_pago where id_termino_pago = '$_POST[id_termino_pago]'";        
            $sql_anterior = sql_array($conexion,$sql_anterior);            
            $sql = "update terminos_pago set descripcion = '" . strtoupper($_POST['descripcion']) . "', principal = '".$_POST['principal']."',estado = '0', fecha_creacion = '$fecha',porcentaje_inicial = '".$_POST['porcentaje_inicial']."',monto_inicial = '".$_POST['monto_inicial']."',nro_meses = '".$_POST['nro_meses']."'  where id_termino_pago = '$_POST[id_termino_pago]'";
            $guardar = guardarSql($conexion, $sql);
            $sql_nuevo = "select (id_termino_pago,descripcion,principal,estado,fecha_creacion) from terminos_pago where id_termino_pago = '$_POST[id_termino_pago]'";        
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
            auditoria_sistema($conexion,'terminos_pago',$id_user,'Update',$_POST['id'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
            $data = "3";
        }
    }
}
echo $data;
?>

