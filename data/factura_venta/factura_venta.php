<?php 
//inclucion de librerias
	include '../conexion.php';
	include '../funciones_generales.php';
	//include '../correos/mail.php';
	// include '../correos/prueba.php';
	// error_reporting(0);

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
	$id_user = sesion_activa();	
	
	// guardar factura venta
    $num_serie = "001-001-".$_POST['serie3'];

	$sql = "insert into factura_venta values ('$id','".$_POST['id_cliente']."','".$id_session."','','".$_POST['fecha_actual']."','".$_POST['hora_actual']."','".$num_serie."','".$_POST['fecha_cancelacion']."','".$_POST['tipo']."','".$_POST['formas']."','".$_POST['termino_pago']."','".$_POST['tarifa0']."','".$_POST['tarifa12']."','".$_POST['iva']."','".$_POST['descuento_total']."','".$_POST['total']."','$fecha','Activo')";	
	$guardar = guardarSql($conexion,$sql);

	$sql_nuevo = "select (id_factura_venta,id_cliente,id_usuario,fecha_anulacion,fecha_actual,hora_actual,numero_serie,fecha_cancelacion,tipo_precio,id_forma_pago,id_termino_pago,tarifa0,tarifa12,iva,descuento,total,fecha_creacion,estado) from factura_venta where id_factura_venta = '$id'";        
	$sql_nuevo = sql_array($conexion,$sql_nuevo);
	auditoria_sistema($conexion,'factura_venta',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
	// Fin 
	
	// datos detalle factura
	$campo1 = $_POST['campo1'];
    $campo2 = $_POST['campo2'];
    $campo3 = $_POST['campo3'];
    $campo4 = $_POST['campo4'];
    $campo5 = $_POST['campo5'];
    $campo6 = $_POST['campo6'];
	// fin

	// descomponer detalle_factura_compra
	$arreglo1 = explode('|', $campo1);
    $arreglo2 = explode('|', $campo2);
    $arreglo3 = explode('|', $campo3);
    $arreglo4 = explode('|', $campo4);
    $arreglo5 = explode('|', $campo5);
    $arreglo6 = explode('|', $campo6);
    $nelem = count($arreglo1);
    // fin

    if($_POST['formas'] == '110205552550fd8d51e') {//CREDITO NO CAMBIAR EN LA BASE
    	// variables pagos
        $adelanto = $_POST['adelanto'];
        $meses = $_POST['meses'];
        $total = $_POST['total'];
        // fin

        if ($adelanto == "") {
            $monto = $total;
            $format = number_format($monto, 2, '.', '');
            $adelanto = 0.00;
        } else {
            $monto = $total - $adelanto;
            $format = number_format($monto, 2, '.', '');
        }

        // guardar pagos venta
        $id2 = unique($fecha_larga);
        pg_query("insert into pagos_venta values('$id2','".$_POST['id_cliente']."', '$id','".$id_session."','".$_POST['fecha_actual']."','$adelanto','$meses','$format','$format','Activo','$fecha')");
        // fin

        // Guardar meses
        if ($meses > 1) {
            for ($i = 1; $i <= $meses - 1; $i++) {
                // contador detalle pagos compra
                $id3 = unique($fecha_larga);
                // fin

                $calcu = $monto / ($meses);
                $nuevaFecha = date('Y-m-d', strtotime(" + $i month"));
                $format_numero = number_format(floor($calcu), 2, '.', '');
                pg_query("insert into detalle_pagos_venta values('$id3','$id2','$nuevaFecha','$format_numero','$format_numero','Activo','$fecha')");
            }
            
            $id3 = unique($fecha_larga);
            $calcu1 = floor($calcu) * ($meses - 1);
            $ultimaFecha = date('Y-m-d', strtotime(" + $i month"));
            $sal = $monto - $calcu1;
            $format_numero2 = number_format($sal, 2, '.', '');
            pg_query("insert into detalle_pagos_venta values('$id3','$id2','$ultimaFecha','$format_numero2','$format_numero2','Activo','$fecha')");
        } else {
            $id3 = unique($fecha_larga);

            $k = 1;
            $format2 = number_format($monto, 2, '.', '');
            $Fecha = date('Y-m-d', strtotime(" + $k month"));
            pg_query("insert into detalle_pagos_venta values('$id3','$id2','$Fecha','$format2','$format2','Activo','$fecha')");
        }
        //////////////////////////////////////////////////////  

    }



	for ($i = 1; $i < $nelem; $i++) {
		$id3 = unique($fecha_larga);
		$stock = 0;
		$cal = 0;

		// guardar detalle_factura
	    $sql2 = "insert into detalle_factura_venta values ('$id3','$id','".$arreglo1[$i]."','".$arreglo2[$i]."','".$arreglo3[$i]."','".$arreglo4[$i]."','".$arreglo5[$i]."','".$arreglo6[$i]."','$fecha','Activo')";       
		$guardar = guardarSql($conexion,$sql2);

		$sql_nuevo = "select (id_detalle_factura_venta,id_factura_venta,id_productos,cantidad,precio,descuento,total,pendientes,fecha_creacion,estado) from detalle_factura_venta where id_detalle_factura_venta = '$id3'";        
		$sql_nuevo = sql_array($conexion,$sql_nuevo);
		auditoria_sistema($conexion,'detalle_factura_venta',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
		// fin   

		// Kardex
		$sql_kardex = "select id_productos from productos where id_productos ='".$arreglo1[$i]."'";

		$id_prod = id_unique($conexion,$sql_kardex);

        ///kardex y modificar productos///
        $c_t = '';
		$v_t = '';
		$t_t = '';
		$c_e = '';
		$v_e = '';
		$t_e = '';

        $consulta = pg_query("select stock,precio from productos where id_productos = '".$id_prod."'");
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
		$v_e = $precio_compra;
		$t_e = $arreglo2[$i] * $precio_compra;
		$t_e = number_format($t_e, 3, '.', '');

		$c_t = $c_t - $c_e;		
		$t_t = $t_t - $t_e;		
		if($t_t > 0 && $c_t >0) { 						
		    $v_t = $t_t / $c_t;
		    $v_t = number_format($v_t, 2, '.', '');
		} else { 		
		    $v_t = '0';
		}  

		$sql_kardex = "insert into detalles_kardex values ('".$id_det_kardex."','".$id_kardex."','".$fecha."','".'Factura venta salida de productos Nro.'.$id."','','','','".$c_e."','".$v_e."','".$t_e."','".$c_t."','".$v_t."','".$t_t."')";		
		$guardar = guardarSql($conexion, $sql_kardex);                
        $sql3 = "update productos set stock='".$c_t."', precio = '".$v_t."' where id_productos='".$id_prod."'";								
		$guardar = guardarSql($conexion, $sql3);
        /////////LIBRO DIARIOS//////////
		$id_libro  = unique($fecha_larga);	
		//echo $id_libro.'</br>';

		if($_POST['formas'] == '110147552550ebaa4df') {//CONTADO NO CAMBIAR EN LA BASE
			$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','".$_POST['total']."','','11501155240ac39d2f0','Factura Venta','Cobro Contado Caja')";
			$resp = $guardar = guardarSql($conexion,$sql_libro);	
		} else {			
			$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','".$_POST['total']."','','11501155240ac39f4e6','Factura Venta','Cuentas por Cobrar')";
			$resp = $guardar = guardarSql($conexion,$sql_libro);	
		}

		if($resp == 'true') {
			$id_libro_2  = unique($fecha_larga);	
			//echo $id_libro_2.'</br>';
			
							
			$sql_libro = "insert into libro_diario values ('".$id_libro_2."','".$fecha."','','".($_POST['tarifa12'] + $_POST['tarifa0'])."','11501155240ac3aaaaa','Factura Ventas','Venta de Productos')";
			$resp = $guardar = guardarSql($conexion,$sql_libro);			
			if($resp == 'true'){
				$id_libro_3  = unique($fecha_larga);	
				//echo $id_libro_3.'</br>';		
				$sql_libro = "insert into libro_diario values ('".$id_libro_3."','".$fecha."','','".($_POST['iva'])."','11501155240ac3a138e','Factura Ventas','Iva Cobrado')";
				$resp = $guardar = guardarSql($conexion,$sql_libro);			
				
			}			
		}		
		///////////////////////		
	}

	if( $guardar == 'true'){
		$data = 0; ////datos guardados
	}else{
		$data = 2; /// error al guardar
	}

echo $data;
?>