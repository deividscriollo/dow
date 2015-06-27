<?php include('../menu/index.php'); ?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="../../dist/images/logo.fw.png">
        <title>Tipo Producto - <?php empresa(); ?></title>

        <meta name="description" content="Dynamic tables and grids using jqGrid plugin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <!-- bootstrap & fontawesome -->
        <link rel="stylesheet" href="../../dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../../dist/css/font-awesome.min.css" />

        <!-- page specific plugin styles -->
        <link rel="stylesheet" href="../../dist/css/jquery-ui.min.css" />
        <link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
        <link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />
        <link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />

        <!-- text fonts -->
        <link rel="stylesheet" href="../../dist/css/fontdc.css" />

        <!-- ace styles -->
        <link rel="stylesheet" href="../../dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
        <link type="text/css" rel="stylesheet" id="ace-skins-stylesheet" href="../../dist/css/ace-skins.min.css">
        <script src="../../dist/js/ace-extra.min.js"></script>
    </head>

    <body class="skin-2">
        <?php menu_arriba(); ?>

        <div class="main-container" id="main-container">
            <?php menu_lateral(); ?>

            <div class="main-content">
                <div class="main-content-inner">
                    <div class="breadcrumbs" id="breadcrumbs">
                        <script type="text/javascript">
                            try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                        </script>

                        <ul class="breadcrumb">
                            <li>
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="../inicio/">Inicio</a>
                            </li>
                            <li class="active">Ingresos</li>
                            <li class="active">Generales</li>
                            <li class="active">Formas de Pago</li>
                        </ul>
                    </div>

                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 widget-container-col">
                                <div class="widget-body">
                                    <div class="widget-main">
                                        <div class="row">                           
                                            <table id="grid-table"></table>
                                            <div id="grid-pager"></div>
                                        </div>                                              
                                    </div>
                                </div>
                            </div>
                        </div>                          
                    </div>
                </div>
            </div>

            <?php footer(); ?>

            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
            </a>
        </div>

        <script type="text/javascript">
            window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
        </script>

        <script type="text/javascript">
            if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
        </script>
        <script src="../../dist/js/bootstrap.min.js"></script>

        <!-- page specific plugin scripts -->
        <script src="../../dist/js/date-time/bootstrap-datepicker.min.js"></script>
        <script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="../../dist/js/jquery.gritter.min.js"></script>

        <!-- ace scripts -->
        <script src="../../dist/js/ace-elements.min.js"></script>
        <script src="../../dist/js/ace.min.js"></script>
        <script src="formas_pago.js"></script>
    </body>
</html>