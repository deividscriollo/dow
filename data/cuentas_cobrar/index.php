<?php include('../menu/index.php'); 
include '../conexion.php';
$conexion = conectarse();

$consulta = pg_query("select numero_serie from factura_venta");
while ($row = pg_fetch_row($consulta)) {
    $num_factura = $row[0];
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
		<link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />
		<link rel="stylesheet" href="../../dist/css/jquery-ui.custom.min.css" type="text/css"/>
		<link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="../../dist/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
        <link type="text/css" rel="stylesheet" id="ace-skins-stylesheet" href="../../dist/css/ace-skins.min.css">
        <link type="text/css" rel="stylesheet" id="ace-rtl-stylesheet" href="../../dist/css/ace-rtl.min.css">
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
                            <li class="active">Procesos</li>
                            <li class="active">Cuentas Cobrar</li>
                        </ul>
                    </div>
					<div class="page-content">
						<div class="row">						
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Cuentas Cobrar</h5>
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
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_pagosVenta">	
													<div class="row">
														<div class="col-md-12 pull-right">
															<div class="col-md-4">
																<label class="col-sm-4 no-padding-right" for="fecha_actual">Fecha Actual:</label>
																<div class="col-sm-8">
																	<div class="input-group">
																		<input class="form-control date-picker" id="fecha_actual" name="fecha_actual" type="text" readonly data-date-format="yyyy-mm-dd" />
																		<span class="input-group-addon">
																			<i class="fa fa-calendar bigger-110"></i>
																		</span>
																	</div>
																</div>
															</div>

															<div class="col-md-4">
																<label class="col-sm-4 no-padding-right" for="hora_actual">Hora Actual:</label>
																<div class="col-sm-8">
																	<div class="input-group">
																		<input class="form-control" type="text" id="hora_actual" name="hora_actual"  readonly />
																		<span class="input-group-addon">
																			<i class="fa fa-clock-o bigger-110"></i>
																		</span>
																	</div>
																</div>
															</div>

															<div class="col-md-4">
																<span class="bigger-120">
																	<span class="red bolder">Responsable:</span>
																	<span ><?php print($_SESSION['nombrescompletosdow']); ?></span>
																</span>
															</div>
														</div>
													</div>
													
													<div class="hr"></div>

													<div class="row">
														<div class="col-md-12">
															<div class="col-md-5">
																<div class="form-group">
																	<label class="col-sm-6 no-padding-right" for="txt_nro_identificacion"> Cédula de Identidad o Ruc: <font color="red">*</font></label>
																	<div class="col-sm-6">
																	<input type="hidden" id="id_cliente" name="id_cliente">																				
																		<select class="chosen-select form-control" id="txt_nro_identificacion" name="txt_nro_identificacion" data-placeholder="Nro de identifiación">	     
	                                                                        <option value=""></option>	                                                                        
	                                                                    </select>
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-7">
																<div class="form-group">
																	<label class="col-sm-5 control-label no-padding-right" for="txt_nombre_cliente"> Nombres Completos: <font color="red">*</font></label>
																	<div class="col-sm-7">
																		<select class="chosen-select form-control" id="txt_nombre_cliente" name="txt_nombre_cliente" data-placeholder="Nombres Completos">	                                                                        
	                                                                        <option value=""> </option>	                                                                        
	                                                                    </select>
																	</div>																													
																</div>																												
															</div>
														</div>
													</div>

													<div class="row">	
														<div class="col-md-12">
															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 no-padding-right" for="form-field-1"> Dirección: </label>
																	<div class="col-sm-8">
																		<input type="text" id="lbl_client_direccion" name="lbl_client_direccion" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-4 no-padding-right" for="form-field-1"> Teléfono:</label>
																	<div class="col-sm-8">
																	    <input type="text" id="lbl_client_telefono" name="lbl_client_telefono" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>

															<div class="col-md-4">																		
																<div class="form-group">
																	<label class="col-sm-3 no-padding-right" for="form-field-1"> Correo:</label>
																	<div class="col-sm-9">
																		<input type="text" id="lbl_client_correo" name="lbl_client_correo" class="form-control" readonly data-toggle="tooltip"  value="" /> 
																	</div>																													
																</div>																												
															</div>																
														</div>
													</div>

													<div class="row">
														<div class="col-md-12">
															<div class="col-md-4">
																<div class="form-group">
																	<label class="col-sm-4 no-padding-right" for="formas"> Forma de pago:</label>
																	<div class="col-sm-8">
																		<select class="chosen-select form-control" id="formas" name="formas" data-placeholder="Formas de Pago">
	                                                                    </select>
																	</div>																														
																</div>														 
															</div>																
														</div>
													</div>	
													
													<div class="row ">
														<div class="col-xs-12">
															<div class="col-xs-12">
																<h3 class="header smaller lighter green"></h3>
															</div>
														</div>
													</div>
													
													<div class="row">
														<div class="col-xs-12">
															<div class="col-xs-3">
																<div class="row">
																	<div class="col-xs-12">
																		<label>Nro de factura a pagar:</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-xs-12">
																		<input type="text" id="num_factura" name="num_factura" readonly  class="form-control" data-toggle="tooltip"  /> 
																	</div>
																</div>
															</div>
															<div class="col-xs-3">
																<div class="row">
																	<div class="col-xs-12">
																		<label>Fecha de Factura:</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-xs-12">
																		<input type="text" id="fecha_factura" name="fecha_factura" readonly class="form-control" data-toggle="tooltip"  /> 
																	</div>
																</div>
															</div>
															<div class="col-xs-2">
																<div class="row">
																	<div class="col-xs-12">
																		<label>Total CxC:</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-xs-12">
																		<input type="text" id="totalcxc" name="totalcxc" readonly class="form-control" data-toggle="tooltip"  /> 
																	</div>
																</div>
															</div>

															<div class="col-xs-2">
																<div class="row">
																	<div class="col-xs-12">
																		<label>Valor Pagado:</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-xs-12">
																		<input type="text" id="valor_pagado" name="valor_pagado"  class="form-control" data-toggle="tooltip"  /> 
																	</div>
																</div>
															</div>

															<div class="col-xs-2">
																<div class="row">
																	<div class="col-xs-12">
																		<label>Saldo:</label>
																	</div>
																</div>
																<div class="row">
																	<div class="col-xs-12">
																		<input type="text" id="saldo2" name="saldo2" readonly class="form-control" data-toggle="tooltip"  /> 
																		<input type="hidden" id="id_pagos_venta" name="id_pagos_venta" readonly class="form-control" data-toggle="tooltip"  /> 
																	</div>
																</div>
															</div>
														</div>
													</div>
													
													<div class="row">
														<div class="col-md-12">
															<div class="hr hr-18 dotted hr-double"></div>
														</div>
													</div>

													<div class="col-xs-12">
														<div class="tabbable">
															<ul class="nav nav-tabs" id="myTab">
																<li class="active">
																	<a data-toggle="tab" href="#pagos">
																		<i class="green ace-icon fa fa-pencil-square-o bigger-120"></i>
																		Pagos
																	</a>
																</li>

																<li class="">
																	<a data-toggle="tab" href="#fecha">
																		<i class="green ace-icon fa fa-money bigger-120"></i>
																		Fecha Pagos
																	</a>
																</li>
															</ul>

															<div class="tab-content">
																<div id="pagos" class="tab-pane fade in active">
																	<div class="col-md-12">
											                            <div id="grid_container">
											                                <table id="list"></table>
											                            </div>
											                        </div>
											                    </div>

											                    <div id="fecha" class="tab-pane">
											                    	<row>
											                    		<div class="col-md-12">
											                    			<div class="col-md-6">
														                    	<table id="tablaNuevo" class="table table-striped table-bordered"  >
												                                    <thead>
												                                        <tr>
												                                            <th style="width: 280px">Fecha Pagos</th>
												                                            <th style="width: 200px">Monto</th>
												                                            <th style="width: 200px">Saldo</th>
												                                        </tr>   
												                                    </thead>
												                                    <tbody>
												                                        <tr></tr>
												                                    </tbody>
												                                </table>
												                            </div>    
											                            </div>
										                            </row>    
											                    </div>
										                    </div>    
									                    </div>    
								                    </div>    

													<div class="row">
														<div class="col-md-12">
															<div class="col-md-5">
																<div class="form-group">
																	<label class="col-sm-4 control-label no-padding-right" for="observaciones"> Observaciones: </label>
																	<div class="col-sm-8">	
																		<textarea id="observaciones" name="observaciones" placeholder="" class="col-sm-12"></textarea>
																	</div>
																</div>
															</div>
															<div class="col-md-7">																		
															</div>																	
														</div>
													</div>

													<div class="row">
														<div class="col-md-12">
															<div class="hr hr-18 dotted hr-double"></div>
														</div>
													</div>
												</form>

												<div class="row">
													<div class="center">
														<button type="button" class="btn btn-primary" id="btn_01" data-toggle="modal" href="#modal_facturas">
															<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
															Buscar Facturas
														</button>													 
														<button type="button" class="btn btn-primary" id="btn_0">
															<i class="ace-icon fa fa-floppy-o bigger-120 write"></i>
															Guardar
														</button>
														<button type="button" id="btn_1" class="btn btn-primary">
															<i class="ace-icon fa fa-file-o bigger-120 write"></i>
															Limpiar
														</button>
														<button type="button" id="btn_2" class="btn btn-primary">
															<i class="ace-icon fa fa-refresh bigger-120 write"></i>
															Actualizar
														</button>														
														<button data-toggle="modal" href="#myModal" type="button" id="btn_3" class="btn btn-primary">
															<i class="ace-icon fa fa-search bigger-120 write"></i>
															Buscar
														</button>
														<button type="button" id="btn_4" class="btn btn-primary">
															<i class="ace-icon fa fa-arrow-circle-left bigger-120 write"></i>
															Atras
														</button>
														<button type="button" id="btn_5" class="btn btn-primary">
															<i class="ace-icon fa fa fa-arrow-circle-right bigger-120 write"></i>
															Adelante
														</button>
													</div>
												</div>

												<!-- Modal categoria-->
												<div class="modal fade" id="modal_facturas" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
												    <div class="modal-dialog">
												        <div class="modal-content blue">
													        <div class="modal-header">
													          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
													          <h4 class="modal-title">Lista Facturas</h4>
													        </div>

													        <form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_marcasProducto">
													        	<div class="modal-body">		            
													            	<table id="table2"></table>
																	<div id="pager2"></div>						            
													        	</div>
														        <div class="modal-footer">
														         	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
														        </div>
													        </form>
											            </div><!-- /.modal-content -->
											        </div><!-- /.modal-dialog -->
											    </div><!-- /.modal -->
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

		<!-- Modal -->
		<div id="top-menu" class="modal aside" data-fixed="true" data-placement="top" data-background="true" data-backdrop="invisible" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body container">
						<div class="row">
							<div class="col-sm-5 col-sm-offset-1 white">
								<h3 class="lighter">Imprimir &amp; PAGO</h3>
							</div>

							<div class="col-sm-5 text-center line-height-2">									
								&nbsp; &nbsp;
								<a class="btn btn-app btn-light no-radius" href="#">
									<i class="ace-icon fa fa-print bigger-230"></i>
									Imprimir
								</a>
							</div>
						</div>
					</div>
				</div>
				<button class="btn btn-inverse btn-app btn-xs ace-settings-btn aside-trigger" data-target="#top-menu" data-toggle="modal" type="button">
					<i data-icon="fa-chevron-down" data-icon="fa-chevron-up" class="ace-icon fa fa-chevron-down bigger-110 icon-only"></i>
				</button>
			</div>
		</div>

		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		
		<script src="../../dist/js/bootstrap.min.js"></script>

		<script src="../../dist/js/jquery-ui.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/jquery.easypiechart.min.js"></script>
		<script src="../../dist/js/jquery.sparkline.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.pie.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.resize.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="../../dist/js/date-time/bootstrap-timepicker.min.js"></script>
		<script src="../../dist/js/date-time/daterangepicker.min.js"></script>
		<script src="../../dist/js/date-time/moment.min.js"></script>
				
		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>
        <script src="../../dist/js/jquery.maskedinput.min.js"></script>
        <script src="../../dist/js/jquery.bootstrap-duallistbox.min.js"></script>
        <script src="../../dist/js/jquery.raty.min.js"></script>
        <script src="../../dist/js/select2.min.js"></script>
        <script src="../../dist/js/bootstrap-multiselect.min.js"></script>
		
		<script src="../generales.js"></script>
		<script src="cuentas_cobrar.js"></script>
		<script src="../../dist/js/validCampoFranz.js" ></script>
		<script src="../../dist/js/jquery.gritter.min.js"></script>
	</body>
</html> 