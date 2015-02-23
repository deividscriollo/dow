<?php
    require('../../fpdf/fpdf.php');  
    include '../conexion.php';  
    include '../funciones_generales.php';  
    $conexion = conectarse();
    date_default_timezone_set('America/Guayaquil'); 
    session_start()   ;
    class PDF extends FPDF
    {   
        var $widths;
        var $aligns;
        function SetWidths($w){            
            $this->widths=$w;
        }                       
        function Header(){             
            $this->AddFont('Amble-Regular');
            $this->SetFont('Amble-Regular','',10);        
            $fecha = date('Y-m-d', time());
            $this->SetX(1);
            $this->SetY(1);
            $this->Cell(20, 5, $fecha, 0,0, 'C', 0);                         
            $this->Cell(150, 5, "CLIENTE", 0,1, 'R', 0);      
            $this->SetFont('Arial','B',16);        
            $sql = pg_query("select ruc_empresa,nombre_empresa,propietario,telefono1,telefono2,direccion,correo,sitio_web,autorizacion_sri,ascesor_legar,imagen from empresa where id_empresa = '".$_SESSION['empresa_dow']."'");
            while($row = pg_fetch_row($sql)){
                $this->Cell(190, 8, maxCaracter("EMPRESA: ".utf8_decode($row[1]),50), 0,1, 'C',0);                                
                $this->Image('../empresa/img/'.$row[10],0,8,52,40);
                $this->SetFont('Amble-Regular','',10);        
                $this->Cell(180, 5, maxCaracter("PROPIETARIO: ".utf8_decode($row[2]),50),0,1, 'C',0);                                
                $this->Cell(70, 5, maxCaracter("TEL.: ".utf8_decode($row[3]),50),0,0, 'R',0);                                
                $this->Cell(60, 5, maxCaracter("CEL.: ".utf8_decode($row[4]),50),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("DIR.: ".utf8_decode($row[5]),55),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("E-MAIL.: ".utf8_decode($row[6]),55),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("SITIO WER.: ".utf8_decode($row[7]),55),0,1, 'C',0);                                
                $this->Text(70,49,"OBLIGADO A LLEVAR CONTABILIDAD : SI",0,'C',0);                
                $this->Text(160, 30, maxCaracter("Nro Aut SRI.: ".utf8_decode($row[8]),55),0,1, 'C',0);                                
                $this->Text(150, 35, maxCaracter("Fecha Aut SRI.: ".utf8_decode($row[9]),55),0,1, 'C',0);                                
                $this->Text(168,40,"Clave de acceso",0,'C',0);
                $this->Image('../../empresa/barras.jpg',148,43,64,8);
            }            
            $this->SetDrawColor(0,0,0);
            $this->SetLineWidth(0.5);
            $this->Line(1,53,210,53);
            $this->Ln(16);
        }
        function Footer(){            
            $this->SetY(-15);            
            $this->SetFont('Arial','I',8);            
            $this->Cell(0,10,'Pag. '.$this->PageNo().'/{nb}',0,0,'C');
        }               
    }
    $pdf = new PDF('P','mm','a4');
    $pdf->AddPage();
    $pdf->SetMargins(0,0,0,0);
    $pdf->AliasNbPages();
    $pdf->AddFont('Amble-Regular');                
    $pdf->SetWidths(array(130,100));
    $pdf->SetFont('Amble-Regular','',10);   
    $tarifa0 = 0;
    $tarifa12 = 0;
    $iva = 0;
    $descuento = 0;
    $total = 0;
    $sql = "select nombres_completos,direccion,telefono1,telefono2,fecha_actual,identificacion,correo,fecha_actual,fecha_cancelacion,numero_serie,forma_pago,tarifa0,tarifa12,iva,descuento,total from cliente,factura_venta where cliente.id_cliente = factura_venta.id_cliente and id_factura_venta = '$_GET[id]'";
    $sql = sql($conexion,$sql);      
    while($row = pg_fetch_row($sql)){
        $pdf->SetX(5);
        $pdf->Cell(90, 5, maxCaracter("CLIENTE: ".utf8_decode($row[0]),44),0,1, 'L',0);                                        
        $pdf->SetFont('Amble-Regular','',14);   
        $pdf->Text(98,59,"NRO FACTURA:            ".$row[9],0,'C',0);
        $pdf->Text(98,59,"NRO FACTURA:            ".$row[9],0,'C',0);
        $pdf->SetFont('Amble-Regular','',10);           
        $pdf->SetX(5);        
        $pdf->Cell(70, 6, maxCaracter("RUC/CI: ".utf8_decode($row[5]),15),0,0, 'L',0);                                
        $pdf->Cell(70, 6, maxCaracter("F. EMISION: ".utf8_decode($row[7]),25),0,0, 'L',0);                                
        $pdf->Cell(63, 6, maxCaracter("F.CANCELACION: ".utf8_decode($row[8]),25),0,1, 'L',0);                                
        $pdf->SetX(5);
        $pdf->Cell(70, 6, maxCaracter("TEL.: ".utf8_decode($row[2]),15),0,0, 'L',0);                                
        $pdf->Cell(70, 6, maxCaracter("CEL.: ".utf8_decode($row[3]),25),0,0, 'L',0);                                
        $pdf->Cell(63, 6, maxCaracter("FORMA PAGO: ".utf8_decode($row[10]),25),0,1, 'L',0);                                
        $pdf->SetX(5);
        $pdf->Cell(113,6, maxCaracter("DIRECCION: ".utf8_decode($row[1]),62),0,0, 'L',0);                                
        $pdf->Cell(90, 6, maxCaracter("E-MAIL: ".utf8_decode($row[6]),50),0,1, 'L',0);                                                
        $tarifa0 = $row[11];
        $tarifa12 = $row[12];
        $iva = $row[13];
        $descuento = $row[14];
        $total = $row[15];
        $pdf->SetDrawColor(0,0,0);
        $pdf->SetLineWidth(0.5);
        $pdf->Line(1,78,210,78);
        $pdf->Ln(5);        
    }     
    $pdf->SetWidths(array(30,40,55,30,30,30));
    $pdf->SetFont('Arial','B',9);   
    $pdf->SetX(5);
    $sql = "select cantidad,codigo,descripcion,detalle_factura_venta.precio,descuento,total from detalle_factura_venta,productos where detalle_factura_venta.id_productos = productos.id_productos and detalle_factura_venta.id_factura_venta='$_GET[id]'";
    $sql = sql($conexion,$sql);      
    $pdf->Cell(20, 5, "CANTIDAD",1,0, 'C',0);
    $pdf->Cell(30, 5, "CODIGO",1,0, 'C',0);
    $pdf->Cell(84, 5, "DESCRIPCION",1,0, 'C',0);
    $pdf->Cell(20, 5, "P. VENTA",1,0, 'C',0);
    $pdf->Cell(28, 5, "DESCUENTO %",1,0, 'C',0);
    $pdf->Cell(20, 5, "TOTAL",1,1, 'C',0);    
    $pdf->SetFont('Amble-Regular','',9);   
    $pdf->SetX(5);
    while($row = pg_fetch_row($sql)){        
        $pdf->Cell(20, 5, maxCaracter(utf8_decode($row[0]),3),0,0, 'C',0);                                                
        $pdf->Cell(30, 5, maxCaracter(utf8_decode($row[1]),10),0,0, 'C',0);                                                        
        $pdf->Cell(84, 5, maxCaracter(utf8_decode($row[2]),50),0,0, 'C',0);                                                        
        $pdf->Cell(20, 5, maxCaracter(utf8_decode($row[3]),4),0,0, 'C',0);                                                        
        $pdf->Cell(28, 5, maxCaracter(utf8_decode($row[4]),4),0,0, 'C',0);                                                        
        $pdf->Cell(20, 5, maxCaracter(utf8_decode($row[5]),4),0,0, 'C',0);                                        
        $pdf->Ln(5);
        $pdf->SetX(5);                  
    }    
    $pdf->Ln(3);
    $pdf->SetX(1);       
    $pdf->Cell(210, 0, maxCaracter(utf8_decode(""),4),1,1, 'C',0);                                        
    $pdf->Ln(3);
    $pdf->SetFont('Amble-Regular','',10);   
    $pdf->Cell(70, 7, "",0,0, 'R',0);                                
    $pdf->Cell(100, 7, "",0,0, 'R',0);                                
    $pdf->Cell(60, 7, maxCaracter("TARIFA 0 : ".$tarifa0,50),0,1, 'L',0);                                
    $pdf->Cell(70, 7, "",0,0, 'R',0);                                
    $pdf->Cell(100, 7, "",0,0, 'R',0);                                
    $pdf->Cell(60, 7, maxCaracter("TARIFA 12 : ".$tarifa12,50),0,1, 'L',0);                                
    $pdf->Cell(70, 7, "",0,0, 'R',0);                                
    $pdf->Cell(100, 7, "",0,0, 'R',0);                                
    $pdf->Cell(60, 7, maxCaracter("IVA : ".$iva,50),0,1, 'L',0);                                
    $pdf->Cell(70, 7, "",0,0, 'R',0);                                
    $pdf->Cell(100, 7, "",0,0, 'R',0);                                
    $pdf->Cell(70, 7, maxCaracter("DESCUENTO : ".$descuento,50),0,1, 'L',0);                                
    $pdf->Cell(70, 7, "",0,0, 'R',0);                                
    $pdf->Cell(100, 7, "",0,0, 'R',0);                                
    $pdf->Cell(70, 7, maxCaracter("TOTAL : ".$total,50),0,1, 'L',0);                                                     
    $pdf->Output();
?>