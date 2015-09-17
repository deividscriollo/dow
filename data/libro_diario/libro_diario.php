<?php
include '../conexion.php';
include '../funciones_generales.php';		
$conexion = conectarse();
$lista_2 = array();
$lista_3 = array();
$f=split(' - ', $_POST['fecha']);
$id_kardex = '';
$sql = pg_query("select id_plan,codigo_cuenta,nombre_cuenta from plan_cuentas order by codigo_cuenta");
while ($row = pg_fetch_row($sql)) {
    $lista = array();
    $lista_1 = array();
	$sql_1 = pg_query("select fecha,debe,haber,referencia,detalle from libro_diario where id_plan_cuentas = '".$row[0]."' and fecha between '".$f[0].' 00:00:00'."' and '".$f[1].' 23:59:59'."' order by fecha");
    if(pg_num_rows($sql_1) > 0){
        $lista[] = $row[0];
        $lista[] = $row[1];
        $lista[] = $row[2];
        while ($row_1 = pg_fetch_row($sql_1)) {            
            $lista_1[] = $row_1[0];
            $lista_1[] = $row_1[1];
            $lista_1[] = $row_1[2];
            $lista_1[] = $row_1[3];
            $lista_1[] = $row_1[4];

        }                
        $lista_2 = array("Cabecera" => $lista, "Detalles" => $lista_1); 
        $lista_3[] = $lista_2;
    }    
}            
echo json_encode($lista_3);


    
?>