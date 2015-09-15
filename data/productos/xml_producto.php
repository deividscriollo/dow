<?php

include '../conexion.php';
$conexion = conectarse();
$page = $_GET['page'];
$limit = $_GET['rows'];
$sidx = $_GET['sidx'];
$sord = $_GET['sord'];
$search = $_GET['_search'];


if (!$sidx)
    $sidx = 1;
$result = pg_query("SELECT COUNT(*) AS count from productos");
$row = pg_fetch_row($result);
$count = $row[0];
if ($count > 0 && $limit > 0) {
    $total_pages = ceil($count / $limit);
} else {
    $total_pages = 0;
}
if ($page > $total_pages)
    $page = $total_pages;
$start = $limit * $page - $limit;
if ($start < 0)
    $start = 0;
if ($search == 'false') {
    $SQL = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,unidades_medida.id_unidad,unidades_medida.cantidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,productos.estado,productos.fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento,id_plan_cuentas from productos,unidades_medida where unidades_medida.id_unidad = productos.id_unidad ORDER BY  $sidx $sord offset $start limit $limit";
} else {
    $campo = $_GET['searchField'];
  
    if ($_GET['searchOper'] == 'eq') {
        $SQL = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,unidades_medida.id_unidad,unidades_medida.cantidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,productos.estado,productos.fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento,id_plan_cuentas from productos,unidades_medida where unidades_medida.id_unidad = productos.id_unidad and $campo = '$_GET[searchString]' ORDER BY $sidx $sord offset $start limit $limit";
    }         
    if ($_GET['searchOper'] == 'cn') {
        $SQL = "select id_productos,codigo,codigo_barras,productos.descripcion,precio,utilidad_minorista,utilidad_mayorista,precio_minorista,precio_mayorista,id_tipo,stock,id_categoria,id_marca,id_bodega,unidades_medida.id_unidad,unidades_medida.cantidad,facturar_existencia,cantidad_minima,cantidad_maxima,id_series_venta,expiracion,comentario,imagen,productos.estado,productos.fecha_creacion,id_porcentaje_iva,id_usuario,incluye_iva,descuento,id_plan_cuentas from productos,unidades_medida where unidades_medida.id_unidad = productos.id_unidad and $campo like '%$_GET[searchString]%' ORDER BY $sidx $sord offset $start limit $limit";
    }
  
}
$result = pg_query($SQL);
header("Content-type: text/xml;charset=utf-8");
$s = "<?xml version='1.0' encoding='utf-8'?>";
$s .= "<rows>";
$s .= "<page>" . $page . "</page>";
$s .= "<total>" . $total_pages . "</total>";
$s .= "<records>" . $count . "</records>";
while ($row = pg_fetch_row($result)) {
    $s .= "<row id='" . $row[0] . "'>";
    $s .= "<cell>" . $row[0] . "</cell>";
    $s .= "<cell>" . $row[1] . "</cell>";
    $s .= "<cell>" . $row[2] . "</cell>";
    $s .= "<cell>" . $row[3] . "</cell>";
    $s .= "<cell>" . $row[4] . "</cell>";
    $s .= "<cell>" . $row[5] . "</cell>";
    $s .= "<cell>" . $row[6] . "</cell>";
    $s .= "<cell>" . $row[7] . "</cell>";
    $s .= "<cell>" . $row[8] . "</cell>";
    $s .= "<cell>" . $row[9] . "</cell>";
    $s .= "<cell>" . $row[10] . "</cell>";
    $s .= "<cell>" . $row[11] . "</cell>";
    $s .= "<cell>" . $row[12] . "</cell>";
    $s .= "<cell>" . $row[13] . "</cell>";
    $s .= "<cell>" . $row[14] . "</cell>";
    $s .= "<cell>" . $row[15] . "</cell>";
    $s .= "<cell>" . $row[16] . "</cell>";
    $s .= "<cell>" . $row[17] . "</cell>";
    $s .= "<cell>" . $row[18] . "</cell>";
    $s .= "<cell>" . $row[19] . "</cell>";
    $s .= "<cell>" . $row[20] . "</cell>";
    $s .= "<cell>" . $row[21] . "</cell>";
    $s .= "<cell>" . $row[22] . "</cell>";
    $s .= "<cell>" . $row[23] . "</cell>";
    $s .= "<cell>" . $row[24] . "</cell>";
    $s .= "<cell>" . $row[25] . "</cell>";
    $s .= "<cell>" . $row[26] . "</cell>";
    $s .= "<cell>" . $row[27] . "</cell>";
    $s .= "<cell>" . $row[28] . "</cell>";    
    $s .= "<cell>" . $row[29] . "</cell>"; 
    $s .= "</row>";
}
$s .= "</rows>";
echo $s;
?>
