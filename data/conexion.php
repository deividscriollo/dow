<?php
    function conectarse()
    {
    	$conexion = null;
        try
        {                             
        //$conexion = pg_connect("dbname=d86o5s4qdr70q host=ec2-54-204-45-65.compute-1.amazonaws.com port=5432 user=fwkwtrxrolimqv password=ls6ch0wvoqfAMD_ltJCmy7rMOl sslmode=require");
        $conexion = pg_connect("host=localhost dbname=aplicacion_dow port=5432 user=postgres password=rootdow");
         if( $conexion == false )
                 throw new Exception( "Error PostgreSQL ".pg_last_error() );         
        }
        catch( Exception $e )
        {
          throw $e;
        }
        return $conexion;
    }
?>