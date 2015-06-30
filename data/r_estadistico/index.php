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
										<h5 class="widget-title">Proceso</h5>

										<div class="widget-toolbar">
											<a href="#" data-action="fullscreen" class="orange2">
												<i class="ace-icon fa fa-expand"></i>
											</a>

											<a href="#" data-action="reload">
												<i class="ace-icon fa fa-refresh"></i>
											</a>
										</div>
									</div>

									<div class="widget-body">
										<div class="widget-main">											
										<div class="row">
											<div class="col-xs-6">												
												<div class="col-sm-12">
													<h3 class="row header smaller lighter green">
														<span class="col-sm-6"> Producto más vendido</span><!-- /.col -->

														<span class="col-sm-6">
															<label class="pull-right inline">
																<small class="muted smaller-90"></small>

																<button class="btn btn-app btn-light btn-xs" id="mas_vendido">
																	<i class="ace-icon fa fa-bar-chart-o bigger-160"></i>
																	Ver
																</button>
															</label>
														</span><!-- /.col -->
													</h3>
												</div>
												<div class="col-sm-12">
													<h3 class="row header smaller lighter orange">
														<span class="col-sm-6"> Cliente que más compra</span><!-- /.col -->

														<span class="col-sm-6">
															<label class="pull-right inline">
																<small class="muted smaller-90"></small>

																<button class="btn btn-app btn-light btn-xs" id="cliente_mas_compra">
																	<i class="ace-icon fa fa-bar-chart-o bigger-160"></i>
																	Ver
																</button>
															</label>
														</span><!-- /.col -->
													</h3>
												</div>
											</div>
											<div class="col-xs-6">
												<div id="piechart-placeholder" style="width: 90%; min-height: 150px; padding: 0px; position: relative;">
													<canvas class="flot-base" width="411" height="150" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 411px; height: 150px;">
														
													</canvas>
													<canvas class="flot-overlay" width="411" height="150" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 411px; height: 150px;">
														
													</canvas><div class="legend">
													<div style="position: absolute; width: 90px; height: 110px; top: 15px; right: -30px; opacity: 0.85; background-color: rgb(255, 255, 255);"> </div>
													<table style="position:absolute;top:15px;right:-30px;;font-size:smaller;color:#545454">
														<tbody>
															<tr>	
																<td class="legendColorBox">
																	<div style="border:1px solid null;padding:1px">
																		<div style="width:4px;height:0;border:5px solid #68BC31;overflow:hidden">																		
																		</div>
																	</div>
																</td>
																<td class="legendLabel"></td>
															</tr>
															<tr>
																<td class="legendColorBox">
																	<div style="border:1px solid null;padding:1px">
																		<div style="width:4px;height:0;border:5px solid #2091CF;overflow:hidden"></div>
																	</div>
																</td>
																<td class="legendLabel"></td>
															</tr>
															<tr>
																<td class="legendColorBox">
																	<div style="border:1px solid null;padding:1px">
																		<div style="width:4px;height:0;border:5px solid #AF4E96;overflow:hidden"></div>
																	</div>
																</td>
																<td class="legendLabel"></td>
															</tr>
															<tr>
																<td class="legendColorBox">
																	<div style="border:1px solid null;padding:1px">
																		<div style="width:4px;height:0;border:5px solid #DA5430;overflow:hidden"></div>
																	</div>
																</td>
																<td class="legendLabel"></td>
															</tr>
															<tr>
																<td class="legendColorBox">
																	<div style="border:1px solid null;padding:1px">
																		<div style="width:4px;height:0;border:5px solid #FEE074;overflow:hidden"></div>
																	</div>
																</td>
																<td class="legendLabel"></td>
															</tr>
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
		



		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->
		<script type="text/javascript" src="r_estadistico.js"></script>

	</body>
</html>