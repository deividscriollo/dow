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
		<link rel="stylesheet" href="../../dist/css/bootstrap-editable.min.css" />
		<link rel="stylesheet" href="../../dist/css/chosen.min.css" />
		<link rel="stylesheet" href="../../dist/css/jquery.gritter.min.css" />
		<link rel="stylesheet" href="../../dist/css/ui.jqgrid.min.css" />
		<link rel="stylesheet" href="../../dist/css/fontdc.css" />
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
					<div class="page-content">
						<div class="row">
							<div class="col-xs-12 col-sm-12 widget-container-col">
								<div class="widget-box">
									<div class="widget-header">
										<h5 class="widget-title">Productos</h5>

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
												<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_productos">
													<div class="row">
														<div class="col-xs-12">	
															<div class="col-sm-12">
																<div class="tabbable">
																	<ul class="nav nav-tabs" id="myTab">
																		<li class="active">
																			<a data-toggle="tab" href="#info_pro">
																				<i class="green ace-icon fa fa-pencil-square-o bigger-125"></i>
																				Información Producto
																			</a>
																		</li>

																		<li>
																			<a data-toggle="tab" href="#deta_adici">
																			<i class="purple ace-icon fa fa-cubes bigger-120"></i>
																				Detalles Adicionales
																			</a>
																		</li>
																		
																	</ul>

																	<div class="tab-content">
																		<div id="info_pro" class="tab-pane fade in active">
																			<div class="col-sm-6">
																				<div class="form-group has-error">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_1"> Código:</label>
																					<div class="col-sm-8">																						
																						<input type="text" id="txt_1" name="txt_1"  placeholder="Código" class="form-control" data-toggle="tooltip" data-original-title="Código del Producto" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" />
																						<input type="hidden" id="txt_0" name="txt_0">
																					</div>
																				</div>
																				<div class="form-group has-error">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_2"> Nombre del Producto:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_2" name="txt_2"  placeholder="Nombre del Producto"  class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />
																					</div>
																				</div>
																				<div class="form-group ">																	  																	
																					<label class="col-sm-4 control-label no-padding-right" for="txt_3"> Utilidad Minorista:</label>
																					<div class="col-sm-8">																																																																		
																						<input type="text" id="txt_3" name="txt_3" class="form-control" placeholder="Utilidad Minorista" onkeydown="return validarNumeros(event)" data-toggle="tooltip" data-original-title="Utilidad Minorista Porcentaje" />
																					</div>
																				</div>
																				<div class="form-group has-error">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_4"> Precio Minorista:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_4" name="txt_4" class="form-control"  placeholder="Precio Minorista" onkeydown="return validarNumeros(event)" data-toggle="tooltip" data-original-title="Precio Minorista" required pattern="[0-9.]{1,}" />
																					</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_5"> El producto es: </label>
																					<div class="col-sm-8">
																						<select class="chosen-select form-control" id="txt_5" name="txt_5" data-placeholder="El producto es">																						
																						</select>																												
																					</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_6"> Categoria: </label>
																					<div class="col-sm-6">
																						<select class="chosen-select form-control" id="txt_6" name="txt_6" data-placeholder="Categoria">																																										
																							<option value=""></option>
																						</select>																												
																					</div>
																					<div class="col-sm-2 btn btn-sm btn-success" id="btn_agr_cat" data-toggle="modal" href="#modal_categoria" > Agregar</div>
																				</div>	
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_7"> Asignado a: </label>
																					<div class="col-sm-6">
																						<select class="chosen-select form-control" id="txt_7" name="txt_7" data-placeholder="Asignado a">																																										
																						</select>																												
																					</div>
																					<div class="col-sm-2 btn btn-sm btn-success" id="btn_asi_a" data-toggle="modal" href="#modal_asi_a"> Agregar</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="iva_producto"> Porcentaje Iva: </label>
																					<div class="col-sm-6">
																						<select class="chosen-select form-control" id="iva_producto" name="iva_producto" data-placeholder="% iva">																																										
																							<option value=""></option>
																						</select>																												
																					</div>
																				</div>																																						
																			</div>
																			<div class="col-sm-6">
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_8"> Código Barras:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_8" name="txt_8"  placeholder="Código Barras" class="form-control" data-toggle="tooltip" data-original-title="" />
																					</div>
																				</div>
																				<div class="form-group has-error">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_9"> Precio Producto:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_9" name="txt_9" class="form-control" placeholder="Precio del Producto" onkeydown="return validarNumeros(event)" data-toggle="tooltip" data-original-title="Precio del Producto" required pattern="[0-9.]{1,}"  />																						
																					</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_10"> Utilidad Mayorista:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_10" name="txt_10" class="form-control" placeholder="Utilidad mayorista" onkeydown="return validarNumeros(event)"  data-toggle="tooltip" data-original-title="Utilidad del Mayorista" />
																					</div>
																				</div>
																				<div class="form-group has-error">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_11"> Precio Mayorista:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_11" name="txt_11"  class="form-control" placeholder="Precio mayorista" onkeydown="return validarNumeros(event)"  data-toggle="tooltip" data-original-title="Precio del Mayorista" required pattern="[0-9.]{1,}" />																																																																																													
																					</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_12"> Cantidad Inicial:</label>
																					<div class="col-sm-8">
																						<input type="text" id="txt_12" name="txt_12"  placeholder="Cantidad Inicial" class="ui-spinner-input col-sm-12" onkeydown="return validarNumeros(event)" data-toggle="tooltip" data-original-title="" role="spinbutton" />																						
																					</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_13"> Marcas: </label>
																					<div class="col-sm-6">
																						<select class="chosen-select form-control" id="txt_13" name="txt_13" data-placeholder="Marcas">																																										
																							<option value=""></option>
																						</select>																												
																					</div>
																					<div class="col-sm-2 btn btn-sm btn-success" id="btn_agr_mar" data-toggle="modal" href="#modal_marcas"> Agregar</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_14"> Se vender por: </label>
																					<div class="col-sm-6">
																						<select class="chosen-select form-control" id="txt_14" name="txt_14" data-placeholder="Se vender por">																																										
																						</select>																																							
																					</div>
																					<div class="col-sm-2 btn btn-sm btn-success" id="btn_se-ven_por" data-toggle="modal" href="#modal_se-vender_por"> Agregar</div>
																				</div>
																				<div class="form-group">
																					<label class="col-sm-4 control-label no-padding-right" for="txt_15">y contiene:</label>
																					<div class="col-sm-6">
																						<input type="text" readonly id="txt_15" name="txt_15"  class="form-control" data-toggle="tooltip" data-original-title="" />																																																						
																					</div>
																					<label class="col-sm-1 control-label no-padding-right" for="txt_15">Unid(s)</label>
																				</div>
																			</div>
																		</div>
																		<div id="deta_adici" class="tab-pane fade ">
																			<div class="col-xs-12">
																				<div class="row-fluid">
																					<div class="col-xs-2">
																						<div class="form-group">
																							<div class="col-xs-12">
																								<div class="col-xs-12">																									
																									<span class="profile-picture">
																										<img id="avatar" class="editable img-responsive" alt="Empresa x" src="img/default.png" accept="image/*"/>
																									</span>

																								</div>																																														
																							</div>
																						</div>	
																					</div>
																					<div class="col-xs-5">
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="txt_16"> Cantidad Mínima:</label>
																							<div class="col-sm-7">
																								<input type="text" id="txt_16" name="txt_16"  placeholder="Cantidad Mínima" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[0-9]{1,}" />																						
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="txt_16"> Descuento:</label>
																							<div class="col-sm-7">
																								<input type="text" id="descuento" name="descuento"  placeholder="" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[0-9]{1,}" />																						
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="incluye_iva"> Incluye Iva: </label>
																							<div class="col-sm-7">																								
																								<label>
																									<input name="incluye_iva" id="incluye_iva" class="ace ace-switch ace-switch-5" type="checkbox" checked>
																									<span class="lbl"></span>
																								</label>																																	
																							</div>																							
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="sin_existencia"> Facturar sin existencia: </label>
																							<div class="col-sm-7">
																								<label>
																									<input name="sin_existencia" id="sin_existencia" class="ace ace-switch ace-switch-5" type="checkbox" checked>
																									<span class="lbl"></span>
																								</label>
																							</div>																					
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="expiracion_producto">Producto con Expiración:</label>
																							<div class="col-sm-7">
																								<label>
																									<input name="expiracion_producto" id="expiracion_producto" class="ace ace-switch ace-switch-5" type="checkbox">
																									<span class="lbl"></span>
																								</label>
																							</div>																								
																						</div>																																																																	
																					</div>
																					<div class="col-xs-5">
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="txt_17"> Cantidad Máxima:</label>
																							<div class="col-sm-7">
																								<input type="text" id="txt_17" name="txt_17"  placeholder="Cantidad Máxima" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[0-9]{1,}" />																						
																							</div>
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="producto_series"> Producto series:</label>
																							<div class="col-sm-7">
																								<label>
																									<input name="producto_series" id="producto_series" class="ace ace-switch ace-switch-5" type="checkbox">
																									<span class="lbl"></span>
																								</label>
																							</div>																								
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="producto_activo"> Producto Activo:</label>
																							<div class="col-sm-7">
																								<label>
																									<input name="producto_activo" id="producto_activo" class="ace ace-switch ace-switch-5" type="checkbox" checked>
																									<span class="lbl"></span>
																								</label>
																							</div>	
																						</div>
																						<div class="form-group">
																							<label class="col-sm-5 control-label no-padding-right" for="txt_18"> Detalle producto:</label>
																							<div class=" col-xs-7">
																								<textarea class="input-xlarge" name="txt_18" id="txt_18" placeholder="Comentario"></textarea>
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
															<i class="ace-icon fa fa-floppy-o bigger-120 white"></i>
															Guardar
														</button>
														<button type="button" id="btn_1" class="btn btn-primary">
															<i class="ace-icon fa fa-file-o bigger-120 white"></i>
															Limpiar
														</button>
														<button type="button" id="btn_2" class="btn btn-primary">
															<i class="ace-icon fa fa-refresh bigger-120 white"></i>
															Actualizar
														</button>														
														<button data-toggle="modal" href="#myModal" type="button" id="btn_3" class="btn btn-primary">
															<i class="ace-icon fa fa-search bigger-120 white"></i>
															Buscar
														</button>
														<button type="button" id="btn_4" class="btn btn-primary">
															<i class="ace-icon fa fa-arrow-circle-left bigger-120 white"></i>
															Atras
														</button>
														<button type="button" id="btn_5" class="btn btn-primary">
															<i class="ace-icon fa fa fa-arrow-circle-right bigger-120 white"></i>
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

		<?php footer(); ?>

		<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
			<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
		</a>
		</div><!-- /.main-container -->

		<!-- basic scripts modales-->
		<!-- Modal -->
		  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		          <h4 class="modal-title">BUSCAR PRODCUTOS</h4>
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
		  
		<!-- Modal categoria-->
		  <div class="modal fade" id="modal_categoria" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content blue">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		          <h4 class="modal-title">AGREGAR CATEGORIAS</h4>
		        </div>
		        <form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_categoriasProductos">
		        	<div class="modal-body">		            
		            	<div class="form-group has-error">
							<label class="col-sm-2 control-label no-padding-right" for="txt_categoriaProducto">Descripción:</label>
							<div class="col-sm-5">
								<input type="text" id="txt_categoriaProducto" name="txt_categoriaProducto"  placeholder="Ingrese categoria" class="form-control" data-toggle="tooltip" data-original-title="Nuevas categorías" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9 ]{1,}" />
							</div>
						</div>								            
		        	</div>
		        	<div class="modal-footer">
			          	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			         	<button type="submit" class="btn btn-primary" id="guardarCategoriaProducto">Guardar</button>
			        </div>
		        </form>
		      </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		  </div><!-- /.modal -->

		<!-- Modal categoria-->
		  <div class="modal fade" id="modal_asi_a" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content blue">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		          <h4 class="modal-title">ASIGNAR A</h4>
		        </div>
		            <form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_asignarProducto">
		        		<div class="modal-body">			        
			            	<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_descripcionBodega">Descripción:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_descripcionBodega" name="txt_descripcionBodega"  placeholder="Ingrese bodega" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />																																																						
								</div>
							</div>	
							<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_ubicacionProducto">Ubicacion:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_ubicacionProducto" name="txt_ubicacionProducto"  placeholder="Ingrese ubicación" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />																																																						
								</div>
							</div>								            
			        	</div>
				        <div class="modal-footer">
				          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				          <button type="submit" class="btn btn-primary" id="btn_guardarAsignacion">Guardar</button>
				        </div>
		        	</form>
		      	</div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->

		<!-- Modal categoria-->
		  <div class="modal fade" id="modal_marcas" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content blue">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		          <h4 class="modal-title">AGREGAR MARCAS</h4>
		        </div>
			        <form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_marcasProducto">
			        	<div class="modal-body">		            
			            	<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_marcaProductos">Descripción:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_marcaProductos" name="txt_marcaProductos"  placeholder="Ingrese marca" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />																																																						
								</div>
							</div>						            
			        	</div>
				        <div class="modal-footer">
				         	<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				         	<button type="submit" class="btn btn-primary" id="btn_guardarMarcaProducto">Guardar</button>
				        </div>
			        </form>
		      </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		  </div><!-- /.modal -->

		<!-- Modal unidades-->
		  <div class="modal fade" id="modal_se-vender_por" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		      <div class="modal-content blue">
		        <div class="modal-header">
		          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		          <h4 class="modal-title">SE VENDE POR</h4>
		        </div>
		        	<form class="form-horizontal" role="form" rol="form" action="" method="POST" id="form_sevende">
			        	<div class="modal-body">		            
			            	<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_descripcionUnidades">Descripción:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_descripcionUnidades" name="txt_descripcionUnidades"  placeholder="Ingrese marca" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />																																																						
								</div>
							</div>
							<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_abreviatura">Abreviatura:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_abreviatura" name="txt_abreviatura"  placeholder="Ingrese Abreviatura" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[A-Za-záéíóúÁÉÍÓÚñÑ0-9. ]{1,}" />																																																						
								</div>
							</div>
							<div class="form-group has-error">
								<label class="col-sm-2 control-label no-padding-right" for="txt_cantidadSevende">Cantidad:</label>
								<div class="col-sm-5">
									<input type="text" id="txt_cantidadSevende" name="txt_cantidadSevende"  onkeydown="return validarNumeros(event)" placeholder="Ingrese cantidad" class="form-control" data-toggle="tooltip" data-original-title="" required pattern="[0-9]{1,}" />																																																						
								</div>
							</div>						            
			        	</div>
				        <div class="modal-footer">
				          <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				          <button type="submit" class="btn btn-primary" id="btn_guardarSevende">Guardar</button>
				        </div>
			        </form>
		      </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		  </div><!-- /.modal -->		   

		<script type="text/javascript">
			window.jQuery || document.write("<script src='../../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="../../dist/js/bootstrap.min.js"></script>
		<script src="../../dist/js/jquery-ui.custom.min.js"></script>
		<script src="../../dist/js/jquery.ui.touch-punch.min.js"></script>
		<script src="../../dist/js/jquery.easypiechart.min.js"></script>
		<script src="../../dist/js/jquery.sparkline.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.pie.min.js"></script>
		<script src="../../dist/js/flot/jquery.flot.resize.min.js"></script>
		<script src="../../dist/js/chosen.jquery.min.js"></script>
		<script src="../../dist/js/fuelux/fuelux.spinner.min.js"></script>
		<script src="../../dist/js/x-editable/bootstrap-editable.min.js"></script>
		<script src="../../dist/js/x-editable/ace-editable.min.js"></script>
		<script src="../../dist/js/jquery.gritter.min.js"></script>

		<!-- ace scripts -->		
		<script src="../../dist/js/ace-elements.min.js"></script>
		<script src="../../dist/js/ace.min.js"></script>
		<script src="../../dist/js/jqGrid/jquery.jqGrid.min.js"></script>
        <script src="../../dist/js/jqGrid/i18n/grid.locale-en.js"></script>
		
		<script src="productos.js"></script>
		<script src="../generales.js"></script>
	</body>
</html>