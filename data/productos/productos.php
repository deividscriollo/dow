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
	$sin_existencia = "No";	///checks
	$incluye_iva = "No";	///checks
	$expiracion_producto = "No";	///checks
	$producto_series = "No";	///checks
	$producto_activo = "No";	///checks
	if(isset($_POST["sin_existencia"]))
		$sin_existencia = "Si";	
	if(isset($_POST["incluye_iva"]))
		$incluye_iva = "Si";	
	if(isset($_POST["expiracion_producto"]))
		$expiracion_producto = "Si";	
	if(isset($_POST["producto_series"]))
		$producto_series = "Si";	
	if(isset($_POST["producto_activo"]))
		$producto_activo = "Si";	
	/////////////validacion de los checks

	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';		
	if($_POST['tipo'] == "g"){
		//verifica codigo
		$repetidos = repetidos($conexion, "codigo", strtoupper($_POST['txt_1']), "productos", "g", "", "");		
    	if ($repetidos == 'true') {				
    		$data = 1;///codigo repetido		
    	}else{
    		$repetidos = repetidos($conexion, "codigo_barras", strtoupper($_POST['txt_8']), "productos", "gr", "", "");
	    	if ($repetidos == 'true') {				
	    		$data = 2;///codigo barras repetido		
	    	}else{
	    		$repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['txt_2']), "productos", "g", "", "");
		    	if ($repetidos == 'true') {				
		    		$data = 3;///nombre repetido		
		    	}else{
		    		$data = 0;
		    	}    
	    	}	
    	}    	    		    	
    	if($data == 0){
    		$valor1 = number_format($_POST['txt_9'], 2, '.', '');
			$valor2 = number_format($_POST['txt_4'], 2, '.', '');
			$valor3 = number_format($_POST['txt_11'], 2, '.', '');
			if (strpos($cadena, $buscar) ==  FALSE) {
				$sql ="insert into productos values ('$id','".strtoupper($_POST["txt_1"])."','".strtoupper($_POST["txt_8"])."','".strtoupper($_POST['txt_2'])."','$valor1','".$_POST["txt_3"]."','".$_POST["txt_10"]."','$valor2','$valor3','".$_POST["txt_5"]."','".$_POST["txt_12"]."','".$_POST["txt_6"]."','".$_POST["txt_13"]."','".$_POST["txt_7"]."','".$_POST["txt_14"]."','$sin_existencia','".$_POST["txt_16"]."','".$_POST["txt_17"]."','$producto_series','$expiracion_producto','".$_POST["txt_18"]."','default.png','$producto_activo','$fecha','".$_POST["iva_producto"]."','$id_user','$incluye_iva','".$_POST["descuento"]."','".$_POST['grupo_contable']."')";					
			}else{					
				$resp = img_64("img",$_POST['img'],'png',$id);					
				if($resp == "true"){
					$sql ="insert into productos values ('$id','".strtoupper($_POST["txt_1"])."','".strtoupper($_POST["txt_8"])."','".strtoupper($_POST['txt_2'])."','$valor1','".$_POST["txt_3"]."','".$_POST["txt_10"]."','$valor2','$valor3','".$_POST["txt_5"]."','".$_POST["txt_12"]."','".$_POST["txt_6"]."','".$_POST["txt_13"]."','".$_POST["txt_7"]."','".$_POST["txt_14"]."','$sin_existencia','".$_POST["txt_16"]."','".$_POST["txt_17"]."','$producto_series','$expiracion_producto','".$_POST["txt_18"]."','".$id.".png','$producto_activo','$fecha','".$_POST["iva_producto"]."','$id_user','$incluye_iva','".$_POST["descuento"]."','".$_POST['grupo_contable']."')";			
				}
				else{

					$sql ="insert into productos values ('$id','".strtoupper($_POST["txt_1"])."','".strtoupper($_POST["txt_8"])."','".strtoupper($_POST['txt_2'])."','$valor1','".$_POST["txt_3"]."','".$_POST["txt_10"]."','$valor2','$valor3','".$_POST["txt_5"]."','".$_POST["txt_12"]."','".$_POST["txt_6"]."','".$_POST["txt_13"]."','".$_POST["txt_7"]."','".$_POST["txt_14"]."','$sin_existencia','".$_POST["txt_16"]."','".$_POST["txt_17"]."','$producto_series','$expiracion_producto','".$_POST["txt_18"]."','default.png','$producto_activo','$fecha','".$_POST["iva_producto"]."','$id_user','$incluye_iva','".$_POST["descuento"]."','".$_POST['grupo_contable']."')";		
				}
			}
			$guardar = guardarSql($conexion,$sql);
			////////kardex/////////
			$temp = round(($_POST['txt_12'] * $_POST['txt_9']), 3);
			$id_kardex = unique($fecha_larga);			
			$sql_kardex = "insert into kardex values ('".$id_kardex."','".$id."','".$fecha."')";
			$guardar = guardarSql($conexion,$sql_kardex);
			$id_det_kardex = unique($fecha_larga);	
			$sql_kardex = "insert into detalles_kardex values ('".$id_det_kardex."','".$id_kardex."','".$fecha."','Creacion de productos','".$_POST['txt_12']."','".$_POST['txt_9']."','".$temp."','','','','".$_POST['txt_12']."','".$_POST['txt_9']."','".$temp."')";
			$guardar = guardarSql($conexion,$sql_kardex);

			/////////LIBRO DIARIOS//////////
			$id_libro  = unique($fecha_larga);
			
			$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','$temp','','".$_POST['grupo_contable']."','Tabla Productos','Ingreso de Mercaderia')";
			$guardar = guardarSql($conexion,$sql_libro);

			$id_libro  = unique($fecha_larga);
			$sql_libro = "insert into libro_diario values ('".$id_libro."','".$fecha."','','".$temp."','11501155240ac3a8eeb','Tabla Productos','Capital Inicial')";
			$guardar = guardarSql($conexion,$sql_libro);	
			///////////////////////
			$sql_nuevo = "select (id_productos,codigo,codigo_barras,descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,id_unidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,estado,fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento) from productos where id_productos = '$id'";        
        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
        	auditoria_sistema($conexion,'productos',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 4; /// error al guardar
			}			
    	}										
	}else{
		$repetidos = repetidos($conexion, "codigo", strtoupper($_POST['txt_1']), "productos", "m", $_POST['txt_0'], "id_productos");
		if ($repetidos == 'true') {				
    		$data = 1;///codigo repetido		
    	}else{
    		$repetidos = repetidos($conexion, "codigo_barras", strtoupper($_POST['txt_8']), "productos", "mr", $_POST['txt_0'], "id_productos");
			if ($repetidos == 'true') {				
	    		$data = 2;///codigo barras repetido		
	    	}else{
	    		$repetidos = repetidos($conexion, "descripcion", strtoupper($_POST['txt_2']), "productos", "m", $_POST['txt_0'], "id_productos");
				if ($repetidos == 'true') {				
		    		$data = 3;///nombre repetido		
		    	}else{
		    		$data = 0;
		    	}
	    	}	    	
    	}    	

		if($data == 0){
			$valor1 = number_format($_POST['txt_9'], 2, '.', '');
			$valor2 = number_format($_POST['txt_4'], 2, '.', '');
			$valor3 = number_format($_POST['txt_11'], 2, '.', '');
    		if (strpos($cadena, $buscar) ==  FALSE) {
				$sql = "update productos set codigo='".strtoupper($_POST["txt_1"])."',codigo_barras='".strtoupper($_POST["txt_8"])."',descripcion='".strtoupper($_POST['txt_2'])."',precio='$valor1',utilidad_minorista='".$_POST["txt_3"]."',utilidad_mayorista='".$_POST["txt_10"]."',precio_minorista='$valor2',precio_mayorista='$valor3',id_tipo='".$_POST["txt_5"]."',stock='".$_POST["txt_12"]."',id_categoria='".$_POST["txt_6"]."',id_marca='".$_POST["txt_13"]."',id_bodega='".$_POST["txt_7"]."',id_unidad='".$_POST["txt_14"]."',facturar_existencia='$sin_existencia',cantidad_minima='".$_POST["txt_16"]."',cantidad_maxima='".$_POST["txt_17"]."',id_series_venta='$producto_series',expiracion='$expiracion_producto',comentario='".$_POST["txt_18"]."',imagen='default.png',estado='$producto_activo',id_porcentaje_iva='".$_POST["iva_producto"]."',id_usuario ='$id_user', incluye_iva='".$incluye_iva."',descuento='".$_POST["descuento"]."',id_plan_cuentas='".$_POST['grupo_contable']."' where id_productos = '".$_POST["txt_0"]."'";					
			}else{					
				$resp = img_64("img",$_POST['img'],'png',$id);					
				if($resp == "true"){					     								
					$sql = "update productos set codigo='".strtoupper($_POST["txt_1"])."',codigo_barras='".strtoupper($_POST["txt_8"])."',descripcion='".strtoupper($_POST['txt_2'])."',precio='$valor1',utilidad_minorista='".$_POST["txt_3"]."',utilidad_mayorista='".$_POST["txt_10"]."',precio_minorista='$valor2',precio_mayorista='$valor3',id_tipo='".$_POST["txt_5"]."',stock='".$_POST["txt_12"]."',id_categoria='".$_POST["txt_6"]."',id_marca='".$_POST["txt_13"]."',id_bodega='".$_POST["txt_7"]."',id_unidad='".$_POST["txt_14"]."',facturar_existencia='$sin_existencia',cantidad_minima='".$_POST["txt_16"]."',cantidad_maxima='".$_POST["txt_17"]."',id_series_venta='$producto_series',expiracion='$expiracion_producto',comentario='".$_POST["txt_18"]."',imagen='".$id.".png',estado='$producto_activo',id_porcentaje_iva='".$_POST["iva_producto"]."',id_usuario ='$id_user', incluye_iva='".$incluye_iva."',descuento='".$_POST["descuento"]."',id_plan_cuentas='".$_POST['grupo_contable']."' where id_productos = '".$_POST["txt_0"]."'";
				}
				else{
					$sql = "update productos set codigo='".strtoupper($_POST["txt_1"])."',codigo_barras='".strtoupper($_POST["txt_8"])."',descripcion='".strtoupper($_POST['txt_2'])."',precio='$valor1',utilidad_minorista='".$_POST["txt_3"]."',utilidad_mayorista='".$_POST["txt_10"]."',precio_minorista='$valor2',precio_mayorista='$valor3',id_tipo='".$_POST["txt_5"]."',stock='".$_POST["txt_12"]."',id_categoria='".$_POST["txt_6"]."',id_marca='".$_POST["txt_13"]."',id_bodega='".$_POST["txt_7"]."',id_unidad='".$_POST["txt_14"]."',facturar_existencia='$sin_existencia',cantidad_minima='".$_POST["txt_16"]."',cantidad_maxima='".$_POST["txt_17"]."',id_series_venta='$producto_series',expiracion='$expiracion_producto',comentario='".$_POST["txt_18"]."',imagen='default.png',estado='$producto_activo',id_porcentaje_iva='".$_POST["iva_producto"]."',id_usuario ='$id_user', incluye_iva='".$incluye_iva."',descuento='".$_POST["descuento"]."',id_plan_cuentas='".$_POST['grupo_contable']."' where id_productos = '".$_POST["txt_0"]."'";
				}
			}
			$sql_anterior = "select (id_productos,codigo,codigo_barras,descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,id_unidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,estado,fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento) from productos where id_productos = '$_POST[txt_0]'";        	
        	$sql_anterior = sql_array($conexion,$sql_anterior);
			$guardar = guardarSql($conexion,$sql);
			$sql_nuevo = "select (id_productos,codigo,codigo_barras,descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,id_unidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,estado,fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento) from productos where id_productos = '$_POST[txt_0]'";        	
            $sql_nuevo = sql_array($conexion,$sql_nuevo);            
           	auditoria_sistema($conexion,'productos',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
			if( $guardar == 'true'){
				$data = 0; ////datos guardados
			}else{
				$data = 4; /// error al guardar
			}		
    	}
	}	
	echo $data;
?>