<?php
    function conectarse()
    {
    	$conexion = null;
        try
        {                             
       // $conexion = pg_connect("dbname=ddr8bislb4p21h host=ec2-54-225-243-113.compute-1.amazonaws.com port=5432 user=hmadfgkigcyfly password=tx24DCRCiJBKcMpEUtJjqJ0VnD sslmode=require");
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