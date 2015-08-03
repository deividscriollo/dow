<?php
    include '../conexion.php';
    include '../funciones_generales.php';       
    $conexion = conectarse();
    date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
    $sql = "";      
    $id_user = sesion_activa(); 
    $id = unique($fecha_larga);             
    ///////////////////////

    if($_POST['tipo'] == "g"){
        $repetidos = repetidos($conexion, "codigo_anexo", strtoupper($_POST['txt_1']), "retenciones", "g", "", "");
        if ($repetidos == 'true') {
            $data = "1"; /// este codigo ya existe;
        } else {            
            $sql = "insert into retenciones values ('".$id."','". strtoupper($_POST['txt_1']) ."','". strtoupper($_POST['txt_2']) ."','". strtoupper($_POST['txt_3']) ."','". strtoupper($_POST['txt_5']) ."','". $_POST['txt_00'] ."','1','".$fecha."')";            
            $guardar = guardarSql($conexion, $sql);
            if( $guardar == 'true'){
                $data = '0'; ////datos guardados
                $sql_nuevo = "SELECT (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion)  FROM retenciones where id_retencion = '".$id."'";        
                $sql_nuevo = sql_array($conexion,$sql_nuevo);
                auditoria_sistema($conexion,'retenciones',$id_user,'Insert',$id,$fecha_larga,$fecha,$sql_nuevo,'');
                /////////////////////detalles retenciones////////////                                    
            }else{
                $data = '3'; /// error al guardar
            }                   
            $data = '0';///correcto         
        }        
    }else{
        if($_POST['tipo'] == "m"){
            $repetidos = repetidos($conexion, "codigo_anexo", strtoupper($_POST['txt_1']), "retenciones", "m", $_POST['txt_0'], "id_retencion");   
            if ($repetidos == 'true') {
                $data = "1"; /// este codigo ya existe;
            } else {                
                $sql = "update retenciones set codigo_anexo = '". strtoupper($_POST['txt_1']) ."',formulario_103 = '". strtoupper($_POST['txt_2']) ."',porcentaje = '". strtoupper($_POST['txt_3']) ."',descripcion = '". strtoupper($_POST['txt_5']) ."',id_plan = '". $_POST['txt_00'] ."',estado = '1',fecha_creacion = '".$fecha."' where id_retencion = '".$_POST['txt_0']."'";                
                $sql_nuevo = "SELECT (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion)  FROM retenciones where id_retencion = '".$_POST['txt_0']."'";        
                $sql_nuevo = sql_array($conexion,$sql_nuevo);
                $guardar = guardarSql($conexion, $sql);
                if( $guardar == 'true'){
                    $data = '0'; ////datos guardados
                    $sql_anterior = "SELECT (id_retencion,codigo_anexo,formulario_103,porcentaje,descripcion,id_plan,estado,fecha_creacion) FROM retenciones where id_retencion = '".$_POST['txt_0']."'";
                    $sql_anterior = sql_array($conexion,$sql_anterior); 
                    auditoria_sistema($conexion,'retenciones',$id_user,'Update',$id,$fecha_larga,$fecha,$sql_nuevo,$sql_anterior);
                    /////////////////////detalles retenciones////////////                    
                }else{
                    $data = '3'; /// error al guardar
                }                   
                $data = '0';///correcto                         
            }   
        }
    }   
    echo $data;
    
?>