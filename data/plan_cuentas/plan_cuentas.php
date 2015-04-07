<?php
	include '../conexion.php';
	include '../funciones_generales.php';				
	require_once '../../phpExcel/Classes/PHPExcel/IOFactory.php';
	$conexion = conectarse();
	date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
	$sql = "";		
	$id_user = sesion_activa();	
	$id = unique($fecha_larga);					
	if(isset($_GET['tipo']) == "s"){
		$ruta = './plan_cuentas/';
		$mensaje = '';		
		foreach ($_FILES as $key) {			
			if($key['error'] == UPLOAD_ERR_OK){
				$nombre_original = $key['name'];
				$temporal = $key['tmp_name'];
				$destino = $ruta.$nombre_original;
				$root = getcwd();
				//move_uploaded_file($file_tmp, $root.$file_destination)
				move_uploaded_file($temporal, $root.$destino);			
			}
			if($key['error'] == ''){
				$mensaje = 'Archivo '.$nombre_original.' subido correctamente';
				$data = 0;				
				//cargamos el archivo_excel que deseamos leer
				
				$objPHPExcel = PHPExcel_IOFactory::load('plan_cuentas/'.$nombre_original);				
				$objHoja=$objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
				$cont=0;				
				foreach ($objHoja as $iIndice=>$objCelda) {						
					if($cont >=1){		
						if($objCelda['A'] != ''){
							$id_cuentas = unique($fecha_larga);				
							$repetidos = repetidos($conexion,'codigo_cuenta',$objCelda['A'],'plan_cuentas','g','','');		
							if($repetidos == 'false'){
								$sql = "insert into plan_cuentas values ('$id_cuentas','".$objCelda['A']."','".$objCelda['B']."','".$objCelda['D']."','$fecha','".$objCelda['C']."')";						
								$guardar = guardarSql($conexion,$sql);
							}	
						}				
						
					}
					$cont++;					
				}
				$sql = "update plan_cuentas set estado = '0'";
				guardarSql($conexion,$sql);																
			}else{
				if($key['error'] != ''){
					$mensaje = 'No se puedo subir el archivo '.$nombre_original.' debido al siguiente error '.$key['error'];
					$data = 1;
				}
			}		
		}
	}else{
		if($_POST['tipo'] == "g"){
			$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['txt_1'],'plan_cuentas','g','','');		
			if($repetidos == 'true'){
				$data = 1; /// este dato ya existe;
			}else{					
				$sql = "insert into plan_cuentas values ('$id','".$_POST['txt_1']."','".ucwords($_POST['txt_2'])."','0','$fecha','".$_POST['codigo']."')";						
				$guardar = guardarSql($conexion,$sql);
				$sql_nuevo = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$id'";        
	        	$sql_nuevo = sql_array($conexion,$sql_nuevo);
	        	auditoria_sistema($conexion,'plan_cuentas',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
				if( $guardar == 'true'){
					$data = 0; ////datos guardados
				}else{
					$data = 2; /// error al guardar
				}			
			}
		}else{
			if($_POST['tipo'] == "m"){
				$repetidos = repetidos($conexion,'codigo_cuenta',$_POST['txt_1'],'plan_cuentas','m',$_POST['txt_0'],'id_plan');					
				if( $repetidos == 'true'){
					$data = 1; /// este dato ya existe;
				}else{	
					$sql = "update plan_cuentas set codigo_cuenta='".$_POST['txt_1']."',nombre_cuenta='".ucwords($_POST['txt_2'])."',estado='0',fecha='".$fecha."',tipo_cuenta='".$_POST['codigo']."' where id_plan= '".$_POST['txt_0']."'";																						
					$sql_anterior = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[txt_0]'";        
	        		$sql_anterior = sql_array($conexion,$sql_anterior);
					$guardar = guardarSql($conexion,$sql);
					$sql_nuevo = "select (id_plan,codigo_cuenta,nombre_cuenta,estado,fecha,tipo_cuenta) from plan_cuentas where id_plan = '$_POST[txt_0]'";        
	            	$sql_nuevo = sql_array($conexion,$sql_nuevo);            

	            	auditoria_sistema($conexion,'plan_cuentas',$id_user,'Update',$_POST['txt_0'],$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
					if( $guardar == 'true'){
						$data = 0; ////datos guardados
					}else{
						$data = 2; /// error al guardar
					}				
				}
			}
		}	
	}
	echo $data;
?>