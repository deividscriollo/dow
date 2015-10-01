<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	if($_POST['tipo'] == '1'){//function atras
		if($_POST['comprobante'] == ''){///si exsite un id previo
			$sql = "select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);		
		}else{
			$sql = "select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " where " .$_POST['id_tabla']. " not in (select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " where " .$_POST['id_tabla']. " >= '$_POST[comprobante]' order by " .$_POST['id_tabla']. " desc) order by fecha_creacion desc limit 1";
			$id_tabla = id_unique($conexion, $sql);
		}
		echo $id_tabla;
	}else{
		if($_POST['tipo'] == '2'){//function adelante
			if($_POST['comprobante'] == ''){///si exsite un id previo
				$sql = "select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " order by fecha_creacion desc limit 1";
				$id_tabla = id_unique($conexion, $sql);			
			}else{
				$sql = "select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " where " .$_POST['id_tabla']. " not in (select " .$_POST['id_tabla']. " from " .$_POST['tabla']. " where " .$_POST['id_tabla']. " <= '$_POST[comprobante]' order by " .$_POST['id_tabla']. " asc) order by fecha_creacion asc limit 1";				
				$id_tabla = id_unique($conexion, $sql);			
			}

			echo $id_tabla;
		}	
	}
?>