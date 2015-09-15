<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_productos from productos order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_productos from productos where id_productos not in (select id_productos from productos where id_productos >= '$_GET[id]' order by id_productos desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);						
		}		
		$sql = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,unidades_medida.id_unidad,unidades_medida.cantidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,productos.estado,productos.fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento,id_plan_cuentas from productos,unidades_medida where unidades_medida.id_unidad = productos.id_unidad and productos.id_productos = '$id_tabla'";			
		$lista1=array(atras_adelente($conexion,$sql)); 		
		$data = (json_encode($lista1));
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_productos from productos order by fecha_creacion asc limit 1";
				$id_tabla = id_unique($conexion, $sql);			
				//echo $sql;
			}else{
				$sql = "select id_productos from productos where id_productos not in (select id_productos from productos where id_productos <= '$_GET[id]' order by id_productos asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,unidades_medida.id_unidad,unidades_medida.cantidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,productos.estado,productos.fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento,id_plan_cuentas from productos,unidades_medida where unidades_medida.id_unidad = productos.id_unidad and productos.id_productos = '$id_tabla'";	
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>