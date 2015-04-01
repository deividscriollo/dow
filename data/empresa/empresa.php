<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();	
    date_default_timezone_set('America/Guayaquil');
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";	
	$id = unique($fecha_larga);	
	$id_c = unique($fecha_larga);	
	$check = "off";	
	if(isset($_POST["switch-field-1"]))
		$check = "on";	
	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';		
	$id_user = sesion_activa();
	if($_POST['tipo'] == "g"){						
		if (strpos($cadena, $buscar) ==  FALSE) {
			$sql ="insert into empresa values ('$id','$_POST[txt_1]','$_POST[txt_12]','$_POST[txt_2]','$_POST[txt_13]','$_POST[txt_3]','$_POST[txt_4]','$_POST[txt_11]','$_POST[txt_14]','$_POST[txt_5]','$_POST[txt_7]','$_POST[txt_6]','$_POST[txt_17]','$_POST[txt_18]','$_POST[txt_15]','$_POST[txt_8]','$_POST[txt_16]','$_POST[spinner1]','$_POST[spinner2]','$_POST[spinner3]','$_POST[txt_19]','$_POST[txt_20]','default.png','$check','$fecha')";					
		}else{					
			$resp = img_64("img",$_POST['img'],'png',$id);					
			if($resp == "true"){
				$sql ="insert into empresa values ('$id','$_POST[txt_1]','$_POST[txt_12]','$_POST[txt_2]','$_POST[txt_13]','$_POST[txt_3]','$_POST[txt_4]','$_POST[txt_11]','$_POST[txt_14]','$_POST[txt_5]','$_POST[txt_7]','$_POST[txt_6]','$_POST[txt_17]','$_POST[txt_18]','$_POST[txt_15]','$_POST[txt_8]','$_POST[txt_16]','$_POST[spinner1]','$_POST[spinner2]','$_POST[spinner3]','$_POST[txt_19]','$_POST[txt_20]','".$id.".png','$check','$fecha')";					
			}
			else{
				$sql ="insert into empresa values ('$id','$_POST[txt_1]','$_POST[txt_12]','$_POST[txt_2]','$_POST[txt_13]','$_POST[txt_3]','$_POST[txt_4]','$_POST[txt_11]','$_POST[txt_14]','$_POST[txt_5]','$_POST[txt_7]','$_POST[txt_6]','$_POST[txt_17]','$_POST[txt_18]','$_POST[txt_15]','$_POST[txt_8]','$_POST[txt_16]','$_POST[spinner1]','$_POST[spinner2]','$_POST[spinner3]','$_POST[txt_19]','$_POST[txt_20]','default.png','$check','$fecha')";				
			}
		}	
		$guardar = guardarSql($conexion,$sql);
		$sql_nuevo = "select (id_empresa,ruc_empresa,nombre_empresa,propietario,slogan,telefono1,telefono2,ciudad,direccion,correo,fax,sitio_web,nombre_contador,autorizacion_sri,ascesor_legar,representante_legal,identificacion_repre,inicio_fac_preimpresa,item_factura,anio_contable,modo_costeo,comentario,imagen,estado,fecha_creacion) from empresa where id_empresa= '$id'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);
        auditoria_sistema($conexion,'empresa',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
		if( $guardar == 'true'){
			$data = 0; ////datos guardados
		}else{
			$data = 3; /// error al guardar
		}									
	}else{
		if (strpos($cadena, $buscar) ==  FALSE) {
			$sql ="update empresa set ruc_empresa='$_POST[txt_1]',nombre_empresa='$_POST[txt_12]',propietario='$_POST[txt_2]',slogan='$_POST[txt_13]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_4]',ciudad='$_POST[txt_11]',direccion='$_POST[txt_14]',correo='$_POST[txt_5]',fax='$_POST[txt_7]',sitio_web='$_POST[txt_6]',nombre_contador='$_POST[txt_17]',autorizacion_sri='$_POST[txt_18]',ascesor_legar='$_POST[txt_15]',representante_legal='$_POST[txt_8]',identificacion_repre='$_POST[txt_16]',inicio_fac_preimpresa='$_POST[spinner1]',item_factura='$_POST[spinner2]',anio_contable='$_POST[spinner3]',modo_costeo='$_POST[txt_19]',comentario='$_POST[txt_20]',imagen='default.png',estado='$check' where id_empresa='$_POST[txt_o]'";					
		}else{					
			$resp = img_64("img",$_POST['img'],'png',$id);					
			if($resp == "true"){
				$sql ="update empresa set ruc_empresa='$_POST[txt_1]',nombre_empresa='$_POST[txt_12]',propietario='$_POST[txt_2]',slogan='$_POST[txt_13]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_4]',ciudad='$_POST[txt_11]',direccion='$_POST[txt_14]',correo='$_POST[txt_5]',fax='$_POST[txt_7]',sitio_web='$_POST[txt_6]',nombre_contador='$_POST[txt_17]',autorizacion_sri='$_POST[txt_18]',ascesor_legar='$_POST[txt_15]',representante_legal='$_POST[txt_8]',identificacion_repre='$_POST[txt_16]',inicio_fac_preimpresa='$_POST[spinner1]',item_factura='$_POST[spinner2]',anio_contable='$_POST[spinner3]',modo_costeo='$_POST[txt_19]',comentario='$_POST[txt_20]',imagen='".$id.".png',estado='$check' where id_empresa='$_POST[txt_o]'";					
			}
			else{
				$sql ="update empresa set ruc_empresa='$_POST[txt_1]',nombre_empresa='$_POST[txt_12]',propietario='$_POST[txt_2]',slogan='$_POST[txt_13]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_4]',ciudad='$_POST[txt_11]',direccion='$_POST[txt_14]',correo='$_POST[txt_5]',fax='$_POST[txt_7]',sitio_web='$_POST[txt_6]',nombre_contador='$_POST[txt_17]',autorizacion_sri='$_POST[txt_18]',ascesor_legar='$_POST[txt_15]',representante_legal='$_POST[txt_8]',identificacion_repre='$_POST[txt_16]',inicio_fac_preimpresa='$_POST[spinner1]',item_factura='$_POST[spinner2]',anio_contable='$_POST[spinner3]',modo_costeo='$_POST[txt_19]',comentario='$_POST[txt_20]',imagen='default.png',estado='$check' where id_empresa='$_POST[txt_o]'";				
			}
		}	
		$sql_anterior = "select (id_empresa,ruc_empresa,nombre_empresa,propietario,slogan,telefono1,telefono2,ciudad,direccion,correo,fax,sitio_web,nombre_contador,autorizacion_sri,ascesor_legar,representante_legal,identificacion_repre,inicio_fac_preimpresa,item_factura,anio_contable,modo_costeo,comentario,imagen,estado,fecha_creacion) from empresa where id_empresa ='$_POST[txt_o]'";        
        $sql_anterior = sql_array($conexion,$sql_anterior);
		$guardar = guardarSql($conexion,$sql);
		$sql_nuevo = "select (id_empresa,ruc_empresa,nombre_empresa,propietario,slogan,telefono1,telefono2,ciudad,direccion,correo,fax,sitio_web,nombre_contador,autorizacion_sri,ascesor_legar,representante_legal,identificacion_repre,inicio_fac_preimpresa,item_factura,anio_contable,modo_costeo,comentario,imagen,estado,fecha_creacion) from empresa where id_empresa ='$_POST[txt_o]'";        
        $sql_nuevo = sql_array($conexion,$sql_nuevo);            
        auditoria_sistema($conexion,'empresa',$id_user,'Update',$_POST['txt_o'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
		if( $guardar == 'true'){
			$data = 0; ////datos guardados
		}else{
			$data = 3; /// error al guardar
		}	
	}	
	echo $data;
?>