<?php
	include '../conexion.php';
	$conexion = conectarse();
	$sql = "";
	$lista1 = array();
	$id_tabla = '';
	//verificar existencia de documentp
	if (isset($_POST['existencia'])) {
		$acus=1;
		$consulta = pg_query("SELECT ID_FACTURA_VENTA FROM FACTURA_VENTA FV, CLIENTE C WHERE C.ID_CLIENTE=FV.ID_CLIENTE AND IDENTIFICACION='$_POST[reg]'");
		while ($row = pg_fetch_row($consulta)) {
		    $acus=0;
		}
		print $acus;
	}
	//muestra resultados de un valor encontrado
	if (isset($_POST['cargar_tabla'])) {
		$consulta = pg_query("	SELECT ID_FACTURA_VENTA,C.nombres_completos,COMPROBANTE,FECHA_ACTUAL,NUMERO_SERIE,TOTAL,IDENTIFICACION
								FROM FACTURA_VENTA FV, CLIENTE C
								WHERE C.ID_CLIENTE=FV.ID_CLIENTE 
								AND IDENTIFICACION='$_POST[txt_1]'");
		$a=1;
		while ($row = pg_fetch_row($consulta)) {
			$ab=split(' ','');
			print'<tr>';
			print'<td>'.$a++.'</td>';
		    print'<td>'.$row[4].'</td>';
		    print'<td>'.$row[1].'</td>';
		    print'<td>'.$row[3].'</td>';
		    print'<td>'.$row[5].'</td>';
		    print'<td>'.'<a href="../reportes/factura_venta.php?id='.$row[0].'" TARGET="_new">
							<i class="ace-icon fa fa-print red2"></i>							
						</a>'.'</td>';
			print'</tr>';
		}
	}		
	
?>