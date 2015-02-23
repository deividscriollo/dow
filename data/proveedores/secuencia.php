<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_proveedor from proveedor order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_proveedor from proveedor where id_proveedor not in (select id_proveedor from proveedor where id_proveedor >= '$_GET[id]' order by id_proveedor desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}
		$sql = "select id_proveedor,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,descripcion,empresa,visitador,proveedor_principal,comentario,fax,correo_proveedor,forma_pago,direccion from proveedor,ciudad where proveedor.ciudad = ciudad.id_ciudad and id_proveedor = '$id_tabla'";			
		$lista1=array(atras_adelente($conexion,$sql)); 		
		$data = (json_encode($lista1));
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_proveedor from proveedor order by fecha_creacion desc limit 1";
				
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select id_proveedor from proveedor where id_proveedor not in (select id_proveedor from proveedor where id_proveedor <= '$_GET[id]' order by id_proveedor asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql = "select id_proveedor,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,descripcion,empresa,visitador,proveedor_principal,comentario,fax,correo_proveedor,forma_pago,direccion from proveedor,ciudad where proveedor.ciudad = ciudad.id_ciudad and id_proveedor = '$id_tabla'";			
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>