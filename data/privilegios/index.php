<?php include('../menu/index.php'); ?>
<?php
if(!isset($_SESSION))
	{
		session_start();		
	}
	if(!isset($_SESSION["iddow"])) {

		header('Location: ../../');
	}
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="../../dist/images/logo.fw.png">
		<title>Inicio - <?php empresa(); ?></title>

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

		<!-- ace settings handler -->
		<script src="../../dist/js/ace-extra.min.js"></script>
	</head>

	<body class="skin-2">
		<?php menu_arriba(); ?>

		<div class="main-container" id="main-container">
			

			<?php menu_lateral(); ?>

			 <div class="main-content">
				<div class="main-content-inner">
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Proceso Privilegios</h5>

										<div class="widget-toolbar">											
											<a href="#" data-action="fullscreen" class="orange2">
												<i class="ace-icon fa fa-expand"></i>
											</a>

											<a href="#" data-action="reload">
												<i class="ace-icon fa fa-refresh"></i>
											</a>

											<a href="#" data-action="collapse">
												<i class="ace-icon fa fa-chevron-up"></i>
											</a>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<div class="row">												
												<div class="col-xs-12">		
												<h3 class="lighter block green">Información, proceso de privilegios</h3>															
													<div class="col-sm-3">
														<div class="form-group">																												
															<select class="chosen-select form-control" id="txt_1" name="txt_1" data-placeholder="CI USUARIO">
																<option value=""></option>																	
															</select>						
															<input type="hidden" id="txt_0" name="txt_0" />																															
														</div>													
													</div>				
													<div class="col-sm-3">
														<div class="form-group">																												
															<select class="chosen-select form-control" id="txt_2" name="txt_2" data-placeholder="NOMBRES USUARIO">
																<option value=""></option>																	
															</select>																																				
														</div>													
													</div>		
													<div class="col-sm-1">
														<div class="form-group">																												
															<button type="button" class="btn btn-primary" id="btn_agregar">Agregar</button>
														</div>													
													</div>							
														<div class="form-group">																												
													<div class="col-sm-1">
															<button type="button" class="btn btn-primary" id="btn_guardar">Guardar</button>
														</div>													
													</div>							
													<div class="col-sm-1">
															<button type="button" class="btn btn-primary" id="btn_limpiar">Limpiar</button>
														</div>													
													</div>							
												</div>
											</div>
											<div class="row">
												<div class="col-sm-6">
													<div class="widget-box widget-color-blue2">
														<div class="widget-header">
															<h4 class="widget-title lighter smaller">Administrador</h4>
														</div>

														<div class="widget-body">
															<div class="widget-main padding-8">
																<ul id="tree1">
																	
																</ul>

															</div>
														</div>
													</div>
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

			<?php footer(); ?>

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
		<script src="../../dist/js/fuelux/fuelux.tree.min.js"></script>



		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="privilegios.js"></script>
		<script src="../generales.js"></script>

		<!-- inline scripts related to this page -->		
	</body>
</html>