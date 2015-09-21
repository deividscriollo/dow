<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time());     
	$sql = "";	
	$sql2 = "";	
	$sql3 = "";	
	$sql4 = "";
	$id_session = sesion_activa();///datos session
	$id = unique($fecha_larga);	
		
    ///////////////////////guardar factura compra////////////////////

	$sql = "insert into devolucion_compra values ('$id','$_POST[id_proveedor]','$id_session','$_POST[id_factura_compra]','$fecha','$_POST[hora]','$_POST[tarifa0]','$_POST[tarifa12]','$_POST[iva]','$_POST[descuento_total]','$_POST[total]','','Activo','$fecha')";			
		
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
        $sql2 = "insert into detalle_devolucion_compra values (
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
       	'$id2','".$arreglo1[$i]."','$fecha','Devolución Compra','$_POST[num_factura]','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo5[$i]."','Ingreso','1','$fecha')";       
		$guardar = guardarSql($conexion,$sql4);
		////////////////////////////////////////
  	}

  	$guardar = guardarSql($conexion,$sql);
	if( $guardar == 'true'){
		$data = 0; ////datos guardados
	}else{
		$data = 2; /// error al guardar
	}

	echo $data;
?>