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
		$sql = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,productos.id_tipo,tipo_producto.descripcion,stock,productos.id_bodega,bodega.nombre_bodega,productos.id_unidad, unidades_medida.descripcion,facturar_existencia,unidades_medida.cantidad,cantidad_minima,cantidad_maxima,iva_producto,id_series_venta,id_lotes,productos.estado,comentario,imagen,id_marca,id_categoria from productos,tipo_producto,bodega,unidades_medida where productos.id_tipo = tipo_producto.id_tipo and productos.id_bodega = bodega.id_bodega and productos.id_unidad = unidades_medida.id_unidad and productos.id_productos = '$id_tabla'";			
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
			$sql = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,productos.id_tipo,tipo_producto.descripcion,stock,productos.id_bodega,bodega.nombre_bodega,productos.id_unidad, unidades_medida.descripcion,facturar_existencia,unidades_medida.cantidad,cantidad_minima,cantidad_maxima,iva_producto,id_series_venta,id_lotes,productos.estado,comentario,imagen,id_marca,id_categoria from productos,tipo_producto,bodega,unidades_medida where productos.id_tipo = tipo_producto.id_tipo and productos.id_bodega = bodega.id_bodega and productos.id_unidad = unidades_medida.id_unidad and productos.id_productos = '$id_tabla'";	
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>