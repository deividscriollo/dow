<?php 
	include '../conexion.php';
	include '../funciones_generales.php';		
	$conexion = conectarse();
	$lista = array();
	$colores = array();	
	$colores[0] = "#68BC31";
	$colores[1] = "#2091CF";
	$colores[2] = "#AF4E96";
	$colores[3] = "#DA5430";
	$colores[4] = "#FEE074";
	if($_GET["fun"] == 1){
		$sql = "select descripcion as label,sum(cantidad::int) as data  from productos,detalle_factura_venta where productos.id_productos = detalle_factura_venta.id_productos  group by descripcion limit 5";
		$sql=carga_json($conexion,$sql); 		
		$cont = 0;
		while($row = pg_fetch_row($sql)) {		
			$lista['label'] = $row[0];
	        $lista['data'] = intval($row[1]);
	        $lista['color'] = $colores[$cont];
	        $data[] = $lista;
	        $cont++;
		}
		$data = (json_encode($data));
	}else{
		if($_GET["fun"] == 2){
			$sql = "select nombres_completos as label, sum(cantidad::int) as data from productos,detalle_factura_venta,factura_venta,cliente where productos.id_productos = detalle_factura_venta.id_productos and factura_venta.id_factura_venta = detalle_factura_venta.id_factura_venta and factura_venta.id_cliente = cliente.id_cliente group by nombres_completos limit 5";
			$sql=carga_json($conexion,$sql); 		
			$cont = 0;
			while($row = pg_fetch_row($sql)) {		
				$lista['label'] = $row[0];
		        $lista['data'] = intval($row[1]);
		        $lista['color'] = $colores[$cont];
		        $data[] = $lista;
		        $cont++;
			}
			$data = (json_encode($data));
		}
	}
	
	echo $data;
	
	

?>