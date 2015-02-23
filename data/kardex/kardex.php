<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$f=split(' - ', $_POST['fecha']);
$consulta = pg_query("SELECT P.DESCRIPCION, K.DETALLE, K.NUMERO_FACTURA, K.CANTIDAD,K.VALOR_UNITARIO, K.TOTAL, K.TRANSACCION, K.ESTADO FROM KARDEX K, PRODUCTOS P WHERE K.ID_PRODUCTOS=P.ID_PRODUCTOS AND K.ID_PRODUCTOS='$_POST[id]' AND K.FECHA_KARDEX BETWEEN '$f[0]' AND '$f[1]'");
while ($row = pg_fetch_row($consulta)) {
    $lista[] = $row[0];
    $lista[] = $row[1];
    $lista[] = $row[2];
    $lista[] = $row[3];
    $lista[] = $row[4];
    $lista[] = $row[5];
    $lista[] = $row[6];
    $lista[] = $row[7];
}
echo $lista = json_encode($lista);
?>