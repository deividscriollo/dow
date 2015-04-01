<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$lista2 = array();
	$lista3 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_factura_compra from factura_compra order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_factura_compra from factura_compra where id_factura_compra not in (select id_factura_compra from factura_compra where id_factura_compra >= '$_GET[id]' order by id_factura_compra desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}
		$sql_cabecera = "select id_factura_compra,usuario.nombres_completos,fecha_actual,hora_actual,proveedor.id_proveedor,proveedor.identificacion, proveedor.nombres_completos,comprobante,fecha_registro,fecha_emision,fecha_caducidad,fecha_cancelacion,numero_serie,numero_autorizacion,factura_compra.forma_pago,tarifa0,tarifa12,iva,descuento,total from factura_compra,proveedor,usuario where factura_compra.id_proveedor = proveedor.id_proveedor and factura_compra.id_usuario = usuario.id_usuario and id_factura_compra='$id_tabla'";
		//echo $sql_cabecera;					
		$sql_detalles = "select productos.id_productos,codigo,descripcion,cantidad,detalle_factura_compra.precio,descuento,total from detalle_factura_compra,productos where detalle_factura_compra.id_productos = productos.id_productos and id_factura_compra = '$id_tabla'";
		$lista1=array(atras_adelente($conexion,$sql_cabecera)); 
		$lista2=array(atras_adelente($conexion,$sql_detalles)); 
		$lista3=array("Cabecera" => $lista1, "Detalles" => $lista2); 
		$data = (json_encode($lista3));
		
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_factura_compra from factura_compra order by fecha_creacion desc limit 1";
				
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select id_factura_compra from factura_compra where id_factura_compra not in (select id_factura_compra from factura_compra where id_factura_compra <= '$_GET[id]' order by id_factura_compra asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql_cabecera = "select id_factura_compra,usuario.nombres_completos,fecha_actual,hora_actual,proveedor.id_proveedor,proveedor.identificacion, proveedor.nombres_completos,comprobante,fecha_registro,fecha_emision,fecha_caducidad,fecha_cancelacion,numero_serie,numero_autorizacion,factura_compra.forma_pago,tarifa0,tarifa12,iva,descuento,total from factura_compra,proveedor,usuario where factura_compra.id_proveedor = proveedor.id_proveedor and factura_compra.id_usuario = usuario.id_usuario and id_factura_compra='$id_tabla'";							
			$sql_detalles = "select productos.id_productos,codigo,descripcion,cantidad,detalle_factura_compra.precio,descuento,total from detalle_factura_compra,productos where detalle_factura_compra.id_productos = productos.id_productos and id_factura_compra = '$id_tabla'";
			$lista1=array(atras_adelente($conexion,$sql_cabecera)); 
			$lista2=array(atras_adelente($conexion,$sql_detalles)); 
			$lista3=array("Cabecera" => $lista1, "Detalles" => $lista2); 
			$data = (json_encode($lista3));
			echo $data;
		}	
	}

?>