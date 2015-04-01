<?php 
//inclucion de librerias
	include '../conexion.php';
	include '../funciones_generales.php';
	include '../correos/mail.php';
	// include '../correos/prueba.php';
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";
	$sql2 = "";	
	$sql3 = "";
	$sql4 = "";
	$id_session = sesion_activa();///datos session
	$id = unique($fecha_larga);
	
	///////////////////////guardar factura venta////////////////////
    $num_serie = "001-001-".$_POST['serie3'];

	$sql = "insert into factura_venta values ('$id','$_POST[id_cliente]','$id_session','$_POST[serie3]','$fecha','$_POST[hora]','$num_serie','$_POST[fecha_cancelacion]','$_POST[tipo]','$_POST[formas]','$_POST[tarifa0]','$_POST[tarifa12]','$_POST[iva]','$_POST[descuento_total]','$_POST[total]','Activo','$fecha')";	
		
	$guardar = guardarSql($conexion,$sql);
	if( $guardar == 'true'){
		$data = 0; ////datos guardados
	}else{
		$data = 2; /// error al guardar
	}

	/////datos detalle factura/////
	$campo1 = $_POST['campo1'];
	$campo2 = $_POST['campo2'];
	$campo3 = $_POST['campo3'];
	$campo4 = $_POST['campo4'];
	$campo5 = $_POST['campo5'];
	///////////////////////////////

	////////////descomponer detalle_factura_compra////////
	$arreglo1 = explode(',', $campo1);
	$arreglo2 = explode(',', $campo2);
	$arreglo3 = explode(',', $campo3);
	$arreglo4 = explode(',', $campo4);
	$arreglo5 = explode(',', $campo5);
	$nelem = count($arreglo1);

	for ($i = 0; $i < $nelem; $i++) {		
	$id2 = unique($fecha_larga);
	$stock = 0;
	$cal = 0;
	///guardar detalle_factura/////
    $sql2 = "insert into detalle_factura_venta values (
   	'$id2','$id','".$arreglo1[$i]."','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo4[$i]."','".$arreglo5[$i]."','Activo','$fecha')";       
	$guardar = guardarSql($conexion,$sql2);
	//////////////////////////////
    

    //////////////modificar productos///////////
    $consulta = pg_query("select * from productos where id_productos = '".$arreglo1[$i]."'");
    while ($row = pg_fetch_row($consulta)) {
        $stock = $row[10];
    }
    $cal = $stock - $arreglo2[$i];
    

    $sql3 = "update productos set precio='".$arreglo3[$i]."', stock='$cal' where id_productos='".$arreglo1[$i]."'";								
	$guardar = guardarSql($conexion, $sql3);
    ///////////////////////////////////////////
	//
    //////////////agregar al kardex///////////
    $sql4 = "insert into kardex values (
   	'$id2','".$arreglo1[$i]."','$fecha','Factura Venta','$num_serie','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo5[$i]."','Egreso','2','$fecha')";       
	$guardar = guardarSql($conexion,$sql4);
	////////////////////////////////////////
}


//validando_xml($id,'fecha','total','detalle','cliente','ruc_ced','total_sin inpuestos','descuento','iva','diferencia','telefono','num_factu','dir-client','orden_num');

$l='localhost/sistema_dow/data/reportes/factura_venta.php?id='.$id;
envio_correo_ventas($_POST['correo'],$_POST['nombre'],$_POST['total'],$l, $num_serie);
echo $data;
?>