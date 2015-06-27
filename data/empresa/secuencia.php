<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_GET['fn'] == '0'){//function atras
		if($_GET['id'] == ''){///si exsite un id previo
			$sql = "select id_empresa from empresa order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}else{
			$sql = "select id_empresa from empresa where id_empresa not in (select id_empresa from empresa where id_empresa >= '$_GET[id]' order by id_empresa desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);			
		}
		$sql = "select id_empresa,ruc_empresa,nombre_empresa,propietario,slogan,telefono1,telefono2,ciudad,descripcion,direccion,correo,fax,sitio_web,nombre_contador,autorizacion_factura,ascesor_legal,representante_legal,identificacion_repre,inicio_fac_preimpresa,item_factura,anio_contable,modo_costeo,comentario,imagen,estado,ruc_contador,serie_retencion,autorizacion_retencion,serie_nota_credito,autorizacion_nota_credito from empresa,ciudad where empresa.ciudad = ciudad.id_ciudad and id_empresa= '$id_tabla'";			
		$lista1=array(atras_adelente($conexion,$sql)); 		
		$data = (json_encode($lista1));
		echo $data;
	}else{
		if($_GET['fn'] == '1'){//function adelante
			if($_GET['id'] == ''){///si exsite un id previo
				$sql = "select id_empresa from empresa order by fecha_creacion desc limit 1";
				
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select id_empresa from empresa where id_empresa not in (select id_empresa from empresa where id_empresa <= '$_GET[id]' order by id_empresa asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}
			$sql = "select id_empresa,ruc_empresa,nombre_empresa,propietario,slogan,telefono1,telefono2,ciudad,descripcion,direccion,correo,fax,sitio_web,nombre_contador,autorizacion_factura,ascesor_legal,representante_legal,identificacion_repre,inicio_fac_preimpresa,item_factura,anio_contable,modo_costeo,comentario,imagen,estado,ruc_contador,serie_retencion,autorizacion_retencion,serie_nota_credito,autorizacion_nota_credito from empresa,ciudad where empresa.ciudad = ciudad.id_ciudad and id_empresa= '$id_tabla'";			
			$lista1=array(atras_adelente($conexion,$sql)); 		
			$data = (json_encode($lista1));
			echo $data;
		}	
	}

?>