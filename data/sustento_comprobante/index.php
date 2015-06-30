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

		<!-- page specific plugin styles -->
		<link rel="stylesheet" href="../../dist/css/jquery-ui.custom.min.css" />
		<link rel="stylesheet" href="../../dist/css/chosen.min.css" />
		<link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/colorpicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />
		<link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />

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
					<div class="breadcrumbs" id="breadcrumbs">
                        <script type="text/javascript">
                            try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
                        </script>
                        <ul class="breadcrumb">
                            <li>
                                <i class="ace-icon fa fa-home home-icon"></i>
                                <a href="../inicio/">Inicio</a>
                            </li>
                            <li class="active">Contabilidad</li>
                            <li class="active">Sustento - Comprobante</li>
                        </ul>
                    </div>
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12 col-sm-12 col-md-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Sustento - Comprobante </h5>
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
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_sust_compro">										
													<div class="col-xs-12">														
														<div class="col-sm-6">
															<div class="row">
																<div class="col-sm-12">
																	<div class="form-group">
																		<label class="col-sm-4 control-label no-padding-right" for="form-field-1">Sustento Tributario:</label>
																		<div class="col-sm-8">
																			<select class="chosen-select form-control" id="txt_1" name="txt_1" data-placeholder="Sustento Tributario">	     
	                                                                        
	                                                                    </select>
																			<input type="hidden" id="txt_0" name="txt_0" />
																		</div>
																	</div>	
																</div>
															</div>
														</div>
														<div class="col-sm-6">
															<div class="row">
																<div class="col-sm-12">
																	<div class="form-group">
																		<label class="col-sm-4 control-label no-padding-right" for="form-field-1">Tipo de Comprobante:</label>
																		<div class="col-sm-8">
																			<select class="chosen-select form-control" id="txt_2" name="txt_2" data-placeholder="Tipo de Comprobante">	     
	                                                                        
	                                                                    </select>
																		</div>
																	</div>	
																</div>																						
															</div>																														
														</div>														
													</div>	
													<div class="col-xs-12">	
														<div>
															<table id="td_sust_compro" class="table table-striped table-bordered table-hover">
																<thead>
																	<tr>
																		<th class="hidden">id_sust</th>
																		<th>Sustento</th>
																		<th class="hidden">id_compro</th>
																		<th>Comprobante</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>														
																</tbody>
														</table>
														</div>												
													</div>	
													<div class="col-sm-12">
														<div class="row">
															<div class="center">
																<button type="submit" class="btn btn-primary" id="btn_0">
																	<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
																	Guardar
																</button>
																<button type="button" id="btn_1" class="btn btn-primary">
																	<i class="ace-icon fa fa-file-o bigger-120 write"></i>
																	Limpiar
																</button>																															
																<button type="button" id="btn_3" class="btn btn-primary">
																	<i class="ace-icon fa fa-gear bigger-120 write"></i>
																	Agregar Comprobante
																</button>														
															</div>
														</div>
													</div>												
												</form>
											</div>											
											
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
		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="../../dist/js/bootstrap.min.js"></script>
		<script src="../../dist/js/jquery-ui.custom.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/fuelux/fuelux.spinner.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-timepicker.min.js"></script>
		<script src="../../dist/js/date-time/moment.min.js"></script>
		<script src="../../dist/js/date-time/daterangepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datetimepicker.min.js"></script>
		<script src="../../dist/js/bootstrap-colorpicker.min.js"></script>
		<script src="../../dist/js/jquery.knob.min.js"></script>
		<script src="../../dist/js/jquery.autosize.min.js"></script>
		<script src="../../dist/js/jquery.inputlimiter.1.3.1.min.js"></script>
		<script src="../../dist/js/jquery.maskedinput.min.js"></script>
		<script src="../../dist/js/bootstrap-tag.min.js"></script>
		<script src="../../dist/js/dataTables/jquery.dataTables.min.js"></script>
		<script src="../../dist/js/dataTables/jquery.dataTables.bootstrap.min.js"></script>
		<script src="../../dist/js/dataTables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
		<script src="../../dist/js/dataTables/extensions/ColVis/js/dataTables.colVis.min.js"></script>

		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>

		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../generales.js"></script>
		<script src="sustento_comprobante.js"></script>
		<!-- inline scripts related to this page -->
		<script type="text/javascript">
			// tooltips 
			$('[data-rel=tooltip]').tooltip();
			//calendario
			var f = new Date();
			$('.date-picker').datepicker({
				autoclose: true,
				format:'yyyy-mm-dd',
				startView:0		
			});
			$('.date-picker').val(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
			$('#txt_fecha_actual').val(f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
			// seclect chosen 
			$('.chosen-select').chosen({
				allow_single_deselect:true,
				no_results_text:'No encontrado'		
			});
			$('.modal.aside').ace_aside();
						
			$('#aside-inside-modal').addClass('aside').ace_aside({container: '#my-modal > .modal-dialog'});
			
			$(document).one('ajaxloadstart.page', function(e) {
				//in ajax mode, remove before leaving page
				$('.modal.aside').remove();
				$(window).off('.aside')
			});
			//$('#dob').datepicker('setDate', new Date(2006, 11, 24));
		</script>
	</body>
</html>