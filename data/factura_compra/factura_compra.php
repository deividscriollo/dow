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
		
    // guardar factura compra
	$sql = "insert into factura_compra values ('$id','".$_POST['id_proveedor']."','$id_session','".$_POST['fecha_actual']."','".$_POST['hora_actual']."','".$_POST['fecha_registro']."','".$_POST['fecha_emision']."','".$_POST['fecha_caducidad']."','".$_POST['tipo_comprobante']."','".$_POST['serie']."','".$_POST['autorizacion']."','".$_POST['fecha_cancelacion']."','".$_POST['formas']."','".$_POST['termino_pago']."','".$_POST['tarifa0']."','".$_POST['tarifa12']."','".$_POST['iva']."','".$_POST['descuento_total']."','".$_POST['total']."','$fecha','Activo')";		
	$guardar = guardarSql($conexion,$sql);
		
    // /datos detalle factura
	$campo1 = $_POST['campo1'];
	$campo2 = $_POST['campo2'];
	$campo3 = $_POST['campo3'];
	$campo4 = $_POST['campo4'];
	$campo5 = $_POST['campo5'];
	// fin

	// descomponer detalle_factura_compra
	$arreglo1 = explode('|', $campo1);
	$arreglo2 = explode('|', $campo2);
	$arreglo3 = explode('|', $campo3);
	$arreglo4 = explode('|', $campo4);
	$arreglo5 = explode('|', $campo5);
	$nelem = count($arreglo1);   	   	
	
	for ($i = 1; $i < $nelem; $i++) {		
		$id2 = unique($fecha_larga);
		$stock = 0;
		$precio_compra = 0;		
		// guardar detalle_factura
        $sql2 = "insert into detalle_factura_compra values ('$id2','$id','".$arreglo1[$i]."','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo4[$i]."','".$arreglo5[$i]."','$fecha','Activo')";       
		$guardar = guardarSql($conexion,$sql2);
		// fin        
		$sql_kardex = "select id_productos from productos where id_productos ='".$arreglo1[$i]."'";		
		//echo $sql_kardex;
		$id_prod = id_unique($conexion,$sql_kardex);
        ///kardex y modificar productos///
        $c_t = '';
		$v_t = '';
		$t_t = '';
		$c_e = '';
		$v_e = '';
		$t_e = '';
        $consulta = pg_query("select stock, precio from productos where id_productos = '".$id_prod."'");
        while ($row = pg_fetch_row($consulta)) {
            $stock = $row[0];
            $precio_compra = $row[1];
        }

        $sql_kardex = "select id_kardex from kardex where id_productos ='".$id_prod."'";
		$id_kardex = id_unique($conexion,$sql_kardex);
		$id_det_kardex = unique($fecha_larga);

		$sql_kardex = "select c_e,v_e,t_e,c_s,v_s,t_s,c_t,v_t,t_t from detalles_kardex where id_kardex = '".$id_kardex."' order by fecha desc limit 1";	
		$sql_kardex = pg_query($sql_kardex);
		while ($row = pg_fetch_row($sql_kardex)) {
			$c_t = $row[6];
			$v_t = $row[7];
			$t_t = $row[8];
		}
		$c_e = $arreglo2[$i];
		$v_e = $arreglo3[$i];
		$t_e = $arreglo2[$i] * $arreglo3[$i];

		$c_t = $c_t + $c_e;		
		$t_t = $t_t + $t_e;
		$v_t = $t_t / $c_t;
		$sql_kardex = "insert into detalles_kardex values ('".$id_det_kardex."','".$id_kardex."','".$fecha."','".'Factura compra Ingreso productos Nro.'.$id."','".$c_e."','".$v_e."','".$t_e."','','','','".$c_t."','".$v_t."','".$t_t."')";		
		$guardar = guardarSql($conexion, $sql_kardex);        
        
        $sql3 = "update productos set stock='".$c_t."', precio = '".$v_t."' where id_productos='".$id_prod."'";								
		$guardar = guardarSql($conexion, $sql3);
		
		/////////LIBRO DIARIOS//////////
		$id_libro  = unique($fecha_larga);		
		$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','".($_POST['tarifa12'] + $_POST['tarifa0'])."','','11501155240ac3a0d22','Factura Compra','Ingreso de Mercaderia')";
		$resp = $guardar = guardarSql($conexion,$sql_libro);
		if($resp == 'true'){
			$id_libro_2  = unique($fecha_larga);		
			$sql_libro = "insert into libro_diario values ('".$id_libro_2."','".$fecha."','".$_POST['iva']."','','11501155240ac3a6d69','Factura Compra','Iva Pagado')";
			$resp = $guardar = guardarSql($conexion,$sql_libro);
			if($resp == 'true'){
				$id_libro_3  = unique($fecha_larga);		
				if($_POST['formas'] == '110147552550ebaa4df')//CONTADO NO CAMBIAR EN LA BASE
				{			
					$sql_libro = "insert into libro_diario values ('".$id_libro_3."','".$fecha."','','".$_POST['total']."','11501155240ac39d2f0','Factura Compra','Pago Contado Caja')";
					$guardar = guardarSql($conexion,$sql_libro);	
				}else{
					
					$sql_libro = "insert into libro_diario values ('".$id_libro_3."','".$fecha."','','".$_POST['total']."','11501155240ac3a44f3','Factura Compra','Cuentas por Pagar')";
					$guardar = guardarSql($conexion,$sql_libro);	
				}
			}
		}	
        // fin
  	}

  	if( $guardar == 'true'){
		$data = 0; ////datos guardados
	}else{
		$data = 2; /// error al guardar
	}	

	echo $data;
?>