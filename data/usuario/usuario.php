<?php
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();	
    date_default_timezone_set('America/Guayaquil');
    $nivel_1_admin =  array(1,1,1,1);
	$nivel_2_admin =  array(1,1,1,1,1,1,1,1,1,1,1,1);
	$nivel_3_admin =  array(1,1,1,1,1,1,1,1);
	$nivel_1_otros =  array(1,1,1,1);
	$nivel_2_otros =  array(1,1,1,1,1,1,1,1,1,1,1,1);
	$nivel_3_otros =  array(1,1,1,1,1,1,1,1);
	$fecha = date('Y-m-d H:i:s', time());
	$fecha_larga = date('His', time());
	$sql = "";	
	$id = unique($fecha_larga);	
	$id_c = unique($fecha_larga);
	$id_p = unique($fecha_larga);	
	$id_user = sesion_activa();	
	$check = "OFF";	
	if(isset($_POST["form-field-checkbox"]))
		$check = "ON";	
	$cadena = " ".$_POST['img'];	
	$buscar = 'data:image/png;base64,';		
	if($_POST['tipo'] == "g"){
		$repetidos = repetidos($conexion,"usuario",strtoupper($_POST["txt_13"]),"usuario","g","","");	
		if( $repetidos == 'true'){
			$data = 1; /// este usuario ya existe;
		}else{		
			$repetidos = repetidos($conexion,"identificacion",strtoupper($_POST["txt_1"]),"usuario","g","","");		
			if( $repetidos == 'true'){
				$data = 2; /// este nro de cedula ya existe;
			}else{						
				if (strpos($cadena, $buscar) ==  FALSE) {
					$sql ="insert into usuario values ('$id','$_POST[txt_1]','$_POST[txt_2]','$_POST[txt_3]','$_POST[txt_7]','$_POST[txt_11]','$_POST[txt_12]','$_POST[txt_8]','$_POST[txt_13]','$_POST[txt_4]','0','default.png','$check','$fecha')";					
				}else{					
					$resp = img_64("img",$_POST['img'],'png',$id);					
					if($resp == "true"){
						$sql ="insert into usuario values ('$id','$_POST[txt_1]','$_POST[txt_2]','$_POST[txt_3]','$_POST[txt_7]','$_POST[txt_11]','$_POST[txt_12]','$_POST[txt_8]','$_POST[txt_13]','$_POST[txt_4]','0','".$id.".png','$check','$fecha')";						
					}
					else{
						$sql ="insert into usuario values ('$id','$_POST[txt_1]','$_POST[txt_2]','$_POST[txt_3]','$_POST[txt_7]','$_POST[txt_11]','$_POST[txt_12]','$_POST[txt_8]','$_POST[txt_13]','$_POST[txt_4]','0','default.png','$check','$fecha')";					
					}
				}					
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_usuario,identificacion,nombres_completos,telefono1,telefono2,id_ciudad,direccion,correo,usuario,id_cargo,estado,imagen,extranjero,fecha_creacion) from usuario where id_usuario ='$id'";        
        		$sql_nuevo = sql_array($conexion,$sql_nuevo);
        		auditoria_sistema($conexion,'usuario',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
				/**/
				if($_POST['txt_4'] == '1'){
					$nivel_1_admin = "array['".implode("', '", $nivel_1_admin)."']";
					$nivel_2_admin = "array['".implode("', '", $nivel_2_admin)."']";
					$nivel_3_admin = "array['".implode("', '", $nivel_3_admin)."']";	
					$sql ="insert into permisos values ('$id_p',".$nivel_1_admin."::INT[],".$nivel_2_admin."::INT[],".$nivel_3_admin."::INT[],'$id')";						
				}else{
					$nivel_1_otros = "array['".implode("', '", $nivel_1_otros)."']";
					$nivel_2_otros = "array['".implode("', '", $nivel_2_otros)."']";
					$nivel_3_otros = "array['".implode("', '", $nivel_3_otros)."']";	
					$sql ="insert into permisos values ('$id_p',".$nivel_1_otros."::INT[],".$nivel_2_otros."::INT[],".$nivel_3_otros."::INT[],'$id')";						
				}							
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_permisos,nivel1,nivel2,nivel3,id_usuario) from permisos where id_permisos = '$id_p'";        
        		$sql_nuevo = sql_array($conexion,$sql_nuevo);
        		auditoria_sistema($conexion,'permisos',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
				/**/

				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 3; /// error al guardar
				}
				$sql = "insert into claves values ('$id_c','$id','$_POST[txt_5]')";
				$guardar = guardarSql($conexion,$sql);
				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 3; /// error al guardar
				}
			}	
		}
	}else{
		if($_POST['tipo'] == "m"){
			$repetidos = repetidos($conexion,"usuario",strtoupper($_POST["txt_13"]),"usuario","m",$_POST['txt_o'],"id_usuario");		
			if( $repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{		
				if (strpos($cadena, $buscar) ==  FALSE) {
					$sql ="update usuario set identificacion='$_POST[txt_1]',nombres_completos='$_POST[txt_2]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_7]',id_ciudad='$_POST[txt_11]',direccion='$_POST[txt_12]',correo='$_POST[txt_8]',usuario='$_POST[txt_13]',id_cargo='$_POST[txt_4]',extranjero='$check' where id_usuario = '$_POST[txt_o]'";					

				}else{	
					$resp = img_64("img",$_POST['img'],'png',$_POST['txt_o']);														
					if($resp == "true"){												
						$sql ="update usuario set identificacion='$_POST[txt_1]',nombres_completos='$_POST[txt_2]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_7]',id_ciudad='$_POST[txt_11]',direccion='$_POST[txt_12]',correo='$_POST[txt_8]',usuario='$_POST[txt_13]',id_cargo='$_POST[txt_4]',imagen='".$_POST['txt_o'].".png',extranjero='$check' where id_usuario = '$_POST[txt_o]'";					
					}
					else{						
						$sql ="update usuario set identificacion='$_POST[txt_1]',nombres_completos='$_POST[txt_2]',telefono1='$_POST[txt_3]',telefono2='$_POST[txt_7]',id_ciudad='$_POST[txt_11]',direccion='$_POST[txt_12]',correo='$_POST[txt_8]',usuario='$_POST[txt_13]',id_cargo='$_POST[txt_4]',extranjero='$check' where id_usuario = '$_POST[txt_o]'";					
					}
				}	
				$guardar = guardarSql($conexion,$sql);
				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 2; /// error al guardar
				}				
				$sql = "update claves set id_usuario='$_POST[txt_o]',clave='$_POST[txt_5]' where id_usuario = '$_POST[txt_o]'";
				$sql_anterior = "select (id_usuario,identificacion,nombres_completos,telefono1,telefono2,id_ciudad,direccion,correo,usuario,id_cargo,estado,imagen,extranjero,fecha_creacion) from usuario where id_usuario ='$_POST[txt_o]'";        
        		$sql_anterior = sql_array($conexion,$sql_anterior);
				guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_usuario,identificacion,nombres_completos,telefono1,telefono2,id_ciudad,direccion,correo,usuario,id_cargo,estado,imagen,extranjero,fecha_creacion) from usuario where id_usuario ='$_POST[txt_o]'";        
            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            
            	auditoria_sistema($conexion,'usuario',$id_user,'Update',$_POST['txt_o'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
			}
		}
	}	
	echo $data;
?>