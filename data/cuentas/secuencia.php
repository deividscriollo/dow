<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_cliente from cliente order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_cliente from cliente where id_cliente not in (select id_cliente from cliente where id_cliente >= '$_GET[id]' order by id_cliente desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}
		$sql = "select id_cliente,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,descripcion,direccion,correo,comentario,cupo_credito,id_usuario from cliente,ciudad where cliente.ciudad = ciudad.id_ciudad and id_cliente = '$id_tabla'";			
		$lista1=array(atras_adelente($conexion,$sql)); 		
		$data = (json_encode($lista1));
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_cliente from cliente order by fecha_creacion desc limit 1";
				
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select id_cliente from cliente where id_cliente not in (select id_cliente from cliente where id_cliente <= '$_GET[id]' order by id_cliente asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql = "select id_cliente,tipo_documento,identificacion,nombres_completos,tipo,telefono1,telefono2,ciudad,descripcion,direccion,correo,comentario,cupo_credito,id_usuario from cliente,ciudad where cliente.ciudad = ciudad.id_ciudad and id_cliente = '$id_tabla'";			
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>