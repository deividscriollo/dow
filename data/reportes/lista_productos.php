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
            $sql = pg_query("select ruc_empresa,nombre_empresa,propietario,telefono1,telefono2,direccion,correo,sitio_web,autorizacion_factura,autorizacion_factura,imagen from empresa where id_empresa = '".$_SESSION['empresa_dow']."'");
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
                $this->Text(160, 30, maxCaracter("Nro Aut SRI.: ".utf8_decode($row[8]),55),0,1, 'C',0);                                
                $this->Text(150, 35, maxCaracter("Fecha Aut SRI.: ".utf8_decode($row[9]),55),0,1, 'C',0);
                $this->Text(70,44,"OBLIGADO A LLEVAR CONTABILIDAD : SI",0,'C',0);                
                $this->SetFont('Amble-Regular','U',14);        
                $this->Text(75,49,"LISTA DE PRODUCTOS",0,'C',0);
                $this->Text(75,49,"LISTA DE PRODUCTOS",0,'C',0);                                                                
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
    $pdf->SetFont('Amble-Regular','',10);       
    $pdf->SetFont('Arial','B',9);   
    $pdf->SetX(5);
    $sql = "select codigo,descripcion,precio_minorista,precio_mayorista,stock,fecha_creacion from productos order by fecha_creacion asc";
    $sql = sql($conexion,$sql);          
    $pdf->Cell(35, 5, "CODIGO",1,0, 'C',0);
    $pdf->Cell(70, 5, "DESCRIPCION",1,0, 'C',0);
    $pdf->Cell(25, 5, "PRECIO MIN.",1,0, 'C',0);    
    $pdf->Cell(25, 5, "PRECIO MAY.",1,0, 'C',0);    
    $pdf->Cell(20, 5, "STOCK.",1,0, 'C',0);    
    $pdf->Cell(25, 5, utf8_decode("F. CREACIÓN"),1,1, 'C',0);    

    $pdf->SetFont('Amble-Regular','',9);   
    $pdf->SetX(5);
    $promedio = 0;
    while($row = pg_fetch_row($sql)){        
        $promedio = $row[3] / $row[2];
        $pdf->Cell(35, 5, maxCaracter(utf8_decode($row[0]),10),0,0, 'C',0);
        $pdf->Cell(70, 5, maxCaracter(utf8_decode($row[1]),35),0,0, 'L',0);
        $pdf->Cell(25, 5, maxCaracter(utf8_decode($row[2]),10),0,0, 'C',0);        
        $pdf->Cell(25, 5, maxCaracter(utf8_decode($row[3]),10),0,0, 'C',0);                         
        $pdf->Cell(20, 5, maxCaracter(utf8_decode($row[4]),10),0,0, 'C',0); 
        $pdf->Cell(25, 5, maxCaracter(utf8_decode($row[5]),10),0,0, 'C',0); 
        $pdf->Ln(5);
        $pdf->SetX(5);                  
    }    
                                                     
    $pdf->Output();
?>