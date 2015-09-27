<?php
    require('../../fpdf/fpdf.php');  
    include '../conexion.php';  
    include '../funciones_generales.php';  
    $conexion = conectarse();
    date_default_timezone_set('America/Guayaquil'); 
    session_start()   ;
    
    class PDF extends FPDF{   
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
                $this->Image('../empresa/img/'.$row[10],5,8,40,30);
                $this->SetFont('Amble-Regular','',10);        
                $this->Cell(180, 5, maxCaracter("PROPIETARIO: ".utf8_decode($row[2]),50),0,1, 'C',0);                                
                $this->Cell(70, 5, maxCaracter("TEL.: ".utf8_decode($row[3]),50),0,0, 'R',0);                                
                $this->Cell(60, 5, maxCaracter("CEL.: ".utf8_decode($row[4]),50),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("DIR.: ".utf8_decode($row[5]),55),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("E-MAIL.: ".utf8_decode($row[6]),55),0,1, 'C',0);                                
                $this->Cell(170, 5, maxCaracter("SITIO WEB.: ".utf8_decode($row[7]),55),0,1, 'C',0);                                                
                $this->Text(160, 30, maxCaracter("Nro Aut SRI.: ".utf8_decode($row[8]),55),0,1, 'C',0);                                
                $this->Text(150, 35, maxCaracter("Fecha Aut SRI.: ".utf8_decode($row[9]),55),0,1, 'C',0);
                $this->Text(70,44,"OBLIGADO A LLEVAR CONTABILIDAD : SI",0,'C',0);                
                $this->SetFont('Amble-Regular','U',14);        
                $this->Text(85,49,"KARDEX DE LA EMPRESA",0,'C',0);
                $this->Text(85,49,"KARDEX DE LA EMPRESA",0,'C',0);                                                                
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

    $debe = '';
    $haber = '';
    $f=split(' - ', $_GET['fecha']);
    
    $pdf->SetFont('Amble-Regular','',9);  
    $sql = pg_query("SELECT id_kardex,descripcion from kardex,productos where kardex.id_productos = productos.id_productos and productos.id_productos = '".$_GET['id']."'");
    while ($row = pg_fetch_row($sql)) {
        $id_kardex = $row[0];
        $nombre = $row[1];
    }
    $pdf->Cell(60, 5, "PRODUCTO",1,0, 'C',0);
    $pdf->Cell(144, 5, $nombre,1,1, 'C',0);    

    $pdf->SetFont('Amble-Regular','',8);  
    $pdf->SetX(5);
    $pdf->Cell(25, 5, "FECHA",1,0, 'C',0);
    $pdf->Cell(30, 5, "DETALLE",1,0, 'C',0);
    $pdf->Cell(17, 5, "C. ENTRADA",1,0, 'C',0);
    $pdf->Cell(18, 5, "V. ENTRADA",1,0, 'C',0);
    $pdf->Cell(18, 5, "T. ENTRADA",1,0, 'C',0);
    $pdf->Cell(16, 5, "C. SALIDA",1,0, 'C',0);
    $pdf->Cell(16, 5, "T. SALIDA",1,0, 'C',0);
    $pdf->Cell(16, 5, "V. SALIDA",1,0, 'C',0);
    $pdf->Cell(16, 5, "C. TOTAL",1,0, 'C',0);
    $pdf->Cell(16, 5, "V. TOTAL",1,0, 'C',0);
    $pdf->Cell(16, 5, "TOTAL",1,1, 'C',0);
    $sql = "select id_detalle_kardex,fecha,detalle,c_e,v_e,t_e,c_s,v_s,t_s,c_t,v_t,t_t from detalles_kardex where id_kardex = '".$id_kardex."' and fecha between '".$f[0].' 00:00:00'."' and '".$f[1].' 23:59:59'."' order by fecha asc";
    $sql = pg_query($sql);
    while ($row = pg_fetch_row($sql)) {
        $pdf->SetX(5);
        $pdf->Cell(25, 5, maxCaracter($row[1],11),1,0, 'C',0);
        $pdf->Cell(30, 5, maxCaracter($row[2],20),1,0, 'C',0);
        $pdf->Cell(17, 5, $row[3],1,0, 'C',0);
        $pdf->Cell(18, 5, $row[4],1,0, 'C',0);
        $pdf->Cell(18, 5, $row[5],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[6],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[7],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[8],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[9],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[10],1,0, 'C',0);
        $pdf->Cell(16, 5, $row[11],1,1, 'C',0);
    }
    
                                                   
    $pdf->Output();
?>  