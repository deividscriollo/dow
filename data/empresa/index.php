<?php include('../menu/index.php'); ?>
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
		<link rel="stylesheet" href="../../dist/css/datepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-timepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/daterangepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-datetimepicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/colorpicker.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-editable.min.css" />
		<link rel="stylesheet" href="../../dist/css/bootstrap-editable.min.css" />
		<link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />


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
                            <li class="active">Empresa</li>                            
                        </ul>
                    </div>
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title"><i class="ace-icon fa fa-user"></i> Empresa</h5>

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
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_empresa">
													<div class="row">
														<div class="col-xs-12">	
															<div class="col-sm-12">
																<div class="tabbable">
																	<ul class="nav nav-tabs" id="myTab">
																		<li class="active">
																			<a data-toggle="tab" href="#empresa">
																				<i class="purple ace-icon fa fa-building bigger-120"></i>
																				Información Empresa
																			</a>
																		</li>
																		<li>
																			<a data-toggle="tab" href="#detal">
																				<span class="warning ace-icon fa fa-building-o bigger-120"></span>
																				Detalles Adicionales												
																			</a>
																		</li>										
																	</ul>									
																	<div class="tab-content">
																		<div id="empresa" class="tab-pane fade in active">
																			<div class="row">												
																				<div class="col-xs-12">													
																					<div class="col-sm-6">
																						<div class="form-group has-error">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_1"> RUC. Empresa:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_1" name="txt_1"  placeholder="RUC. Empresa" class="form-control" data-toggle="tooltip" data-original-title="Agregue el nro de CI en caso de ser extranjero seleccione la casilla Extranjero" required pattern="[0-9]{13}" />
																								<input type="hidden" id="txt_o" name="txt_o" />
																							</div>
																						</div>																
																						<div class="form-group has-error">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_2">Propietario:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_2" name="txt_2" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" placeholder="Propietario" class="form-control" />
																							</div>
																						</div>
																						<div class="form-group ">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_3">Teléfono:</label>
																							<div class="col-sm-8">
																								<span class="block input-icon input-icon-right">
							                                                                    	<input type="text" id="txt_3" name="txt_3" placeholder="Teléfono" class="form-control" />
							                                                                    	<i class="ace-icon fa fa-phone fa-flip-horizontal"></i>
							                                                                    </span>																		
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_4">Celular:</label>
																							<div class="col-sm-8">	
																								<span class="block input-icon input-icon-right">
																									<input type="text" id="txt_4" name="txt_4" placeholder="Celular" class="form-control" />
																									<i class="ace-icon fa fa-mobile fa-flip-horizontal"></i>					
																								</span>																																																						
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_5">Correo:</label>
																							<div class="col-sm-8">
																							  <span class="block input-icon input-icon-right ">
																							  	<input type="mail" id="txt_5" name="txt_5" placeholder="Correo" class="form-control" />
																							  	<i class="ace-icon fa fa-envelope"></i>
																							  </span>
																							</div>
																						</div>																																													
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_6">Sitio Web:</label>																							
																							<div class="col-sm-8">
																							  <span class="block input-icon input-icon-right ">
																							  	<input type="text" id="txt_6" name="txt_6" placeholder="Sitio Web" class="form-control" />
																							  	<i class="ace-icon fa fa-globe"></i>
																							  </span>
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_7">Fax:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_7" name="txt_7" placeholder="Fax" class="form-control" data-toggle="tooltip" data-original-title="Nombres de usuario"  />
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_8">Representante Legal:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_8" name="txt_8" placeholder="Representante Legal" class="form-control" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9]{1,}" data-toggle="tooltip" data-original-title="Representante Legal"  />
																							</div>
																						</div>																				
																					</div>
																					<div class="col-sm-6">
																						<div class="form-group has-error">
																							<label class="col-sm-4 control-label " for="txt_12">Nombre Empresa</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_12" name="txt_12"  placeholder="Nombre Empresa" class="form-control" data-toggle="tooltip" data-original-title="Nombre Empresa" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" />
																							</div>
																						</div>
																						<div class="form-group has-error">
																							<label class="col-sm-4 control-label " for="txt_13">Slogan</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_13" name="txt_13"  placeholder="Slogan" class="form-control" data-toggle="tooltip" data-original-title="Nombre Slogan" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" />
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_9">Pais:</label>
																							<div class="col-sm-8">
																								<select class="chosen-select form-control" id="txt_9" name="txt_9" data-placeholder="País">
																								</select>																	
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_10">Provincia:</label>
																							<div class="col-sm-8">
																								<select class="chosen-select form-control" id="txt_10" name="txt_10" data-placeholder="Provincia">
																								</select>
																							</div>
																						</div>
																						<div class="form-group ">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_11">Ciudad:</label>
																							<div class="col-sm-8">
																								<select class="chosen-select form-control" id="txt_11" name="txt_11" data-placeholder="Ciudad">
																								</select>
																							</div>
																						</div>
																						<div class="form-group has-error">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_14">Dirección:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_14" name="txt_14" placeholder="Dirección" class="form-control" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" data-toggle="tooltip" data-original-title="Nombres completos"  />
																							</div>
																						</div>	
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_15">Ascesor Legal:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_15" name="txt_15" placeholder="Ascesor Legal" class="form-control" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" data-toggle="tooltip" data-original-title="Ascesor Legal"  />
																							</div>
																						</div>																						
																						<div class="form-group">
																							<label class="col-sm-4 control-label no-padding-right" for="txt_16">RUC/C.I. Representante:</label>
																							<div class="col-sm-8">
																								<input type="text" id="txt_16" name="txt_16"  placeholder="Identificación" class="form-control" data-toggle="tooltip" data-original-title="CI. Representante Legal" pattern="[0-9]{1,}" />
																							</div>
																						</div>
																					</div>
																				</div>
																																
																			</div>										
																		</div>

																		<div id="detal" class="tab-pane fade">
																			<div class="row">
																			<div class="col-xs-12">	
																				<div class="col-sm-2">
																					<div class="form-group">
																						<div class="col-xs-12">
																							<div class="col-xs-12">																									
																								<span class="profile-picture">
																									<img id="avatar" name="avatar" class="editable img-responsive" alt="Empresa x" src="img/default.png" accept="image/*"/>
																								</span>
																							</div>																																														
																						</div>
																					</div>																					
																				</div>
																				<div class="col-sm-5">
																					<div class="form-group ">
																						<label class="col-sm-4 control-label no-padding-right" for="txt_17">Contador:</label>
																						<div class="col-sm-8">
																							<input type="text" id="txt_17" name="txt_17" placeholder="Contador" class="form-control" pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9]{1,}" data-toggle="tooltip" data-original-title="Digite la contraseña del usuario mínimo 5 carácteres"/>
																						</div>
																					</div>
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right" for="txt_18">Autorizacion SRI:</label>
																						<div class="col-sm-8">
																							<input type="text" id="txt_18" name="txt_18" placeholder="Autorizacion SRI" class="form-control" pattern="[0-9]{1,}" data-toggle="tooltip" data-original-title="Autorizacion SRI"  />
																						</div>
																					</div>																																									
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right" for="txt_19">Modo Costeo:</label>
																						<div class="col-sm-8">																								
																							<select class="form-control" id="txt_19" name="txt_19" data-placeholder="Modo Costeo">																								
																								<option value="PROCESOS">PROCESOS</option>
																								<option value="ORDENES DE PRODUCCION">ORDENES DE PRODUCCION</option>
																							</select>	
																						</div>
																					</div>																					
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right" for="txt_20">Comentario</label>
																						<div class="col-sm-8">
																							<textarea class="form-control" name="txt_20" id="txt_20" placeholder="Comentario"></textarea>
																						</div>
																					</div>
																				</div>
																				<div class="col-sm-5">																					
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right" for="form-field-1">Inicio Factura:</label>
																						<div class="col-sm-8">
																							<input type="text" id="spinner1" name="spinner1" required pattern="[0-9]{1,}"/>	
																						</div>
																					</div>
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right">Item´s factura</label>
																						<div class="col-sm-8">
																							<input type="text" id="spinner2"  name="spinner2" class="form-control" data-toggle="tooltip" data-original-title="Item´s factura" required pattern="[0-9]{1,}" />																		
																						</div>
																					</div>	
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right">Año Contable</label>
																						<div class="col-sm-8">
																							<input type="text" id="spinner3" name="spinner3"  class="form-control input-Slarge" data-toggle="tooltip" data-original-title="Año Contable" required pattern="[0-9]{1,}" />
																						</div>
																					</div>
																					<div class="form-group">
																						<label class="col-sm-4 control-label no-padding-right" for="form-field-1">Activo:</label>
																						<div class="col-xs-8">
																							<label>
																								<input name="switch-field-1" id="switch-field-1" class="ace ace-switch ace-switch-5" type="checkbox" checked="">
																								<span class="lbl"></span>
																							</label>
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
													<h3 class="header smaller lighter green"></h3>
													<div class="center">													 
														<button type="submit" class="btn btn-primary" id="btn_0">
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
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- /.main-content -->
			 <!-- Modal -->
			  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			    <div class="modal-dialog">
			      <div class="modal-content">
			        <div class="modal-header">
			          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			          <h4 class="modal-title">BUSCAR USUARIOS</h4>
			        </div>
			        <div class="modal-body">
			            <table id="table"></table>
						<div id="pager"></div>
			        </div>
			        <div class="modal-footer">
			          <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
			        </div>
			      </div><!-- /.modal-content -->
			    </div><!-- /.modal-dialog -->
		  </div><!-- /.modal -->
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
		<script src="../../dist/js/x-editable/bootstrap-editable.min.js"></script>
		<script src="../../dist/js/x-editable/ace-editable.min.js"></script>
		<script src="../../dist/js/jquery.gritter.min.js"></script>
		<script src="../../dist/js/jquery.maskedinput.min.js"></script>
		<script src="empresa.js"></script>
		<script src="../generales.js"></script>



		<!-- ace scripts -->
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>

		<!-- inline scripts related to this page -->
		<script type="text/javascript">
			/*funcion inicial de la imagen y  buscadores del select no topar plz*/			
			$('.chosen-select').chosen({allow_single_deselect:true}); 
			$(window)
			.off('resize.chosen')
			.on('resize.chosen', function() {
				$('.chosen-select').each(function() {
					 var $this = $(this);
					 $this.next().css({'width': $this.parent().width()});
				})
			}).trigger('resize.chosen');
			//resize chosen on sidebar collapse/expand
			$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
				if(event_name != 'sidebar_collapsed') return;
				$('.chosen-select').each(function() {
					 var $this = $(this);
					 $this.next().css({'width': $this.parent().width()});
				})
			});
			/*-----------------------*/
			/*funcion inicial spinner para objetos de subir y bajar con intervalos automaticos*/
			$('#spinner1').ace_spinner({value:0,min:0,step:1, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'});
			$('#spinner2').ace_spinner({value:0,min:0,step:1, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'});
			$('#spinner3').ace_spinner({value:2015,min:2015,max:2050,step:1, btn_up_class:'btn btn-success' , btn_down_class:'btn btn-danger'});			
				
			/*-----------------------*/			
			/*funcion inicial proceso*/
				
			/*-----------------------*/

		</script>
	</body>
</html>