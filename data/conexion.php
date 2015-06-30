<?php
    function conectarse() {
    	$conexion = null;
        try {                             
<<<<<<< HEAD
        //$conexion = pg_connect("dbname=d9v66gpljua1u9 host=ec2-54-163-227-94.compute-1.amazonaws.com port=5432 user=oygpguxkmdceak password=8f_RosNXtAkzfyLUyOsSuilKbN sslmode=require");
=======
        // $conexion = pg_connect("dbname=d9v66gpljua1u9 host=ec2-54-163-227-94.compute-1.amazonaws.com port=5432 user=oygpguxkmdceak password=8f_RosNXtAkzfyLUyOsSuilKbN sslmode=require");
>>>>>>> 8693bd0cb2b782882ac7b2640431c595055f85c7
        $conexion = pg_connect("host=localhost dbname=aplicacion_dow port=5432 user=postgres password=rootdow");
         if( $conexion == false )
            throw new Exception( "Error PostgreSQL ".pg_last_error() );         
        } catch( Exception $e )
        {
          throw $e;
        }
        return $conexion;
    }
?>