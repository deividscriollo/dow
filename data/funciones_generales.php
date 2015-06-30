<?php
date_default_timezone_set('America/Guayaquil'); 
$fecha = date('Y-m-d H:i:s', time());   
$fecha_larga = date('His', time());
function sesion_activa(){
    session_start();        
    return $_SESSION['iddow'];
}
function img_64($destino,$img_64,$extension,$nombre){
    define('UPLOAD_DIR', $destino.'/');    
    $img_64 = str_replace('data:image/png;base64,', '', $img_64);        
    $img_64 = str_replace(' ', '+', $img_64);
    $data_img = base64_decode($img_64);
    $file = UPLOAD_DIR . $nombre . '.'.$extension;
    if($success = file_put_contents($file, $data_img)){
        return "true";
    }else{
        return "false";
    }
}
function cargarSelect($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
        }
        echo $lista = json_encode($lista);
    }
}
function cargarSelect_1_1($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1]. " - " .$row[2];
        }
        echo $lista = json_encode($lista);
    }
}
function cargarSelect_1($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
            $lista[] = $row[2];
        }
        echo $lista = json_encode($lista);
    }
}



function cargarSelect_6($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
            $lista[] = $row[2];
            $lista[] = $row[3];
            $lista[] = $row[4];
            $lista[] = $row[5];
        }
        echo $lista = json_encode($lista);
    }
}
function carga_tabla_7($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
            $lista[] = $row[2];
            $lista[] = $row[3];
            $lista[] = $row[4];
            $lista[] = $row[5];
            $lista[] = $row[6];
        }
        echo $lista = json_encode($lista);
    }
}

function cargarSelect_8($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
            $lista[] = $row[2];
            $lista[] = $row[3];
            $lista[] = $row[4];
            $lista[] = $row[5];
            $lista[] = $row[6];
            $lista[] = $row[7];
        }
        echo $lista = json_encode($lista);
    }
}

function cargarSelect_10($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[] = $row[0];
            $lista[] = $row[1];
            $lista[] = $row[2];
            $lista[] = $row[3];
            $lista[] = $row[4];
            $lista[] = $row[5];
            $lista[] = $row[6];
            $lista[] = $row[7];
            $lista[] = $row[8];
            $lista[] = $row[9]; 
        }
        echo $lista = json_encode($lista);
    }
}

function unique($fecha_larga) {
    $id = uniqid();
    $id = $fecha_larga . $id;
    return $id;    
}
//echo unique($fecha_larga) ;
function guardarSql($conexion, $sql) {
    $resp = true;    
    if (pg_query($conexion, $sql)) {
        $resp = 'true';
    } else {
        $resp = 'false';
    }
    return $resp;
}

function id($conexion, $sql) { //retorna el id de una consulta con solo un parametro de retorno en el sql
    $id = 0;
    $sql = pg_query($conexion, $sql);
    while ($row = pg_fetch_row($sql)) {
        $id = $row[0];
    }
    echo $id;
}
function id_unique($conexion, $sql) { //retorna el id de una consulta con solo un parametro de retorno en el sql
    $id = 0;
    $sql = pg_query($conexion, $sql);
    while ($row = pg_fetch_row($sql)) {
        $id = $row[0];
    }
    return $id;
}

function repetidos($conexion, $campo, $valor, $tabla, $tipo, $id, $id_campo) {///conexion,campo a comparar,valor campo,tabla,tipo g o m id si tiene, id campo si tiene
    $repetidos = 'true';
    if ($tipo == "g") {
        $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "'";
        if (pg_num_rows(pg_query($conexion, $sql))) {
            $repetidos = 'true';
        } else {
            $repetidos = 'false';
        }
    } else {
        if ($tipo == "m") {
            $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "' and " . $id_campo . " not in ('$id') ";
            if (pg_num_rows(pg_query($conexion, $sql))) {
                $repetidos = 'true';
            } else {
                $repetidos = 'false';
            }
        } else {
            if ($tipo == "gr") {
                $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "' and codigo_barras != ''";
                if (pg_num_rows(pg_query($conexion, $sql))) {
                    $repetidos = 'true';
                } else {
                    $repetidos = 'false';
                }
            }else{
                if ($tipo == "mr") {
                    $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "' and codigo_barras != '' and " . $id_campo . " not in ('$id') " ;
                    
                    if (pg_num_rows(pg_query($conexion, $sql))) {
                        $repetidos = 'true';
                    } else {
                        $repetidos = 'false';
                    }
                }
            }    
        }
    }
    return $repetidos;
}

function repetidos_1($conexion, $campo, $valor, $tabla, $tipo, $id, $id_campo ,$extra_campo,$extra_campo_1) {///conexion,campo a comparar,valor campo,tabla,tipo g o m id si tiene, id campo si tiene
    $repetidos = 'true';
    if ($tipo == "g") {
        $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "' and " . $extra_campo . " = '" .$extra_campo_1. "'";        
        if (pg_num_rows(pg_query($conexion, $sql))) {
            $repetidos = 'true';
        } else {
            $repetidos = 'false';
        }
    } else {
        if ($tipo == "m") {
            $sql = "select " . $campo . " from " . $tabla . " where " . $campo . " = '" . $valor . "' and " . $extra_campo . " = '" .$extra_campo_1. "'  and " . $id_campo . " not in ('$id') ";            
            if (pg_num_rows(pg_query($conexion, $sql))) {
                $repetidos = 'true';
            } else {
                $repetidos = 'false';
            }
        } else {
            
        }
    }
    return $repetidos;
}

function atras_adelente($conexion,$sql){     
    $sql = pg_query($sql);
    $sql = pg_fetch_row($sql);
    return $sql;
}

function buscar_nombres($conexion, $sql) {
    $lista = array();
    $data = 0;
    $sql = pg_query($conexion, $sql);
    if ($sql) {
        while ($row = pg_fetch_row($sql)) {
            $lista[]=$row[0];
            $lista[]=$row[1];
            $lista[]=$row[2];
            $lista[]=$row[3];
        }
        echo $lista = json_encode($lista);
    }
}
function fecha_total(){    
    
    date_default_timezone_set('America/Guayaquil');
    $fecha=date('Y-m-d H:i:s', time()); 
    $fecha_larga = date('His', time()); 
    return $valor=uniqid('');
}
function sql ($conexion,$sql){
    $sql = pg_query($conexion,$sql);
    return $sql;
}
function maxCaracter($texto, $cant){        
    $texto = substr($texto, 0,$cant);
    return $texto;
}
function carga_json($conexion,$sql){     
    $sql = pg_query($sql);                
    return $sql;
}       
function carga_json_1($conexion,$sql){     
    $sql = pg_query($sql);                
    $sql = pg_fetch_row($sql);
    return $sql;
}       
function sql_array($conexion,$sql){            
    $sql = pg_fetch_row(pg_query($sql));                                 
    $sql = "array['".implode("', '", $sql)."']";   
    return $sql;     
}
function auditoria_sistema($conexion,$tabla,$id_user,$proceso,$id_registro,$fecha_larga,$fecha,$sql_nuevo,$sql_anterior){
    $cliente = $_SERVER['REMOTE_ADDR'];
    $server = $_SERVER['SERVER_ADDR'];
    $id = unique($fecha_larga);    
    if($proceso == 'Insert'){                
        $consulta = "insert into auditoria values ('$id','$tabla','$id_registro',array[''],$sql_nuevo::text[],'$proceso','$id_user','$cliente','$server','0','$fecha')";                       
        pg_query($consulta);               
    }else{
        if($proceso == 'Update'){        
            $consulta = "insert into auditoria values ('$id','$tabla','$id_registro',$sql_anterior::text[],$sql_nuevo::text[],'$proceso','$id_user','$cliente','$server','0','$fecha')";                       
            pg_query($consulta);       
        }else{            
            if($proceso == 'Backup'){        
            }               
        }
    }
}

?>