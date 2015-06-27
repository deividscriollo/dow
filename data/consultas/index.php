<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="../../dist/images/logo.fw.png">
		<title>Inicio - TOTORA SISA</title>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="../../dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="../../dist/css/font-awesome.min.css" />
		<!-- Select -->
		<link rel="stylesheet" href="../../dist/css/chosen.min.css" />


		<!-- page specific plugin styles -->

		<!-- text fonts -->
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="../../dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
        <link type="text/css" rel="stylesheet" id="ace-skins-stylesheet" href="../../dist/css/ace-skins.min.css">
        <link type="text/css" rel="stylesheet" id="ace-rtl-stylesheet" href="../../dist/css/ace-rtl.min.css">
        <script src="../../dist/js/ace-extra.min.js"></script>
    </head>

    <body class="skin-2">
		<div id="navbar" class="navbar navbar-default">
			<script type="text/javascript">
				try{ace.settings.check("navbar" , "fixed")}catch(e){}
			</script>
			<div class="navbar-container" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>

					<span class="icon-bar"></span>
				</button>

				<div class="navbar-header pull-left">
					<a href="#" class="navbar-brand">
						<small>
							TOTORA SISA
						</small>
					</a>
				</div>

				
			</div><!-- /.navbar-container -->
		</div>

		<div class="main-container" id="main-container">
			 <div class="main-contents">
				<div class="main-content-inner">
					<div class="page-content">
						<div class="row">
							<div class="col-xs-3 col-sm-3 widget-container-col">
								<img src="../../empresa/consultas.fw.png" width="100%">
							</div>		
							<div class="col-xs-9 col-sm-9 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Proceso</h5>
										<div class="widget-toolbar">											
											<a href="#" data-action="fullscreen" class="orange2">
												<i class="ace-icon fa fa-expand"></i>
											</a>
										</div>
									</div>
									<div class="widget-body center">
										<div class="widget-main">
											<div class="row">
												<form id="form_buscqueda" class="form-horizontal" role="form">
													<div class="row">
														<div class="col-xs-8">
															<div class="col-xs-10">																
																<div class="form-group">
																	<label class="control-label col-sm-5 no-padding-right" for="email">INGRESE SU CEDULA O RUC:</label>

																	<div class="col-sm-7">
																		<div class="clearfix">
																			<input type="text" id="txt_cedula" name="txt_cedula" placeholder="cedula o ruc"  class="col-xs-12">
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-xs-2">
																<button type="submit" class="btn btn-sm btn-inverse"><i class="ace-icon fa fa-search bigger-110"></i> Buscar</button>
															</div>															
														</div>
													</div>													
												</form>
											</div>
											<div class="row">
												<div class="col-xs-12">
													<div class="table-header">
														Resultado de las facturas realizadas por nuestros clientes
													</div>
													<a href="../reportes/factura_venta.php?id=09565455141e3610616">Factura venta</a>
													<table id="tbl_facturas" class="table table-striped table-bordered table-hover">
														<thead>
															<tr>
																<th class="center">Nro</th>
																<th class="center">Factura</th>
																<th class="center">Cliente</th>
																<th class="center">Fecha</th>																
																<th class="center">Total</th>
																<th class="center">Accion</th>
															</tr>
														</thead>
														<tbody>
															
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div><!-- /.main-content -->

			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-120">
						<span class="blue bolder">TOTORA SISA</span>
						Aplicación web facturación electronica &copy; 2014-2015
						</span>
						&nbsp; &nbsp;
						<span class="action-buttons">
						<a href="#">
							<i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>
						</a>
						<a href="#">
							<i class="ace-icon fa fa-facebook-square text-primary bigger-150"></i>
						</a>
						<a href="#">
							<i class="ace-icon fa fa-rss-square orange bigger-150"></i>
						</a>
						</span>
					</div>
				</div>
			</div>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		
		<!-- <![endif]-->

		<!--[if IE]>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<![endif]-->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='../../dist/js/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="../../dist/js/bootstrap.min.js"></script>

		<!-- page specific plugin scripts -->

		<!--[if lte IE 8]>
		  <script src="../../dist/js/excanvas.min.js"></script>
		<![endif]-->
		<script src="../../dist/js/jquery-ui.custom.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/jquery.easypiechart.min.js"></script>
		<script src="../../dist/js/jquery.sparkline.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.pie.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.resize.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/jquery.validate.min.js"></script>
		<script src="../../dist/js/additional-methods.min.js"></script>



		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->
		<script type="text/javascript" src="index.js"></script>
		
	</body>
</html>