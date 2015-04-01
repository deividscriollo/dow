<?php 
function validando_xml($id,$fecha, $total,$detalle,$cliente,$ruc_ced,$tot_sin_impuestos,$descuento,$iva,$diferencia,$telefono,$factura_num,$direccion_cliente,$orden_numero){
	$xml='	<?xml version="1.0" encoding="UTF-8"?>'.
			'<factura id="comprobante" version="1.0.0">'.
			'<infoTributaria>'
                .'<ambiente>2</ambiente>'
                .'<tipoEmision>1</tipoEmision>'
                .'<razonSocial>EMRESA TOTORA SISA Scc</razonSocial>'
                .'<nombreComercial>TOTORA SISA</nombreComercial>'
                .'<ruc>1791256115001</ruc>'
                .'<claveAcceso>0802201501179125611500120013270130149142658602812</claveAcceso>'
                .'<codDoc>01</codDoc>'
                .'<estab>001</estab>'
                .'<ptoEmi>327</ptoEmi>'
                .'<secuencial>013014914</secuencial>'
                .'<dirMatriz>San Rafael de la Laguna calle Bolívar y Imbakucha Parque Central, Otavalo,IMBABURA,ECUADOR</dirMatriz>'.
            '</infoTributaria>'
            .'<infoFactura>'
                .'<fechaEmision>'.$fecha.'</fechaEmision>'
                .'<dirEstablecimiento>San Rafael de la Laguna calle Bolívar y Imbakucha Parque Central, Otavalo,IMBABURA,ECUADOR</dirEstablecimiento>'
                .'<contribuyenteEspecial>5368</contribuyenteEspecial>'
                    .'<tipoIdentificacionComprador>05</tipoIdentificacionComprador>'
                    .'<razonSocialComprador>'.$cliente.'</razonSocialComprador>'
                    .'<identificacionComprador>'.$ruc_ced.'</identificacionComprador>'
                    .'<totalSinImpuestos>'.$tot_sin_impuestos.'</totalSinImpuestos>'
                    .'<totalDescuento>'.$descuento.'</totalDescuento>'
                    .'<totalConImpuestos>'
                        .'<totalImpuesto>'
                            .'<codigo>2</codigo>'
                            .'<codigoPorcentaje>2</codigoPorcentaje>'
                            .'<baseImponible>'.$total.'</baseImponible>'
                            .'<tarifa>'.$iva.'</tarifa>'
                            .'<valor>'.$diferencia.'</valor>'
                        .'</totalImpuesto>'
                    .'</totalConImpuestos>'
                    .'<propina>0.00</propina>'
                    .'<importeTotal>'.$total.'</importeTotal>'
                    .'<moneda>DOLAR</moneda>'
            .'</infoFactura>'
            .'<detalles>'.$detalle.'</detalle>'
            .'<infoAdicional>'
                .'<campoAdicional nombre="Teléfono">'.$telefono.'</campoAdicional>'
                .'<campoAdicional nombre="Página web">https://empresatotorasisa.wordpress.com</campoAdicional>'
                .'<campoAdicional nombre="rucFirmante">1791256115001</campoAdicional>'
                .'<campoAdicional nombre="Factura">'.$factura_num.'</campoAdicional>'
                .'<campoAdicional nombre="account">26586028</campoAdicional>'
                .'<campoAdicional nombre="DireccionComprador">'.$direccion_cliente.'</campoAdicional>'
                .'<campoAdicional nombre="NoOrdenFactura">'.$orden_numero.'</campoAdicional>'
            .'</infoAdicional>'
		.'</factura>';
		$acu=str_replace('</', '&lt', $xml);
		$acu1=str_replace('<', '&lt;', $acu);
		$xml=str_replace('>', '&gt;', $acu1);
	$dom = new DomDocument('1.0', 'UTF-8');
    //add root
    $root = $dom->appendChild($dom->createElement('autorizacion'));
    //add NodeA element to Root
    $nodeA = $dom->createElement('estado','AUTORIZADO');
    $nodeB = $dom->createElement('numeroAutorizacion','0902201514132517912561150012784234238');
    $nodeC = $dom->createElement('fechaAutorizacion',$fecha);
    $nodeD = $dom->createElement('ambiente','PRODUCCIÓN_DESARROLLO');
    $nodeE = $dom->createElement('comprobante',$xml);
    $root->appendChild($nodeA);
    $root->appendChild($nodeB);
    $root->appendChild($nodeC);
    $root->appendChild($nodeD);
    $root->appendChild($nodeE);

    $dom->formatOutput = true; // set the formatOutput attribute of domDocument to true
    // save XML as string or file 
    $test1 = $dom->saveXML(); // put string in test1
    $nom_archivo='xml/FAC_ELECTRONICA'.$id.'.xml';
    $dom->save($nom_archivo); // save as file


    $zip = new ZipArchive();	
	$filename = "zip_rar/factura_electronica".$id.".zip";
	if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
	   exit("cannot open <$filename>\n");
	}
	$nom_arch='FAC_ELE'.$id.'.xml';
	$zip->addFromString($nom_arch . time(), "#1 Esto es una cadena de prueba añadida como  testfilephp.txt.\n");	
	$zip->close();
}
//validando_xml('id','fecha','total','detalle','cliente','ruc_ced','total_sin inpuestos','descuento','iva','diferencia','telefono','num_factu','dir-client','orden_num');

 ?>
