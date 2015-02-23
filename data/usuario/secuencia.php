<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_usuario from usuario order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_usuario from usuario where id_usuario not in (select id_usuario from usuario where id_usuario >= '$_GET[id]' order by id_usuario desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}
		$sql = "select usuario.id_usuario,identificacion,nombres_completos,telefono1,telefono2,ciudad.id_ciudad,ciudad.descripcion,direccion,correo,usuario,cargo.id_cargo,cargo.descripcion,usuario.estado,imagen,extranjero,clave from usuario, ciudad,cargo,claves where usuario.id_ciudad = ciudad.id_ciudad and cargo.id_cargo = usuario.id_cargo and claves.id_usuario = usuario.id_usuario and usuario.id_usuario = '$id_tabla'";			
		$lista1=array(atras_adelente($conexion,$sql)); 		
		$data = (json_encode($lista1));
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_usuario from usuario order by fecha_creacion desc limit 1";
				
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select id_usuario from usuario where id_usuario not in (select id_usuario from usuario where id_usuario <= '$_GET[id]' order by id_usuario asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql = "select usuario.id_usuario,identificacion,nombres_completos,telefono1,telefono2,ciudad.id_ciudad,ciudad.descripcion,direccion,correo,usuario,cargo.id_cargo,cargo.descripcion,usuario.estado,imagen,extranjero,clave from usuario, ciudad,cargo,claves where usuario.id_ciudad = ciudad.id_ciudad and cargo.id_cargo = usuario.id_cargo and claves.id_usuario = usuario.id_usuario and usuario.id_usuario = '$id_tabla'";			
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>